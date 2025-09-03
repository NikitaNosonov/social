import React, {useState} from 'react';
import * as S from './EditProfile.style'
import UserStore from "../../../../store/userStore";
import {User} from "../../../../types/userType";
import {Button} from "@mui/material";
import {observer} from "mobx-react-lite";
import InputError from "../../../../components/inputError/InputError";

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

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = _handleReaderLoaded;
            reader.readAsBinaryString(file);
        }
    };

    const _handleReaderLoaded = (e: ProgressEvent<FileReader>) => {
        const binaryString = e.target?.result;
        if (profileEdit && setProfileEdit) {
            setProfileEdit({...profileEdit, avatar: "data:image;base64," + btoa(binaryString as string)});
        }
    };

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
                {!isAddPhoto ?
                    <Button variant="contained" color="primary" type="submit" size="small"
                            onClick={() => editPhoto()}>Изменить фото</Button> : <input
                        type="file"
                        name="image"
                        id="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={e => onChange(e)}
                    />}
                <Button variant="contained" color="primary" type="submit" size="small"
                        onClick={() => editUser()}>Завершить редактирование</Button>
            </S.ButtonContainer>
        </S.ProfileInfo>
    );
});

export default EditProfile;