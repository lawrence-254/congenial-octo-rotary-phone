import React from 'react'
import { ChatState } from '../../context/ChatProvider';
import { Box, IconButton, Text } from '@chakra-ui/react'
import { AiOutlineArrowLeft, AiOutlineUsergroupAdd, } from "react-icons/ai";


const ChatBoxComponent = ({ reloadChats, setReloadChats }) => {
    const { user, selectedChat, setSelectedChat, chat, setChat } = ChatState();
    return (
        <>
            {!selectedChat ? (<>
                <Text fontSize='2xl' fontWeight='bold' mb={2}>title
                    <IconButton
                        ml={2}
                        icon={<AiOutlineArrowLeft />}
                        // icon={<AiOutlineUsergroupAdd />}
                        aria-label=''
                        onClick={() => setSelectedChat(selectedChat)}
                    />
                </Text>
                <Box
                    w='100%'
                    h='80%'
                    p={3}
                    borderRadius='1g'
                    borderWidth='1px'
                    overflowY='scroll'
                    backgroundColor='white'></Box>
            </>) : (
                <Box
                    w='100%'
                    h='80%'
                    p={3}
                    borderRadius='1g'
                    borderWidth='1px'
                    backgroundColor='white'
                    d='flex'
                    justifyContent='center'
                    alignItems='center'
                >
                    <Text fontSize='2xl' fontWeight='bold'>Select a chat to start messaging</Text>
                </Box>
            )}
        </>
    )
}

export default ChatBoxComponent