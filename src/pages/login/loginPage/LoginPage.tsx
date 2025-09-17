import React, {useState} from "react";
import * as S from "./LoginPage.Style"
import * as R from "../../../routes/Routes"
import {Credential} from "../../../types/credentialType";
import CredentialService from "../../../services/credentialService";
import {useNavigate} from "react-router-dom";
import supabase from "../../../supabaseClient";
import UserStore from "../../../store/userStore";
import InputError from "../../../components/inputError/InputError";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [errorSt, setErrorSt] = useState(false);
    const [wrongPass, setWrongPass] = useState(false);

    const [credential, setCredential] = useState<Credential>({
        email: "nikitanosonov93@gmail.com",
        password: "",
    })

    const login = async () => {
        if (credential.email === '' || credential.password === '') {
            setErrorSt(true)
        } else {
            await CredentialService.login(credential)
            await UserStore.getUserById()
            const session = await supabase.auth.getSession()
            console.log("session", session)
            if (!session.data.session?.user.id) {
                setWrongPass(true)
                setTimeout(() => setWrongPass(false), 5000)
                setCredential(c => ({...c, password: ""}))
            } else {
                UserStore.getUsers();
                localStorage.getItem("userRole")
                navigate(R.profileRoute)
            }
        }
    }

    return (
        <S.LoginPageContainer>
            <S.LoginTitle>Вход</S.LoginTitle>
            {wrongPass ? <S.WrongContainer>Неправильный логин или пароль</S.WrongContainer> :
                <S.WrongContainer></S.WrongContainer>}
            <InputError errorSt={errorSt}><S.LoginInput
                value={credential.email}
                type='email'
                onChange={e => {
                    setErrorSt(false)
                    setCredential({...credential, email: e.target.value})
                }}
                placeholder="Адрес электронной почты"/></InputError>
            <InputError errorSt={errorSt}><S.LoginInput
                value={credential.password}
                type='password'
                onChange={e => {
                    setErrorSt(false)
                    setCredential({...credential, password: e.target.value})
                }}
                placeholder="Пароль"/></InputError>
            <S.LoginButton variant="contained"
                           color="primary"
                           size="small"
                           onClick={() => login()}>Войти</S.LoginButton>
            <S.LoginRegText>Нет аккаунта? <S.LoginReg
                to={R.registerRoute}>Зарегистрируйся!</S.LoginReg></S.LoginRegText>
        </S.LoginPageContainer>

    );
};

export default Login;