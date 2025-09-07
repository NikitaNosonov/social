import React, {useEffect, useState} from 'react';
import * as S from './MessagesPage.style'
import ChatItem from "./chat/ChatItem";
import UserStore from '../../../store/userStore'
import Spinner from "../../../components/Spinner";
import ChatStore from "../../../store/chatStore";

const MessagesPage = () => {
    const user = UserStore.user
    const [loading, setLoading] = useState(true);
    const [roomname, setRoomname] = useState('');

    useEffect(() => {
        const fetch = async () => {
            try {
                await UserStore.getUsers()
                await UserStore.getUserById()

                if (UserStore.user?.id) {
                    await ChatStore.getChats(UserStore.user.id)
                }
            } catch (error) {
                console.error('Error loading data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetch()
    }, [roomname]);

    const findUser = (userId: number | null) => {
        return UserStore.allUsers.find(user => user.id === userId);
    }

    if (!loading) {
        return (
            <S.Container>
                <S.MessagesPage>
                    <S.Title>Ваши диалоги</S.Title>
                    <S.Underline/>
                    {ChatStore.chats.map(chat => {
                        const partnerId = chat.sender_user_id === Number(localStorage.getItem("userId"))
                            ? chat.recipient_user_id
                            : chat.sender_user_id;
                        const partnerUser = findUser(partnerId);

                        if (partnerUser && partnerId !== Number(localStorage.getItem("userId"))) {
                            return (
                                <div key={chat.roomname}>
                                    <S.SwitchUser onClick={() => {
                                        setRoomname(chat.roomname)
                                    }}>
                                        <S.AvatarUser src={partnerUser.avatar}/>
                                        {partnerUser.name} {partnerUser.surname}</S.SwitchUser>
                                </div>
                            )
                        } else return null
                    })}
                </S.MessagesPage>
                {roomname ?
                    <ChatItem roomname={roomname} user={user} sender_user_id={1} recipient_user_id={1}/> : null}
            </S.Container>
        )
    } else {
        return <Spinner size={60} color="secondary"/>
    }
};

export default MessagesPage;