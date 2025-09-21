import React, {useState} from 'react';
import * as S from "./RegisterPage.style";
import {useNavigate} from "react-router-dom";
import {Credential} from "../../../types/credentialType";
import {User} from "../../../types/userType";
import CredentialService from "../../../services/credentialService";
import supabase from "../../../supabaseClient";
import UserService from "../../../services/userService";
import avatar from "../../../нетфото.jpg"
import InputError from "../../../components/inputError/InputError";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [counter, setCounter] = useState(0);
    const [errors, setErrors] = useState({
        name: {hasError: false, message: ""},
        surname: {hasError: false, message: ""},
        city: {hasError: false, message: ""},
        email: {hasError: false, message: ""},
        password: {hasError: false, message: ""},
    });
    const errorByFunc = {
        name: {hasError: false, message: ""},
        surname: {hasError: false, message: ""},
        city: {hasError: false, message: ""},
        email: {hasError: false, message: ""},
        password: {hasError: false, message: ""},
    };

    const [userData, setUserData] = useState<Partial<User>>({
        name: "",
        surname: "",
        city: "",
        user_id: "",
        avatar: avatar
    })

    const [credential, setCredential] = useState<Credential>({
        email: "",
        password: "",
    })

    const checkError = async () => {
        if (credential.email === '') errorByFunc.email = {hasError: true, message: 'Поле обязательно для заполнения'}
        if (credential.password === '') errorByFunc.password = {
            hasError: true,
            message: 'Поле обязательно для заполнения'
        }
        if (userData.name === '') errorByFunc.name = {hasError: true, message: 'Поле обязательно для заполнения'}
        if (userData.surname === '') errorByFunc.surname = {hasError: true, message: 'Поле обязательно для заполнения'}
        if (userData.city === '') errorByFunc.city = {hasError: true, message: 'Поле обязательно для заполнения'}

        if (credential.email && credential.password) {
            if (!(credential.email.includes('@' || '.', 0)))
                errorByFunc.email = {
                    hasError: true,
                    message: 'Email должен содержать символ @ и доменную часть (например, gmail.com)'
                }
            if (credential.password.length < 6) {
                errorByFunc.password = {hasError: true, message: 'Длина пароля не должна быть меньше 6 символов'}
            }
        }
        setErrors(errorByFunc)
        setCounter(counter + 1)
    }

    const register = async () => {
        await checkError();
        if (!errorByFunc.email.hasError && !errorByFunc.password.hasError
            && !errorByFunc.name.hasError && !errorByFunc.surname.hasError && !errorByFunc.city.hasError) {
            CredentialService.addCredential(credential)
                .then(() => supabase.auth.getSession())
                .then(session => {
                    const updatedUserData = {
                        ...userData,
                        user_id: session.data.session?.user.id
                    };
                    setUserData(updatedUserData);
                    console.log(updatedUserData)
                    return UserService.addUser(updatedUserData);
                })
                .then(() => navigate('/feed'))
        }
    }

    return (
        <S.RegisterPageContainer>
            <S.RegisterTitle>Заполните форму регистрации</S.RegisterTitle>
            <InputError error={errors.name.hasError} textError={errors.name.message} count={counter}><S.RegisterInput
                value={userData?.name}
                type='text'
                onChange={e => {
                    setUserData({
                        ...userData,
                        name: e.target.value
                    })
                }}
                placeholder="Имя"/></InputError>
            <InputError error={errors.surname.hasError} textError={errors.surname.message}
                        count={counter}><S.RegisterInput
                value={userData?.surname}
                type='text'
                onChange={e => {
                    setUserData({
                        ...userData,
                        surname: e.target.value
                    })
                }}
                placeholder="Фамилия"/></InputError>
            <InputError error={errors.city.hasError} textError={errors.city.message} count={counter}><S.RegisterInput
                value={userData?.city}
                type='text'
                onChange={e => {
                    setUserData({
                        ...userData,
                        city: e.target.value
                    })
                }}
                placeholder="Город"/></InputError>
            <InputError error={errors.email.hasError} textError={errors.email.message} count={counter}><S.RegisterInput
                value={credential.email}
                type='email'
                onChange={e => {
                    setCredential({
                        ...credential,
                        email: e.target.value
                    })
                }}
                placeholder="Адрес электронной почты"/></InputError>
            <InputError error={errors.password.hasError} textError={errors.password.message}
                        count={counter}><S.RegisterInput
                value={credential.password}
                type='password'
                onChange={e => {
                    setCredential({
                        ...credential,
                        password: e.target.value
                    })
                }}
                placeholder="Пароль"/></InputError>
            <S.RegisterButtonContainer>
                <S.RegisterButton variant="contained"
                                  color="warning"
                                  size="small"
                                  onClick={() => {
                                      register()
                                  }}>Зарегистрироваться</S.RegisterButton>
                <S.RegisterButton variant="contained"
                                  color="warning"
                                  size="small" onClick={() => navigate('/login')}>Назад</S.RegisterButton>
            </S.RegisterButtonContainer>
        </S.RegisterPageContainer>
    );
};

export default RegisterPage;