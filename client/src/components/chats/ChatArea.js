import React from 'react'
import { ChatState } from '../../context/ChatProvider';
import { Box } from '@chakra-ui/react'
import ChatBoxComponent from './ChatBoxComponent';


const ChatArea = ({ reloadChats, setReloadChats }) => {

    const { selectedChat } = ChatState()

    return (
        <Box backgroundColor='cream'
            d={{ base: selectedChat ? "flex" : "none", md: 'flex' }}
            w={{ base: '100%', md: '70%' }}
            alignItems='center'
            flexDir='column'
            p={3}
            borderRadius='1g'
            borderWidth='1px'
        ><ChatBoxComponent reloadChats={reloadChats} setReloadChats={setReloadChats} /></Box>
    )
}

export default ChatArea
