import React from 'react'
import { Avatar, Box, Text, Tooltip } from '@chakra-ui/react'
import { isSameUser, getSender, isLastMessage, isSameSenderMargin } from '../../config/chatFunctions'
import { ChatState } from '../../context/ChatProvider';
import ScrollableFeed from 'react-scrollable-feed'


const ChatBubbles = ({ message }) => {
    const { user, selectedChat, setSelectedChat, chat, setChat } = ChatState();

    return (
        <ScrollableFeed>{message && message.map((msg, i) => (
            <Box
                key={msg._id}
                p={2}
                mb={2}
                borderRadius='1g'
                borderWidth='1px'
                borderColor='gray.200'
            >
                {(isSameUser(message, msg, i, user._id) || isLastMessage(message, msg, i, user._id))
                    && (<Tooltip label={msg.sender.chatParticipants}
                        hasArrow
                        placement='bottom-start' >
                        <Avatar
                            name={msg.sender.chatParticipants}
                            src={msg.sender.picture}
                            size='sm'
                            mr={2}
                            mt='6px'
                        />
                    </Tooltip>)}



                <Text style={{
                    backgroundColor: `${msg.sender._id === user._id ? 'blue' : 'gray'
                        }`,
                    fontWeight: 'bold',
                    borderRadius: "20px",
                    padding: "3px 12px",
                    maxWidth: "70%",
                    marginLeft: isSameSenderMargin(message, msg, i, user._id) ? 'auto' : '0',
                    marginTop: isSameUser(message, msg, i, user._id) ? '4' : '10px',
                }} >{msg.content}</Text>
            </Box>
        ))}</ScrollableFeed>
    )
}

export default ChatBubbles

// m.sender.chatParticipants