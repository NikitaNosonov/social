import React, {useState} from 'react';
import * as S from "./RegisterPage.style";
import {useNavigate} from "react-router-dom";
import {Credential} from "../../../types/credentialType";
import {User} from "../../../types/userType";
import CredentialService from "../../../services/credentialService";
import supabase from "../../../supabaseClient";
import UserService from "../../../services/userService";
import avatar from "../../../нетфото.jpg"

const RegisterPage = () => {
    const navigate = useNavigate();

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

    return (
        <S.RegisterPageContainer>
            <S.RegisterTitle>Заполните форму регистрации</S.RegisterTitle>
            <S.RegisterInput value={userData?.name}
                             type='text'
                             onChange={e => setUserData({...userData, name: e.target.value})}
                             placeholder="Имя"/>
            <S.RegisterInput value={userData?.surname}
                             type='text'
                             onChange={e => setUserData({...userData, surname: e.target.value})}
                             placeholder="Фамилия"/>
            <S.RegisterInput value={userData?.city}
                             type='text'
                             onChange={e => setUserData({...userData, city: e.target.value})}
                             placeholder="Город"/>
            <S.RegisterInput value={credential.email}
                             type='email'
                             onChange={e => setCredential({...credential, email: e.target.value})}
                             placeholder="Адрес электронной почты"/>
            <S.RegisterInput value={credential.password}
                             type='password'
                             onChange={e => setCredential({...credential, password: e.target.value})}
                             placeholder="Пароль"/>
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