import { UseFormRegisterReturn } from "react-hook-form";

export type NoRefRegister = Omit<UseFormRegisterReturn<string>, "ref">;
export const filterReg = (reg: UseFormRegisterReturn<string>):NoRefRegister => {
    const {onChange, onBlur, name, min, max, maxLength, minLength, pattern, required, disabled} = reg
    return {onChange, onBlur, name, min, max, maxLength, minLength, pattern, required, disabled}
}