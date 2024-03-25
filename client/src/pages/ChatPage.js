import React, { useEffect } from 'react';
// import axios from 'axios';
import { ChatState } from '../context/ChatProvider';
// import LeftDrawer from '../components/chats/LeftDrawer';
import { Box } from '@chakra-ui/react'
import ChatList from '../components/chats/ChatList';
import ChatArea from '../components/chats/ChatArea';
import SideDrawer from '../components/chats/SideDrawer';

function ChatPage() {
    const { user } = ChatState();


    useEffect(() => {
        // Check if user state is available and handle accordingly
        if (!user) {
            console.log('User not found. Redirecting to home page...');
            // You can add additional logic like redirection or showing a message
        } else {
            console.log('User found:', user);
        }
    }, [user]);

    return (
        <div style={{ width: '100vw' }}>
            {user && <SideDrawer />}
            <Box
                display='flex'
                justifyContent='space-between'
                width='100%'
                height='90vh'
                padding='10px'
            >
                {user && (
                    <>
                        <ChatList flexBasis='20%' />
                        <ChatArea flexBasis='80%' />
                    </>
                )}
            </Box>


        </div>
    );
}

export default ChatPage;
