import React from 'react';
// import axios from 'axios';
import { ChatState } from '../context/ChatProvider';
// import leftDrawer from '../components/leftDrawer';
import { Box } from '@chakra-ui/react'

function ChatPage() {
    const { user } = ChatState();

    return (
        <div style={{ width: '100vw' }}>
            {/* {user && <leftDrawer />} */}
            <Box>
                {user && <h1>Welcome {user.name}</h1>}
                {!user && <h1>Chat Page</h1>}
            </Box>
        </div>
    );
}

export default ChatPage;
