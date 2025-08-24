import React, {useState} from 'react';
import * as S from './ModalEditProfile.style'
import UserStore from "../../../../store/userStore";
import {User} from "../../../../types/userType";
import {Button} from "@mui/material";
import {observer} from "mobx-react-lite";
import UserService from "../../../../services/userService";

interface ModalEditProfileProps {
    setModalEditProfile?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const ModalEditProfile: React.FC<ModalEditProfileProps> = observer(({setModalEditProfile}) => {
    const [profileEdit, setProfileEdit] = useState<User | null>(UserStore.user || null);
    const [isAddPhoto, setIsAddPhoto] = useState(false);

    const editPhoto = () => {
        if (profileEdit) {
            setProfileEdit({
                ...profileEdit,
                avatar: ""
            });
        }
        setIsAddPhoto(true);
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
        <div>
            <S.Input
                value={profileEdit?.name}
                type="text"
                placeholder="Имя"
                onChange={e => {
                    if (profileEdit) setProfileEdit({...profileEdit, name: e.target.value})
                }}
            />
            <S.Input
                value={profileEdit?.surname}
                type="text"
                placeholder="Фамилия"
                onChange={e => {
                    if (profileEdit) setProfileEdit({...profileEdit, surname: e.target.value})
                }}
            />
            <S.Input
                value={profileEdit?.city}
                type="text"
                placeholder="Город"
                onChange={e => {
                    if (profileEdit) setProfileEdit({...profileEdit, city: e.target.value})
                }}
            />
            <S.Input
                value={profileEdit?.age}
                type="number"
                placeholder="Возраст"
                onChange={e => {
                    if (profileEdit) setProfileEdit({...profileEdit, age: parseInt(e.target.value)})
                }}
            />
            <S.ButtonContainer>
                {!isAddPhoto ?
                    <Button variant="contained" color="primary" type="submit" size="small"
                            onClick={() => editPhoto()}>Добавить фото</Button> : <input
                        type="file"
                        name="image"
                        id="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={e => onChange(e)}
                    />}
                <Button variant="contained" color="primary" type="submit" size="small"
                        onClick={() => {
                            UserService.editUser(profileEdit)
                            if (setModalEditProfile) {
                                setModalEditProfile(false)
                            }
                        }}>Редактировать</Button>
            </S.ButtonContainer>
        </div>
    );
});

export default ModalEditProfile;