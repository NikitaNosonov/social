import React, {useEffect, useState} from 'react';
import * as S from './InputError.style'

interface InputErrorProps {
    children: React.ReactNode,
    error?: boolean,
    textError?: string,
    count?: number
}

const InputError: React.FC<InputErrorProps> = ({children, error, textError, count}) => {
    const [showError, setShowError] = useState(false)
    useEffect(() => {
        if (error) {
            setShowError(true)

            setTimeout(() => {
                setShowError(false)
            }, 3000)
        }
    }, [count])

    return (
        <>
            {children}
            <S.Container>
                {showError && <S.ErrorPopup>
                    <S.ErrorText>{textError}</S.ErrorText>
                </S.ErrorPopup>}
            </S.Container>
        </>
    )
};

export default InputError;