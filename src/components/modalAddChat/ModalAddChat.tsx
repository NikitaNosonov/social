import React, {useEffect, useState} from 'react';
import UserStore from "../../store/userStore";
import * as S from './ModalAddChat.style'
import {Chat} from "../../types/chatType";
import ChatStore from "../../store/chatStore";

interface ModalAddChatProps {
    setModalAddChat?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const ModalAddChat: React.FC<ModalAddChatProps> = ({setModalAddChat}) => {

    useEffect(() => {
        UserStore.getUsers()
    }, []);

    return (
        <div>
            {UserStore.allUsers.map((user) => (
                (user.id !== Number(localStorage.getItem("userId"))) ?
                <S.SwitchUser key={user.id} >
                    <S.AvatarUser src={user.avatar}/>
                    {user.name} {user.surname}</S.SwitchUser> : null
            ))}
        </div>
    );
};

export default ModalAddChat;