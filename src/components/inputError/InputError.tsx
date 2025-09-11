import React from 'react';
import * as S from './InputError.style'

interface InputErrorProps {
    children: React.ReactNode,
    errorSt?: boolean
}

const InputError: React.FC<InputErrorProps> = ({children, errorSt}) => {
    return (
        <>
            {children}
            {errorSt && <S.ErrorText>**Поле обязательно для заполнения**</S.ErrorText>}
        </>
    )
};

export default InputError;