'use client'

import supabase from "../supabaseClient";
import {useCallback, useEffect, useState} from 'react'
import {Chat} from '../types/chatType'
import {Message} from '../types/messageType'
import {User} from "../types/userType";
import MessageStore from "../store/messageStore";

const EVENT_MESSAGE_TYPE = 'message'

export function useRealtimeChat({roomname, sender_user_id, recipient_user_id}: Chat, user: Partial<User>) {
    const [messages, setMessages] = useState<Message[]>([])
    const [channel, setChannel] = useState<ReturnType<typeof supabase.channel> | null>(null)
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        const newChannel = supabase.channel(roomname)
        console.log('newChannel', newChannel)

        newChannel
            .on('broadcast', {event: EVENT_MESSAGE_TYPE}, (payload) => {
                console.log(messages)
                setMessages((current) => [...current, payload.payload as Message])
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    console.log('status', status)
                    setIsConnected(true)
                }
            })

        setChannel(newChannel)

        return () => {
            supabase.removeChannel(newChannel)
        }
    }, [roomname, sender_user_id, recipient_user_id, supabase])

    const sendMessage = useCallback(
        async (content: string) => {
            if (!channel || !isConnected) return

            let username = ''
            if (user.name)
                username = user.name

            const message: Message = {
                id: crypto.randomUUID(),
                username: username,
                content,
                created_at: new Date().toISOString(),
                chatname: roomname,
            }

            await MessageStore.setMessages(message)

            // Update local state immediately for the sender
            setMessages((current) => [...current, message])

            await channel.send({
                type: 'broadcast',
                event: EVENT_MESSAGE_TYPE,
                payload: message,
            })
        },
        [channel, isConnected, sender_user_id, recipient_user_id]
    )

    return {messages, sendMessage, isConnected}
}