import { createContext, useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';


const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem('user');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        } else {
            // navigate('/');
        }
    }, []);

    return (
        <ChatContext.Provider value={{ user, setUser }}>
            {children}
        </ChatContext.Provider>
    );
}
export const ChatState = () => {
    return useContext(ChatContext);
}
export default ChatProvider;