import React, { useEffect } from 'react'
import axios from 'axios';

function ChatPage() {
    const fetchedChats = async () => {
        const chatsData = await axios.get('http://localhost/5000/chats');
        console.log(chatsData);
    }

    useEffect(() => {
        fetchedChats();
    }, []);
    return (
        <div>
            chtty
        </div>
    )
}

export default ChatPage
