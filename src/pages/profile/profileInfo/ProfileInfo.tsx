import React, {useEffect, useState} from 'react';
import * as S from './ProfileInfo.style'
import {Button} from "@mui/material";
import UserStore from "../../../store/userStore";
import Spinner from "../../../components/Spinner";
import {observer} from "mobx-react-lite";
import EditProfile from "./editProfile/EditProfile";
import CredentialService from "../../../services/credentialService";
import {useNavigate} from "react-router-dom";
import * as R from "../../../routes/Routes"
import Skeleton from "@mui/material/Skeleton";

interface ProfileInfoProps {
    loading?: boolean
}

const ProfileInfo: React.FC<ProfileInfoProps> = observer(({loading}) => {
    const navigate = useNavigate();
    const [isEditProfile, setIsEditProfile] = useState(false);

    const logout = () => {
        CredentialService.logout()
            .then(() => {
                localStorage.clear()
            })
        navigate(R.loginRoute)
    }

    return (isEditProfile ? (
            <EditProfile setIsEditProfile={setIsEditProfile}/>
        ) : (
            <S.ProfileInfo>
                {loading ? <S.SkeletonPhoto animation='wave' variant='circular' width={200} height={200}/>
                    : <S.ProfilePhoto src={UserStore.user.avatar}/>}
                {loading ? <Skeleton animation='wave' variant='rectangular' width='100%'/>
                    : <S.ProfileName>{UserStore.user.name} {UserStore.user.surname}</S.ProfileName>}
                {loading ? <Skeleton animation='wave' variant='rectangular' width='100%'/>
                    : <S.ProfileNameText>{UserStore.user.city}</S.ProfileNameText>}
                <S.ProfileButtonContainer>
                    <Button variant="contained"
                            color="primary"
                            type="submit"
                            size="small"
                            onClick={() => setIsEditProfile(true)}>Редактировать</Button>
                    <Button variant="contained"
                            color="error"
                            type="submit"
                            size="small"
                            onClick={() => logout()}>Выйти</Button>
                </S.ProfileButtonContainer>
            </S.ProfileInfo>
        )
    )
        ;
});

export default ProfileInfo;