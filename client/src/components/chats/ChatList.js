import React, { useEffect, useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { getSender } from '../../config/chatFunctions';
import GroupChatModel from '../../utils/GroupChatModel';
import {
  Text,
  Box,
  Button,
  useToast,
  Spinner,
  Stack,
  Skeleton
} from '@chakra-ui/react';
import axios from 'axios';


const ChatList = ({ reloadChats }) => {
  const [loggedUser, setLoggedUser] = useState();
  const toast = useToast();
  const { user, selectedChat, setSelectedChat, chat, setChat } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };
      const { data } = await axios.get(`/api/chat`, config);
      console.log(data);
      setChat(data);
    } catch (error) {
      toast({
        title: 'Error.',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-left'
      });
      console.log(error);
    }
  };

  useEffect(() => {
    const storedUserCredentials = localStorage.getItem('userCredentials');
    if (storedUserCredentials) {
      setLoggedUser(JSON.parse(storedUserCredentials));
      fetchChats();
    } else {
      console.log('User credentials not found in local storage.');
    }
  }, [reloadChats]);



  return (
    <Box d={{ base: selectedChat ? "none" : "flex", md: 'flex' }}
      flexDir="column"
      alignContent="center"
      p={4}
      bg="gray.100"
      w={{ base: '100%', md: '30%' }}
      borderRadius="1g"
      borderWidth="1px"
    >
      <Box
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily={{ base: "sans-serif", md: "serif" }}
        d='flex'
        w='100%'
        justifyContent={{ base: 'space-between', md: 'flex-start' }}
        alignItems='center'
        borderBottomWidth='1px'
        borderBottomColor='gray.300'

      >
        Chats
        <GroupChatModel>
          <Button
            d='flex'
            fontSize={{ base: "17px", md: "10px", }}
            rightIcon={<AiOutlineUsergroupAdd />}
          >New Group</Button>
        </GroupChatModel>
      </Box>
      <Box
        d='flex'
        flexDir='column'
        w='100%'
        h='100%'
        overflowY='auto'>{chat ? (<Stack>
          {chat.map(c => (
            <Box key={c.id}
              onClick={() => setSelectedChat(c)}
              bg={selectedChat ? 'teal' : 'grey'}
              color={selectedChat ? 'black' : 'teal'}
              p={3}
              borderRadius="lg"
            >
              <Text>{!c.chatTypeGroup ? (
                getSender(loggedUser, c.chatParticipants.name)
              ) : c.name}</Text>
            </Box>
          ))}
        </Stack>
        ) : (
          <Stack><Skeleton><Spinner d='flex' ml='auto' color='teal' /></Skeleton>
          </Stack>)}</Box>
    </Box>
  )
}

export default ChatList