'use client'
import * as S from './ChatItem.style'
import {useChatScroll} from '../../../../hooks/useChatScroll'
import {useRealtimeChat} from "../../../../hooks/useRealtimeChat";
import {Message} from '../../../../types/messageType'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import MessageItem from "./messageItem/MessageItem";
import Button from '@mui/material/Button';
import {User} from '../../../../types/userType'
import SendIcon from '@mui/icons-material/Send';
import MessageStore from "../../../../store/messageStore";

interface RealtimeChatProps {
    roomname: string
    user: Partial<User>
    sender_user_id: number
    recipient_user_id: number
    onMessage?: (messages: Message[]) => void
    messages?: Message[]
}

/**
 * Realtime chat component
 * @param roomName - The name of the room to join. Each room is a unique chat.
 * @param username - The username of the user
 * @param onMessage - The callback function to handle the messages. Useful if you want to store the messages in a database.
 * @param messages - The messages to display in the chat. Useful if you want to display messages from a database.
 * @returns The chat component
 */
export const ChatItem = ({roomname, user, sender_user_id, recipient_user_id, onMessage, messages: initialMessages = []}: RealtimeChatProps) => {
    const {containerRef, scrollToBottom} = useChatScroll()
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(false)
    const {messages: realtimeMessages, sendMessage, isConnected,} = useRealtimeChat({roomname, sender_user_id, recipient_user_id}, user)
    const [newMessage, setNewMessage] = useState('')

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true)
                await MessageStore.getMessages(roomname)
                setMessages(MessageStore.messages)
            }
            catch (e) {
                console.error('Сообщения не загрузились:', e)
            }
            finally {
                setLoading(false)
            }
        }
        fetch()
    }, [roomname]);

    const allMessages = useMemo(() => {
        if (!loading) {
            const mergedMessages = [...initialMessages, ...realtimeMessages, ...messages]
            const uniqueMessages = mergedMessages.filter(
                (message, index, self) => index === self.findIndex((m) => m.id === message.id)
            )
            const sortedMessages = uniqueMessages.sort((a, b) => a.created_at.localeCompare(b.created_at))

            return sortedMessages
        } else {
            return messages
        }
    }, [initialMessages, realtimeMessages])

    useEffect(() => {
        if (onMessage) {
            onMessage(allMessages)
        }
    }, [allMessages, onMessage])

    useEffect(() => {
        scrollToBottom()
    }, [allMessages, scrollToBottom])

    const handleSendMessage = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            if (!newMessage.trim() || !isConnected) return

            sendMessage(newMessage)
            setNewMessage('')
        },
        [newMessage, isConnected, sendMessage]
    )

    return (
        <S.ChatItem>
            <S.ChatItemContainer>
                <S.ChatItemContent ref={containerRef}>
                    {allMessages.length === 0 ? (
                        <S.NonMessageTitle>
                            Сообщений пока нет. Начинайте диалог!
                        </S.NonMessageTitle>
                    ) : null}
                    <S.MessageItem>
                        {allMessages.map((message, index) => {
                            const prevMessage = index > 0 ? allMessages[index - 1] : null
                            const showHeader = !prevMessage || prevMessage.username !== user.name

                            if (message.chatname === roomname)
                            return (
                                <S.MessageAnimation key={message.id}>
                                    <MessageItem
                                        message={message}
                                        isOwnMessage={message.username === user.name}
                                        showHeader={showHeader}
                                    />
                                </S.MessageAnimation>
                            )
                        })}
                    </S.MessageItem>
                </S.ChatItemContent>

                <S.SendContainer onSubmit={handleSendMessage}>
                    <S.InputMessage
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Напишите сообщение..."
                        disabled={!isConnected}
                    />
                    {isConnected && newMessage.trim() && (
                        <S.SubmitButtonContainer>
                        <Button type="submit" disabled={!isConnected}>
                            <SendIcon/>
                        </Button>
                        </S.SubmitButtonContainer>
                    )}
                </S.SendContainer>
            </S.ChatItemContainer>
        </S.ChatItem>
    )
}
export default ChatItem;