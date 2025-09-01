import React from 'react';
import * as S from './ProfilePage.style'
import ProfileInfo from "./profileInfo/ProfileInfo";
import ProfileItem from "./profileItem/ProfileItem";
import {EnableProfile} from "../../guards/roleGuards";

const ProfilePage = () => {
    return (
        <S.ProfilePage>
            <ProfileInfo/>
            <EnableProfile><ProfileItem/></EnableProfile>
        </S.ProfilePage>
    );
};

export default ProfilePage;