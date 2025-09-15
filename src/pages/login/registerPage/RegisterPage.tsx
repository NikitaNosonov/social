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
    const [errorSt, setErrorSt] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);

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

    const register = async () => {
        if (credential.email === '' ||
            credential.password === '' ||
            userData.name === '' ||
            userData.surname === '' ||
            userData.city === '') {
            setErrorSt(true);
        }
        else if (!(credential.email.includes('@' || '.', 0))) {
            setErrorEmail(true);
        }
        else if (credential.password.length < 6) {
            setErrorPassword(true);
        }
        else {
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
            <InputError errorSt={errorSt}><S.RegisterInput value={userData?.name}
                                                           type='text'
                                                           onChange={e => {
                                                               setErrorSt(false)
                                                               setUserData({
                                                                   ...userData,
                                                                   name: e.target.value
                                                               })
                                                           }}
                                                           placeholder="Имя"/></InputError>
            <InputError errorSt={errorSt}><S.RegisterInput value={userData?.surname}
                                                           type='text'
                                                           onChange={e => {
                                                               setErrorSt(false)
                                                               setUserData({
                                                                   ...userData,
                                                                   surname: e.target.value})
                                                           }}
                                                           placeholder="Фамилия"/></InputError>
            <InputError errorSt={errorSt}><S.RegisterInput value={userData?.city}
                                                           type='text'
                                                           onChange={e => {
                                                               setErrorSt(false)
                                                               setUserData({
                                                                   ...userData,
                                                                   city: e.target.value
                                                               })
                                                           }}
                                                           placeholder="Город"/></InputError>
            <InputError errorSt={errorSt} errorEmail={errorEmail}><S.RegisterInput value={credential.email}
                                                           type='email'
                                                           onChange={e => {
                                                               setErrorSt(false)
                                                               setErrorEmail(false)
                                                               setCredential({
                                                                   ...credential,
                                                                   email: e.target.value
                                                               })
                                                           }}
                                                           placeholder="Адрес электронной почты"/></InputError>
            <InputError errorSt={errorSt} errorPassword={errorPassword}><S.RegisterInput value={credential.password}
                                                           type='password'
                                                           onChange={e => {
                                                               setErrorSt(false)
                                                               setErrorPassword(false)
                                                               setCredential({
                                                                   ...credential,
                                                                   password: e.target.value
                                                               })
                                                           }}
                                                           placeholder="Пароль"/></InputError>
            <S.RegisterButtonContainer>
                <S.RegisterButton variant="contained"
                                  color="primary"
                                  size="small"
                                  onClick={() => {
                                      register()
                                  }}>Зарегистрироваться</S.RegisterButton>
                <S.RegisterButton variant="contained"
                                  color="primary"
                                  size="small" onClick={() => navigate('/login')}>Назад</S.RegisterButton>
            </S.RegisterButtonContainer>
        </S.RegisterPageContainer>
    );
};

export default RegisterPage;