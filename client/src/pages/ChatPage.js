import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { ChatState } from '../context/ChatProvider';
import { Box } from '@chakra-ui/react'
import ChatList from '../components/chats/ChatList';
import ChatArea from '../components/chats/ChatArea';
import SideDrawer from '../components/chats/SideDrawer';

function ChatPage() {
    const { user } = ChatState();
    const [reloadChats, setReloadChats] = useState(false);


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
        <div style={{ width: '100%' }}>
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
                        <ChatList flexBasis='20%' reloadChats={reloadChats} setReloadChats={setReloadChats} />
                        <ChatArea flexBasis='80%' reloadChats={reloadChats} setReloadChats={setReloadChats} />
                    </>
                )}
            </Box>


        </div>
    );
}

export default ChatPage;
