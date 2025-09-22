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
    const [counter, setCounter] = useState(0);
    const [errors, setErrors] = useState({
        email: {hasError: false, message: ""},
        password: {hasError: false, message: ""},
    });
    const errorByFunc = {
        email: {hasError: false, message: ""},
        password: {hasError: false, message: ""},
    }
    const er = {hasError: true, message: "Поле обязательно для заполнения"}
    const [wrongPass, setWrongPass] = useState(false);

    const [credential, setCredential] = useState<Credential>({
        email: "nikitanosonov93@gmail.com",
        password: "",
    })

    const checkError = async () => {
        if (credential.email === '')
            errorByFunc.email = er

        if (credential.password === '')
            errorByFunc.password = er

        setErrors(errorByFunc)
        setCounter(counter + 1)
    }

    const login = async () => {
        await checkError()
        if (!errorByFunc.email.hasError && !errorByFunc.password.hasError) {
            await CredentialService.login(credential)
            await UserStore.getUserById()
            const session = await supabase.auth.getSession()
            console.log("session", session)
            if (!session.data.session?.user.id) {
                setWrongPass(true)
                setTimeout(() => setWrongPass(false), 5000)
                setCredential(c => ({...c, password: ""}))
            } else {
                await UserStore.getUsers();
                localStorage.getItem("userRole")
                navigate(R.profileRoute)
            }
        } else return
    }

    return (
        <S.LoginPageContainer>
            <S.LoginTitle>Вход</S.LoginTitle>
            {wrongPass ? <S.WrongContainer>Неправильный логин или пароль</S.WrongContainer> :
                <S.WrongContainer></S.WrongContainer>}
            <InputError error={errors.email.hasError} textError={errors.email.message} count={counter}><S.LoginInput
                value={credential.email}
                type='email'
                onChange={e => {
                    setCredential({...credential, email: e.target.value})
                }}
                placeholder="Адрес электронной почты"/></InputError>
            <InputError error={errors.password.hasError} textError={errors.password.message} count={counter}><S.LoginInput
                value={credential.password}
                type='password'
                onChange={e => {
                    setCredential({...credential, password: e.target.value})
                }}
                placeholder="Пароль"/></InputError>
            <S.LoginButton variant="contained"
                           color="warning"
                           size="small"
                           onClick={() => login()}>Войти</S.LoginButton>
            <S.LoginRegText>Нет аккаунта? <S.LoginReg
                to={R.registerRoute}>Зарегистрируйся!</S.LoginReg></S.LoginRegText>
        </S.LoginPageContainer>

    );
};

export default Login;