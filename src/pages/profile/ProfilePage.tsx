import React, {useEffect, useState} from 'react';
import * as S from './ProfilePage.style'
import ProfileInfo from "./profileInfo/ProfileInfo";
import ProfileItem from "./profileItem/ProfileItem";
import {EnableProfile} from "../../guards/roleGuards";
import UserStore from "../../store/userStore";

const ProfilePage = () => {
    const [unlocked, setUnlocked] = useState<boolean | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const check = async () => {
            try {
                await UserStore.getUserById()
                const userEnable = UserStore.user.unlocked;
                if (userEnable)
                    setUnlocked(userEnable)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        check().then(() => console.log('Загрузилось!'))
    }, [])

    return (
        <S.ProfilePage>
            <ProfileInfo loading={loading}/>
            <EnableProfile unlocked={unlocked}><ProfileItem/></EnableProfile>
        </S.ProfilePage>
    );
};

export default ProfilePage;