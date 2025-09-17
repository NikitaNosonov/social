import React, {useEffect, useState} from 'react';
import * as S from './InputError.style'

interface InputErrorProps {
    children: React.ReactNode,
    errorSt?: boolean,
    errorPassword?: boolean,
    errorEmail?: boolean
}

const InputError: React.FC<InputErrorProps> = ({children, errorSt, errorPassword, errorEmail}) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [showError, setShowError] = useState(false)

    useEffect(() => {
        if (errorSt || errorEmail || errorPassword) {
            if (errorSt) {
                setErrorMessage('**Поле обязательно для заполнения**')
            } else if (errorPassword) {
                setErrorMessage('**Длина пароля не должна быть меньше 6 символов**')
            } else if (errorEmail) {
                setErrorMessage('**Email должен содержать символ @ и доменную часть (например, gmail.com)**')
            }

            setShowError(true)

            const timer = setTimeout(() => {
                setShowError(false)
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [errorSt, errorPassword, errorEmail])

    return (
        <>
            {children}
            <S.Container>
                {showError && <S.ErrorPopup>
                    <S.ErrorText>{errorMessage}</S.ErrorText>
                </S.ErrorPopup>}
            </S.Container>
        </>
    )
};

export default InputError;