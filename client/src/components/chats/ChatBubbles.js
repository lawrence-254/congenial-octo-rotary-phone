import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { Box, Text } from '@chakra-ui/react'

const ChatBubbles = ({ message }) => {
    return (
        <ScrollableFeed>{message && message.map((msg, i) => (
            <Box
                key={m._id}
                p={2}
                mb={2}
                borderRadius='1g'
                borderWidth='1px'
                borderColor='gray.200'
            >
                <Text fontSize='lg' fontWeight='bold'>{getSender(user, msg.sender).username}</Text>
                <Text fontSize='lg'>{msg.message}</Text>
            </Box>
        ))}</ScrollableFeed>
    )
}

export default ChatBubbles