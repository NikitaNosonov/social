import React, {useEffect, useState} from 'react';
import * as S from '../pages/profile/profileItem/ProfileItem.style'

interface roleGuardProps {
    children: React.ReactNode
}

export const AdditionalFeaturesAdmin: React.FC<roleGuardProps> = ({children}) => {
    const [role, setRole] = React.useState<string | null>(null)

    useEffect(() => {
        setTimeout(() => {
            const userRole = localStorage.getItem("userRole");
            setRole(userRole)
        }, 500)
    }, [])

    if (role === 'admin') {
        return <>{children}</>
    } else {
        return null
    }
}

export const AdditionalFeaturesModerator: React.FC<roleGuardProps> = ({children}) => {
    const [role, setRole] = useState<string | null>(null)

    useEffect(() => {
        setTimeout(() => {
            const userRole = localStorage.getItem("userRole");
            setRole(userRole)
        }, 500)
    }, [])

    if (role === 'admin' || role === 'moderator') {
        return <>{children}</>
    } else {
        return null
    }
}

export const EnableProfile: React.FC<roleGuardProps> = ({children}) => {
    const [unlocked, setUnlocked] = useState<boolean | null>(null)

    useEffect(() => {
        setTimeout(() => {
            const userEnable = JSON.parse(localStorage.getItem('unlockedAccount') || 'true')
            setUnlocked(userEnable)
        }, 200)
    }, []);

    if (unlocked) {
        return <>{children}</>
    } else {
        return <S.ProfileItem><S.ProfileItemTitle>Ваш профиль заблокирован</S.ProfileItemTitle></S.ProfileItem>
    }
}

export const EnableProfileByNav: React.FC<roleGuardProps> = ({children}) => {
    const [unlocked, setUnlocked] = useState<boolean | null>(null)

    useEffect(() => {
        setTimeout(() => {
            const userEnable = JSON.parse(localStorage.getItem('unlockedAccount') || 'true')
            setUnlocked(userEnable)
        }, 200)
    }, []);

    if (unlocked) {
        return <>{children}</>
    } else {
        return null
    }
}
