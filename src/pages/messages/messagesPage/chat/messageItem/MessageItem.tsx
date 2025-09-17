import React from 'react';
import {Message} from '../../../../../types/messageType';
import * as S from './MessageItem.style';

interface ChatMessageItemProps {
    message: Message,
    isOwnMessage: boolean,
    showHeader: boolean,
    showHeader1?: boolean
}

export const MessageItem = ({message, isOwnMessage, showHeader, showHeader1}: ChatMessageItemProps) => {
    return (
        <S.MessageItem isOwnMessage={isOwnMessage}>
            <S.MessageItemContainer isOwnMessage={isOwnMessage}>
                    <S.MessageInfo isOwnMessage={isOwnMessage}>
                        <S.MessageUsername>{message.username} </S.MessageUsername>
                        <S.MessageDate>
                            {new Date(message.created_at).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                            })}
                        </S.MessageDate>
                    </S.MessageInfo>
                <S.MessageContent isOwnMessage={isOwnMessage}>
                    {message.content}
                </S.MessageContent>
            </S.MessageItemContainer>
        </S.MessageItem>
    )
}

export default MessageItem;