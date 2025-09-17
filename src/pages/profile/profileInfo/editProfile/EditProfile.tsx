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
    const [isAddPhoto, setIsAddPhoto] = useState(false);
    const [errorSt, setErrorSt] = useState(false);

    const editPhoto = () => {
        if (profileEdit) {
            setProfileEdit({
                ...profileEdit,
                avatar: ""
            });
        }
        setIsAddPhoto(true);
    }

    const editUser = async () => {
        if (profileEdit.name === '' || profileEdit.surname === '' || profileEdit.city === '') {
            setErrorSt(true);
        } else {
            await UserStore.setUser(profileEdit)
            await UserStore.user
            if (setIsEditProfile) {
                setIsEditProfile(false)
            }
        }
    }

    return (
        <S.ProfileInfo>
            <InputError errorSt={errorSt}><S.Input
                size="small"
                value={profileEdit?.name}
                type="text"
                placeholder="Имя"
                onChange={e => {
                    setErrorSt(false)
                    if (profileEdit) setProfileEdit({...profileEdit, name: e.target.value})
                }}
            /></InputError>
            <InputError errorSt={errorSt}><S.Input
                size="small"
                value={profileEdit?.surname}
                type="text"
                placeholder="Фамилия"
                onChange={e => {
                    setErrorSt(false)
                    if (profileEdit) setProfileEdit({...profileEdit, surname: e.target.value})
                }}
            /></InputError>
            <InputError errorSt={errorSt}><S.Input
                size="small"
                value={profileEdit?.city}
                type="text"
                placeholder="Город"
                onChange={e => {
                    setErrorSt(false)
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