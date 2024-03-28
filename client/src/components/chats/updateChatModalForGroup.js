import { IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlineFundView } from "react-icons/ai";
import { ChatState } from '../../context/ChatProvider';
import UserBadge from '../userUtils/UserBadge';
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, Input, Spinner, Box, useToast } from '@chakra-ui/react';
import UserListItem from '../userUtils/UserListItem';
import axios from 'axios';

const UpdateChatModalForGroup = ({ reloadChats, setReloadChats }) => {
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
        if (!groupChatName) return;
        try {
            setRenameLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.put('/api/chat/rename', { chatId: selectedChat._id, chatTitle: groupChatName }, config);

            setSelectedChat(data);
            setReloadChats(!reloadChats);
            setRenameLoading(false);
        } catch (error) {
            toast({ title: 'Error', description: error.message, status: 'error', duration: 3000, isClosable: true });
            setRenameLoading(false);
        }
        setGroupChatName("")
    };
    const handleSearch = () => { };

    const handleAddUser = () => { };

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
                        {loading ? <Spinner colorScheme='teal' /> : (
                            searchResults?.map((u) => (
                                <UserListItem key={u._id} user={u} handleFunction={() => handleAddUser(u)} colorScheme='tiffanyBlue' />
                            ))
                        )}
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

export default UpdateChatModalForGroup