import styled from 'styled-components'

interface props {
    isOwnMessage: boolean
}

export const MessageItem = styled.div<props>`
    display: flex;
    margin-top: 1vh;
    justify-content: ${props => props.isOwnMessage ? 'flex-end' : 'flex-start'};`

export const MessageItemContainer = styled.div<props>`
    display: flex;
    min-width: 30vw;
    flex-direction: column;
    gap: 5px;
    align-items: ${props => props.isOwnMessage ? 'flex-start' : 'flex-end'};`

export const MessageInfo = styled.div<props>`
    display: flex;
    align-items: center;
    gap: 4px;
    flex-direction: ${props => props.isOwnMessage ? 'row' : 'row-reverse'};
    justify-content: ${props => props.isOwnMessage ? 'flex-end' : 'flex-start'};`

export const MessageUsername = styled.span`
    font-weight: bold;`

export const MessageDate = styled.span`
    color: var(--color-title);`

export const MessageContent = styled.div<props>`
    display: flex;
    justify-content: center;
    gap: 1px;
    background: var(--background);
    border-radius: 40px;
    padding: 10px;
    min-width: 8vw;
    min-height: 4vh;
    background-color: ${props => props.isOwnMessage ? '#3b82f6' : '#f3f4f6'};
    color: ${props => props.isOwnMessage ? '#ffffff' : '#000000'};`