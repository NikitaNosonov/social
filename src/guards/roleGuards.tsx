import React, {useEffect, useState} from 'react';
import * as S from '../pages/profile/profileItem/ProfileItem.style'

interface roleGuardProps {
    children: React.ReactNode,
    role?: string | null,
    unlocked?: null | boolean
}

export const AdditionalFeaturesAdmin: React.FC<roleGuardProps> = ({children, role}) => {
    if (role === 'admin') {
        return <>{children}</>
    } else {
        return null
    }
}

export const AdditionalFeaturesModerator: React.FC<roleGuardProps> = ({children, role}) => {
    if (role === 'admin' || role === 'moderator') {
        return <>{children}</>
    } else {
        return null
    }
}

export const EnableProfile: React.FC<roleGuardProps> = ({children, unlocked}) => {
    if (unlocked) {
        return <>{children}</>
    } else {
        return <S.ProfileItem><S.ProfileItemTitle>Ваш профиль заблокирован</S.ProfileItemTitle></S.ProfileItem>
    }
}

export const EnableProfileByNav: React.FC<roleGuardProps> = ({children, unlocked}) => {
    if (unlocked) {
        return <>{children}</>
    } else {
        return null
    }
}
