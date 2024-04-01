import React, { useState, useEffect } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { Box, FormControl, IconButton, Input, Spinner, Text } from '@chakra-ui/react'
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getSender, getFullSender } from '../../config/chatFunctions';
import ProfileCard from './ProfileCard';
import UpdateChatModalForGroup from './UpdateChatModalForGroup';
import axios from 'axios';
import ChatBubbles from './ChatBubbles';
import io from 'socket.io-client';

// socket io endpoint
const ENDPOINT = 'http://localhost:5000';
var socket, selectedChatCompare;

const ChatBoxComponent = ({ reloadChats, setReloadChats }) => {
    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    // const toast = Toast();
    const [socketConnection, setSocketConnection] = useState(false);
    const styles = {
        message: {
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
            overflowY: 'scroll',
            marginBottom: '10px',
            borderRadius: '10px',
            scrollbarWidth: 'none',
            border: '5px solid #ccc',
        }
    };

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnection(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("not typing", () => setIsTyping(false));

    }, []);
    const fetchAllMessages = async () => {
        if (!selectedChat) return;
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            }
            setLoading(true);
            const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);
            setMessage(data);
            setLoading(false);
            socket.emit("join chatSpace", selectedChat._id)
        }
        catch (error) {
            console.log(error.message);
            // toast({
            //     title: 'Error',
            //     description: error.message,
            //     status: 'error',
            //     duration: 9000,
            //     isClosable: true
            // })

        }

    }


    useEffect(() => {
        fetchAllMessages();
        selectedChatCompare = selectedChat
    }, [selectedChat, reloadChats]);

    useEffect(() => {
        socket.on('message received', (newMessage) => {
            if (selectedChatCompare && selectedChatCompare._id === newMessage.chatId) {
                setMessage([...message, newMessage]);
            }
            if (!selectedChatCompare || selectedChatCompare._id !== newMessage.chatId) {
                if (notification.includes(newMessage)) return;
                setNotification([...notification, newMessage]);
                setReloadChats(!reloadChats);
            }
        });
    });

    const sendMessage = async (e) => {
        socket.emit('not typing', selectedChat._id);
        if (e.key === 'Enter') {
            e.preventDefault();
            if (newMessage === '') return;
            try {
                const messageData = {
                    chatId: selectedChat._id,
                    message: newMessage,
                    sender: user._id,
                }
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                }

                const response = await axios.post('/api/message', messageData, config);
                const data = await response.json();

                setReloadChats(!reloadChats);
                setNewMessage('');
                socket.emit('new message', data);
                setMessage([...message, data]);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
    }
    const typingHandler = async (e) => {
        setNewMessage(e.target.value);
        if (!socketConnection) return;
        if (!typing) {
            setTyping(true);
            socket.emit('typing', selectedChat._id);
        }
        let lastTyped = new Date().getTime();
        var timer = 5000;
        setTimeout(() => {
            var currentTime = new Date().getTime();
            if (currentTime - lastTyped >= timer && typing) {
                setTyping(false);
                socket.emit('not typing', selectedChat._id);
            }
        }, timer);

    }
    return (
        <>
            {selectedChat ? (<>
                <Text fontSize='2xl' fontWeight='bold' mb={2}>title
                    <IconButton
                        ml={2}
                        icon={<AiOutlineArrowLeft />}
                        aria-label=''
                        onClick={() => setSelectedChat("")}
                    />
                    {!selectedChat.chatTypeGroup ? (
                        <>
                            {getSender(user, selectedChat.chatParticipants)}
                            <ProfileCard user={getFullSender(user, selectedChat.chatParticipants)} />
                        </>
                    ) : (
                        <>{selectedChat.chatTitle.toUpperCase()}</>
                    )}

                    <UpdateChatModalForGroup
                        reloadChats={reloadChats}
                        setReloadChats={setReloadChats}
                        fetchAllMessages={fetchAllMessages} />

                </Text>
                <Box
                    d='flex'
                    flexDir='column'
                    justifyContent='flex-end'
                    p={3}
                    bg='white'
                    w='100%'
                    h='100%'
                    borderRadius='1g'
                    overflowY='hidden'
                >

                </Box>
                <Box
                    w='100%'
                    h='80%'
                    p={3}
                    borderRadius='1g'
                    borderWidth='1px'
                    overflowY='scroll'
                    backgroundColor='white'>
                    {loading ? (
                        <Text fontSize='2xl' alignSelf='center' fontWeight='bold'><Spinner /> Loading...</Text>
                    ) : (
                        <div style={styles.message}>

                            <ChatBubbles message={message} />

                        </div>
                    )}
                    <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                        {isTyping && <Text fontSize='sm' color='gray.500'>Typing...</Text>}
                        <Input variant='filled'
                            placeholder='Type message'
                            onChange={typingHandler}
                            value={newMessage} />
                    </FormControl>
                </Box>
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