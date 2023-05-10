import React from 'react'
import {
  Group,
  FormLayout,
  FormItem,
  Input,
  Button,
  Link,
  Textarea,
  Spinner,
  FormStatus,
  Avatar
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon56CameraOutline } from '@vkontakte/icons';

// @ts-ignore
import styles from './auth.module.css';
import { useForm, SubmitHandler, FieldError, UseFormRegister, ChangeHandler, UseFormRegisterReturn } from "react-hook-form";
import { MyInput } from '../../components/myInput/MyInput';
import { filterReg } from '../../utils/filterReg';
import { useAppDispatch } from '../../store/hooks';
import { registerUser } from '../../store/slices/auth';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';

type RegValues = {
    login: string,
    firstName: string,
    lastName: string,
    description: string,
    password: string,
    passwordRepeat: string,
    image?: FileList
}

export default function Register() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const regStatus = useSelector((state:RootState) => state.auth.regStatus)
  const regError = useSelector((state:RootState) => state.auth.regError)
  const [formError, setFormError] = React.useState<string>('')
  const [image, setImage] = React.useState<string|null>(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegValues>({
    mode: 'all'
  });

  const onSubmit: SubmitHandler<RegValues> = async (d) => {
    const send = (img: string | ArrayBuffer | null) => {
        console.log('here')
        dispatch(registerUser(JSON.stringify({
            ...d,
            image: img
        })));
    }

    if (fileInput?.current?.files?.length) {
        // @ts-ignore
        const file = fileInput.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // @ts-ignore
            if (reader.result?.length > 5 * 1024 * 1024) {
                setFormError('Максимальный размер картинки - 5Mb')
            }
            else send(reader.result);
        }
    }
    else { send(null); }
}

  React.useEffect(() => {
    if (regStatus === 'ok') {
      navigate("../feed")
    }
  }, [regStatus])

  const loginReg = register('login', {
    required: "Введите, пожалуйста, логин",
    maxLength: {
        value: 15,
        message: "Логин должет быть не более 15 символов"
    },
    pattern: {
        value: /^[a-z0-9]+$/,
        message: "Логин должен состоять из строчных латинских букв и цифр"
    }
  });

  const paswordReg = register('password', {
    required: "Введите, пожалуйста, пароль",
    maxLength: {
        value: 20,
        message: "Логин должет быть не более 20 символов"
    },
    pattern: {
        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        message: "Пароль должен содержать строчные и заглавные латинские буквы и цифры (8 или более символов)"
    }
  });

  const firstNameReg = register('firstName', {
    required: "Поле не должно быть пустым",
    maxLength: {
      value: 30, message: "Имя должно быть не более 30 символов"
    }
  });

  const lastNameReg = register('lastName', {
    required: "Поле не должно быть пустым",
    maxLength: {
      value: 30, message: "Фамилия должна быть не более 30 символов"
    }
  });


  const paswordRepeatReg = register('passwordRepeat', {
    required: "Повторите пароль",
    validate: (val: string) => {
      if (watch('password') != val) {
        return "Пароли не совпадают";
      }
    }
  });

  const descriptionReg = register('description', {
    maxLength: {
      value: 300, message: "Максимум 300 символов"
    }
  });


  const imageReg = register('image');
  imageReg.onChange = ({ target }) => {
    return new Promise(() => {
      setFormError('');
      const file = target.files[0];
      setImage(URL.createObjectURL(file));
      // setIsImgAdded(true);
    })
  }
  const fileInput = React.useRef<HTMLInputElement>()
  const dialogOpen = () => {
    fileInput?.current && fileInput.current.click();
  }
  const mergedRefs = (node: HTMLInputElement) => {
    fileInput.current = node
    imageReg.ref(node)
  }

  return (
    <div className={styles.wrapper}>
      <h1>Регистрация</h1>
      <Group>
        <FormLayout onSubmit={handleSubmit(onSubmit)}>

          <FormItem>
            <Avatar 
              size={96} 
              onClick={dialogOpen}
              src={image || ''}
              className={styles.avatar}
            ><Icon56CameraOutline/></Avatar>
            <input 
                type="file" 
                className={styles.fileinput}
                accept=".jpg, .png, .jpeg|image/*"
                {...imageReg}
                ref={mergedRefs}
            />
          </FormItem>

          <MyInput 
            top="Логин"
            placeholder='Введите логин'
            errorMessage={errors?.login?.message}
            reg={filterReg(loginReg)}
            ref={loginReg.ref}
          />

          <MyInput 
            top="Имя"
            placeholder='Имя'
            errorMessage={errors?.firstName?.message}
            reg={filterReg(firstNameReg)}
            ref={firstNameReg.ref}
          />

          <MyInput 
            top="Фамилия"
            placeholder='Фамилия'
            errorMessage={errors?.lastName?.message}
            reg={filterReg(lastNameReg)}
            ref={lastNameReg.ref}
          />

          <MyInput 
            type='password'
            top="Пароль"
            placeholder='Придумайте пароль'
            errorMessage={errors?.password?.message}
            reg={filterReg(paswordReg)}
            ref={paswordReg.ref}
          />

          <MyInput 
            type='password'
            top="Пароль"
            placeholder='Повторите пароль'
            errorMessage={errors?.passwordRepeat?.message}
            reg={filterReg(paswordRepeatReg)}
            ref={paswordRepeatReg.ref}
          />

          <FormItem 
              top="Расскажите о себе"
              bottom={errors?.description && errors?.description?.message}
              status={errors?.description?.message ? 'error' : 'default'}
          >
          <Textarea 
              getRef={descriptionReg.ref}
              {...filterReg(descriptionReg)}
          />      
          </FormItem>

          <FormItem>
            <Button size="l" stretched type={'submit'}>
              {regStatus !== 'loading' && 'Зарегистрироваться'}
              {regStatus === 'loading' && (
                <Spinner size="small" />
              )}
            </Button>
          </FormItem>

          {regStatus === 'failed' && (
            <FormStatus mode="error">
              {regError}
            </FormStatus>
          )}

          {formError && (
            <FormStatus mode="error">
              {formError}
            </FormStatus>
          )}

          <FormItem>
            <Link href="/login">Войти</Link>
          </FormItem>
        </FormLayout>
      </Group>
    </div>
  )
}


