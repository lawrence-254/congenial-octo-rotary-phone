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
  Skeleton,
  Flex
} from '@chakra-ui/react';
import axios from 'axios';


const ChatList = ({ reloadChats }) => {
  const [loggedUser, setLoggedUser] = useState();
  const toast = useToast();
  const { user, selectedChat, setSelectedChat, chat, setChat } = ChatState();

  const fetchChats = async (user) => {
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
      console.log(error.message);
    }
  };

  useEffect(() => {
    const storedUserCredentials = localStorage.getItem('userCredentials');
    if (storedUserCredentials) {
      setLoggedUser(JSON.parse(storedUserCredentials));
      fetchChats(user);
    } else {
      console.log('User credentials not found in local storage.');
    }
  }, [reloadChats]);
  // , fetchChats, user

  useEffect(() => {
    console.log(chat);
  }, [chat]);

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
      <Flex
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily={{ base: "sans-serif", md: "serif" }}
        d='row'
        w='100%'
        justifyContent={{ base: 'space-between', md: 'flex-start' }}
        alignItems='center'
        borderBottomWidth='1px'
        borderBottomColor='gray.300'

      >
        <Text mr={16}>CHATS</Text>
        <GroupChatModel>
          <Button
            d='flex'
            fontSize={{ base: "20px", md: "10px", }}
            rightIcon={<AiOutlineUsergroupAdd />}
            bg='blue.600'
            ml={8}
          >New Group</Button>
        </GroupChatModel>
      </Flex>
      <Box
        d='flex'
        flexDir='column'
        w='100%'
        h='100%'
        overflowY='auto'>
        {chat ? (<Stack overflowY='scroll'>
          {chat.map((c) => (
            <Box key={c._id}
              onClick={() => setSelectedChat(c)}
              bg={selectedChat ? 'grey' : 'teal'}
              color={selectedChat ? 'teal' : 'black'}
              p={3}
              mb={3}
              borderRadius="lg"
            >
              <Text>
                {!c.chatTypeGroup ?
                  (getSender(loggedUser, c.chatParticipants))
                  : c.chatTitle
                }
              </Text>
            </Box>
          ))}

        </Stack>
        ) : (
          <Stack>
            <Skeleton>
              <Spinner d='flex' ml='auto' color='teal' />
            </Skeleton>
          </Stack>)}
      </Box>
    </Box >
  )
}

export default ChatList