import React from 'react';
import * as S from './ProfilePage.style'
import ProfileInfo from "./profileInfo/ProfileInfo";
import ProfileItem from "./profileItem/ProfileItem";

const ProfilePage = () => {
    return (
        <S.ProfilePage>
            <ProfileInfo/>
            <ProfileItem/>
        </S.ProfilePage>
    );
};

export default ProfilePage;