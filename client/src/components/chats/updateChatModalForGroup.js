import { IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlineFundView } from "react-icons/ai";
import { ChatState } from '../../context/ChatProvider';
import { useState } from 'react'
import UserBadge from '../userUtils/UserBadge'


const updateChatModalForGroup = ({ reloadChats, setReloadChats }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, selectedChat, setSelectedChat, chat, setChat } = ChatState();
    const [groupChatName, setGroupChatName] = useState('');
    const [search, setSearch] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);
    const toast = useToast();

    const handleRemoveUser = () => { };
    const handleRename = async () => {
        try {
            setRenameLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.put('/api/chat/rename', config);
        } catch (error) {
            
        }
    };
    const handleSearch = () => { };

    return (
        <>
            <IconButton d={{ base: 'flex' }} icon={<AiOutlineFundView />} onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color='tiffanyBlue'>Edit</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody d='flex' flexDir='column' alignItems='center'>
                        <Box>{selectedChat.users.map((u) => (<UserBadge key={u._id} user={u} handleFunction={() => handleRemoveUser(u)} colorScheme='tiffanyBlue' />
                        ))}</Box>
                        <FormControl>
                            <Input placeholder='Group Title' mb={3} value={groupChatName} onChange={(e) => setGroupChatName(e.target.value)} />
                            <Button onClick={handleRename} isLoading={renameLoading}>update</Button>
                        </FormControl>
                        <FormControl>
                            <Input placeholder='Add Group Participants' mb={3} onChange={(e) => handleSearch(e.target.value)} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={() => handleRemoveUser(user)}>
                            Exit Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default updateChatModalForGroup