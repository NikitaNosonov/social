import React from 'react';
import * as S from './ProfilePage.style'
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const ProfilePage = () => {
    return (
        <S.ProfilePage>
            <ProfileInfo />
        </S.ProfilePage>
    );
};

export default ProfilePage;