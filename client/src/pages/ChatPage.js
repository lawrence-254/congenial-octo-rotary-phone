import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChatPage() {
    const [chats, setChats] = useState([]);

    const fetchedChats = async () => {
        try {
            const response = await axios.get('/api/chat');
            setChats(response.data);
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    }

    useEffect(() => {
        fetchedChats();
    }, []);

    return (
        <div>
            {chats.map(chat => (
                <div key={chat._id}>
                    {/* Render chat details here */}
                    <p>{chat.chatName}</p>
                    {/* Add more chat details as needed */}
                </div>
            ))}
        </div>
    );
}

export default ChatPage;
