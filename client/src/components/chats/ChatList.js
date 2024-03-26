import React, { useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import {
  useToast
} from '@chakra-ui/react';

const ChatList = () => {
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
      setChat(data);
    }
    catch (error) {
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

  return (
    <div>

    </div>
  )
}

export default ChatList