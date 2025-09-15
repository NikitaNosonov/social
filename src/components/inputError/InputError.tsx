import React from 'react';
import * as S from './InputError.style'

interface InputErrorProps {
    children: React.ReactNode,
    errorSt?: boolean,
    errorPassword?: boolean,
    errorEmail?: boolean
}

const InputError: React.FC<InputErrorProps> = ({children, errorSt, errorPassword, errorEmail}) => {
    if (errorSt) {
        return (
            <>
                {children}
                <S.Container>
                    {errorSt && <S.ErrorPopup>
                        <S.ErrorText>**Поле обязательно для заполнения**</S.ErrorText>
                    </S.ErrorPopup>}
                </S.Container>
            </>
        )
    } else if (errorPassword) {
        return (
            <>
                {children}
                <S.Container>
                    {errorPassword && <S.ErrorPopup>
                        <S.ErrorText>**Длина пароля не должна быть меньше 6 символов**</S.ErrorText>
                    </S.ErrorPopup>}
                </S.Container>
            </>
        )
    } else if (errorEmail) {
        return (
            <>
                {children}
                <S.Container>
                    {errorEmail && <S.ErrorPopup>
                        <S.ErrorText>**Email должен содержать символ @ и доменную часть (например,
                            gmail.com)**</S.ErrorText>
                    </S.ErrorPopup>}
                </S.Container>
            </>
        )
    } else {
        return (
            <>{children}</>
        )
    }

};

export default InputError;