import React, {useEffect, useState} from 'react';
import * as S from './MessagesPage.style'
import ChatItem from "./chat/ChatItem";
import UserStore from '../../../store/userStore'
import Spinner from "../../../components/Spinner";
import ChatStore from "../../../store/chatStore";
import Skeleton from "@mui/material/Skeleton";

const MessagesPage = () => {
    const user = UserStore.user
    const [loading, setLoading] = useState(true);
    const [roomname, setRoomname] = useState('');

    useEffect(() => {
        const fetch = async () => {
            try {
                await UserStore.getUsers()
                console.log('111', user)
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

        return (
            <S.Container>
                <S.MessagesPage>
                    <S.Title>Ваши диалоги</S.Title>
                    <S.Underline/>
                    {loading ? (<S.MessagesPageSkeleton>
                            <Skeleton animation='wave' variant='circular' width='20%' height='8vh'/>
                            <Skeleton animation='wave' variant='rectangular' width='100%' height='8vh'/>
                        </S.MessagesPageSkeleton>)
                        :
                        (ChatStore.chats.map(chat => {
                        const partnerId = chat.sender_user_id === UserStore.user.id
                            ? chat.recipient_user_id
                            : chat.sender_user_id;
                        const partnerUser = findUser(partnerId);

                        if (partnerUser && partnerId !== UserStore.user.id) {
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
                    }))}
                </S.MessagesPage>
                {roomname ?
                    <ChatItem roomname={roomname} user={user} sender_user_id={1} recipient_user_id={1}/> : null}
            </S.Container>
        )
};

export default MessagesPage;