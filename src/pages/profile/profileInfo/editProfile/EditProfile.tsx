import React, {useState} from 'react';
import * as S from './EditProfile.style'
import UserStore from "../../../../store/userStore";
import {User} from "../../../../types/userType";
import {Button} from "@mui/material";
import {observer} from "mobx-react-lite";
import InputError from "../../../../components/inputError/InputError";
import DragAndDrop from "../../../../components/dragAndDrop/DragAndDrop";

interface EditProfileProps {
    setIsEditProfile?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const EditProfile: React.FC<EditProfileProps> = observer(({setIsEditProfile}) => {
    const [profileEdit, setProfileEdit] = useState<Partial<User>>(UserStore.user);
    const [counter, setCounter] = useState(0);
    const [errors, setErrors] = useState({
        name: {hasError: false, message: ''},
        surname: {hasError: false, message: ""},
        city: {hasError: false, message: ""},
    });
    const errorByFunc = {
        name: {hasError: false, message: ""},
        surname: {hasError: false, message: ""},
        city: {hasError: false, message: ""},
    }
    const er = {hasError: true, message: 'Поле обязательно для заполнения'}

    const checkErrors = async () => {
        if (profileEdit.name === '') errorByFunc.name = er
        if (profileEdit.surname === '') errorByFunc.surname = er
        if (profileEdit.city === '') errorByFunc.city = er

        setErrors(errorByFunc)
        setCounter(counter + 1)
    }
    const editUser = async () => {
        await checkErrors()
        if (!errorByFunc.name.hasError && !errorByFunc.surname.hasError && !errorByFunc.city.hasError) {
            await UserStore.setUser(profileEdit)
            await UserStore.user
            if (setIsEditProfile) {
                setIsEditProfile(false)
            }
        }
    }

    return (
        <S.ProfileInfo>
            <InputError error={errors.name.hasError} textError={errors.name.message} count={counter}><S.Input
                size="small"
                value={profileEdit?.name}
                type="text"
                placeholder="Имя"
                onChange={e => {
                    if (profileEdit) setProfileEdit({...profileEdit, name: e.target.value})
                }}
            /></InputError>
            <InputError error={errors.surname.hasError} textError={errors.surname.message} count={counter}><S.Input
                size="small"
                value={profileEdit?.surname}
                type="text"
                placeholder="Фамилия"
                onChange={e => {
                    if (profileEdit) setProfileEdit({...profileEdit, surname: e.target.value})
                }}
            /></InputError>
            <InputError error={errors.city.hasError} textError={errors.city.message} count={counter}><S.Input
                size="small"
                value={profileEdit?.city}
                type="text"
                placeholder="Город"
                onChange={e => {
                    if (profileEdit) setProfileEdit({...profileEdit, city: e.target.value})
                }}
            /></InputError>
            <S.ButtonContainer>
                <DragAndDrop profileEdit={profileEdit} setProfileEdit={setProfileEdit}/>
                <Button variant="outlined"
                        style={{color: 'var(--background-add-button)', borderColor: 'var(--background-add-button)'}}
                        type="submit" size="small"
                        onClick={() => editUser()}>Завершить редактирование</Button>
            </S.ButtonContainer>
        </S.ProfileInfo>
    );
});

export default EditProfile;