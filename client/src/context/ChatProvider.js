import { createContext, useContext } from 'react';



const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
        <ChatContext.Provider value={{}}>
            {children}
        </ChatContext.Provider>
    );
}
export const chatState = () => {
    return useContext(ChatContext);
}
export default ChatProvider;