import React, {useState} from "react";
import * as S from "./LoginPage.Style"
import * as R from "../../../routes/Routes"
import {Credential} from "../../../types/credentialType";
import CredentialService from "../../../services/credentialService";
import {useNavigate} from "react-router-dom";
import supabase from "../../../supabaseClient";
import UserStore from "../../../store/userStore";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [credential, setCredential] = useState<Credential>({
        email: "nikitanosonov93@gmail.com",
        password: "",
    })

    const login = async () => {
        await CredentialService.login(credential)
        const session = await supabase.auth.getSession()
        console.log("session", session)
        if (!session.data.session?.user.id) {
            alert("Неправильный логин или пароль")
            setCredential(c => ({...c, password: ""}))
        }
        else {
            UserStore.getUsers();
            localStorage.getItem("userRole")
            navigate(R.profileRoute)
        }
    }

    return (
        <S.LoginPageContainer>
            <S.LoginTitle>Вход</S.LoginTitle>
            <S.LoginInput
                value={credential.email}
                type='email'
                onChange={e => setCredential({...credential, email: e.target.value})}
                placeholder="Адрес электронной почты"/>
            <S.LoginInput
                value={credential.password}
                type='password'
                onChange={e => setCredential({...credential, password: e.target.value})}
                placeholder="Пароль"/>
            <S.LoginButton variant="contained"
                           color="primary"
                           size="small"
                           onClick={() => login()}>Войти</S.LoginButton>
            <S.LoginRegText>Нет аккаунта? <S.LoginReg href='/register'>Зарегистрируйся!</S.LoginReg></S.LoginRegText>
        </S.LoginPageContainer>

    );
};

export default Login;