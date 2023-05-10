import React from 'react'
import {
  Group,
  FormLayout,
  FormItem,
  Input,
  Button,
  Link,
  Spinner,
  FormStatus
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

// @ts-ignore
import styles from './auth.module.css';

import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from '../../store/hooks';

import { login } from '../../store/slices/auth';
import { useSelector } from 'react-redux';
import {RootState} from '../../store/store';
import { useNavigate } from 'react-router-dom';

type LoginValues = {
  login: string;
  password: string;
}

export default function Login() {

  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>();
  const onSubmit: SubmitHandler<LoginValues> = data => {
    dispatch(login(JSON.stringify(data)))
  }

  const authStatus = useSelector((state:RootState) => state.auth.authStatus)
  const navigate = useNavigate();

  React.useEffect(() => {
    if(authStatus === 'auth') navigate('../feed')
  }, [authStatus]);

  const loginReg = register('login', {
    required: "Введите, пожалуйста, логин"
  });

  const passwordReg = register('password', {
    required: "Введите, пожалуйста, пароль"
  })

  return (
    <div className={styles.wrapper}>
      <h1>Авторизация</h1>
      <Group>
        <FormLayout onSubmit={handleSubmit(onSubmit)}>
          <FormItem 
            top="Логин" 
            bottom={errors?.login && errors.login.message}
            status={errors?.login ? 'error' : 'default'}
          >
            <Input 
              name={loginReg.name}
              onChange={loginReg.onChange}
              onBlur={loginReg.onBlur}
              getRef={loginReg.ref}
              placeholder="Введите ваш логин"
            />      
          </FormItem>

          <FormItem 
            top="Пароль"
            bottom={errors?.password && errors.password.message}
            status={errors?.password ? 'error' : 'default'}
          >
            <Input 
              name={passwordReg.name}
              onChange={passwordReg.onChange}
              onBlur={passwordReg.onBlur}
              getRef={passwordReg.ref}
              placeholder="Введите пароль"
              type="password"
            />
          </FormItem>

          <FormItem>
            <Button size="l" stretched type={'submit'}>
              {authStatus !== 'loading' && 'Войти'}
              {authStatus === 'loading' && (
                <Spinner size="small" />
              )}
            </Button>
          </FormItem>

          {authStatus === 'failed' && (
            <FormStatus mode="error">
              Некорректный логин или пароль
            </FormStatus>
          )}

          <FormItem>
            <Link href="/register">Регистрация</Link>
          </FormItem>
        </FormLayout>
      </Group>
    </div>
  )
}
