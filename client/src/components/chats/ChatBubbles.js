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
                borderColor='#81E6D9'
            >
                {(isSameUser(message, msg, i, user._id) || isLastMessage(message, msg, i, user._id))
                    && (
                        <Tooltip label={msg.sender.chatParticipants} hasArrow placement='bottom-start'>
                            <div>
                                <Avatar
                                    name={msg.sender.chatParticipants}
                                    src={msg.sender.picture}
                                    size='sm'
                                    mr={1}
                                    mt='6px'
                                    cursor='pointer'
                                />
                                <Text>{msg.sender.chatParticipants}</Text>
                            </div>
                        </Tooltip>

                    )}



                <span style={{
                    backgroundColor: `${msg.sender._id === user._id ? '#4299E1' : 'gray'
                        }`,
                    fontWeight: 'bold',
                    borderRadius: "20px",
                    padding: "3px 12px",
                    maxWidth: "55%",
                    marginRight: isSameSenderMargin(message, msg, i, user._id) ? '0' : '',
                    marginTop: isSameUser(message, msg, i, user._id) ? 4 : 10,
                }} >{msg.content}</span>
            </Box>
        ))}</ScrollableFeed>
    )
}

export default ChatBubbles

// m.sender.chatParticipants