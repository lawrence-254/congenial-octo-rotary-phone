import React, { useState, useEffect } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { Box, FormControl, IconButton, Input, Spinner, Text } from '@chakra-ui/react'
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getSender, getFullSender } from '../../config/chatFunctions';
import ProfileCard from './ProfileCard';
import UpdateChatModalForGroup from './UpdateChatModalForGroup';
import axios from 'axios';
import ChatBubbles from './ChatBubbles';
import io, { io } from 'socket.io-client';

// socket io endpoint
const ENDPOINT = 'http://localhost:5000';
var socket, selectedChatCompare;

const ChatBoxComponent = ({ reloadChats, setReloadChats }) => {
    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, selectedChat, setSelectedChat, chat, setChat } = ChatState();
    // const toast = Toast();
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
    }, [selectedChat, reloadChats]);


    useEffect(() => {
        const io = io(ENDPOINT);
        // const socket = io('http://localhost:5000');
        // socket.on('connect', () => {
        //     console.log('connected');
        // });
        // socket.on('disconnect', () => {
        //     console.log('disconnected');
        // });
        // socket.on('chat message', (msg) => {
        //     console.log('message: ' + msg);
        //     setMessage([...message, msg]);
        // });
        // return () => {
        //     socket.disconnect();
        // }
    }, [message]);
    const sendMessage = async (e) => {
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
                setMessage([...message, data]);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
    }
    const typingHandler = async (e) => {
        setNewMessage(e.target.value);
    }
    return (
        <>
            {selectedChat ? (<>
                <Text fontSize='2xl' fontWeight='bold' mb={2}>title
                    <IconButton
                        ml={2}
                        icon={<AiOutlineArrowLeft />}
                        // icon={<AiOutlineUsergroupAdd />}
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
                    {/* to be deleted */}
                    {loading ? (
                        <Text fontSize='2xl' alignSelf='center' fontWeight='bold'><Spinner /> Loading...</Text>
                    ) : (
                        <div style={styles.message}>
                            {message.map((msg, i) => (
                                <Box
                                    key={i}
                                    p={2}
                                    mb={2}
                                    borderRadius='1g'
                                    borderWidth='1px'
                                    borderColor='gray.200'
                                >
                                    <Text fontSize='lg' fontWeight='bold'>{getSender(user, msg.sender).username}</Text>
                                    <Text fontSize='lg'>{msg.message}</Text>
                                </Box>
                            ))}
                        </div>
                    )}
                    <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                        <Input variant='filled'
                            placeholder='Type message'
                            onChange={typingHandler}
                            value={newMessage} />
                    </FormControl>
                    {/* end of to be deleted */}
                </Box>
            )}
        </>
    )
}

export default ChatBoxComponent