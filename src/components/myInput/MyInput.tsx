import React from 'react';
import {
    FormItem,
    Input
  } from '@vkontakte/vkui';
  import '@vkontakte/vkui/dist/vkui.css';
import { NoRefRegister } from '../../utils/filterReg';

export type MyInputProps = {
    type?: string
    placeholder?: string,
    top?: string,
    errorMessage?: string,
    reg: NoRefRegister
  }
  
export const MyInput =  React.forwardRef((props: MyInputProps, ref:React.Ref<HTMLInputElement>) => {
    const {type, top, errorMessage, placeholder, reg} = props;
    return (
        <FormItem 
            top={top}
            bottom={errorMessage}
            status={errorMessage ? 'error' : 'default'}
        >
        <Input 
            type={type} 
            placeholder={placeholder}
            getRef={ref}
            {...reg}
        />      
        </FormItem>
    )
})
