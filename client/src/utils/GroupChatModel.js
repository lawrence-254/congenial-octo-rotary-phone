import React from 'react';
import { FormControl, Input, useDisclosure, useToast, Spinner, Box } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import { ChatState } from '../context/ChatProvider';
import { useState } from 'react';
import axios from 'axios';
import UserListItem from '../components/userUtils/UserListItem';
import UserBadge from '../components/userUtils/UserBadge';
import theme from './theme';

const ModalComponent = ({ isOpen, onClose, modalTitle, modalBody }) => {
    toast = useToast();
    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast({
                title: 'Error.',
                description: 'Please fill out all fields.',
                status: 'warning',
                duration: 9000,
                isClosable: true,
                position: 'top-right'
            });
            return;
        }
        try {
            config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            };
            const { data } = await axios.post('/api/chat/group', { name: groupChatName, users: selectedUsers.map((u) => u._id) }, config);
            setChat([data, ...chat]);
            onClose();
            toast({
                title: 'Group chat created.',
                description: 'Group chat created successfully.',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right'
            });
        }
        catch (error) {
            toast({
                title: 'Error.',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-left'
            });
            console.log(error);
        }

    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader color='tiffanyBlue'>{modalTitle}</ModalHeader>
                <ModalCloseButton />
                <ModalBody d='flex' flexDir='column' alignItems='center'>{modalBody}</ModalBody>
                <ModalFooter>
                    <Button colorScheme='teal' mr={3} onClick={handleSubmit}>
                        Create Group Chat
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

const GroupChatModel = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const { user, chat, setChat } = ChatState();
    //functions
    const handleSearch = async (searchInput) => {
        setSearch(searchInput);
        if (!searchInput) return;
        try {
            setLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.get(`/api/user?search=${searchInput}`, config);
            setSearchResults(data);
            console.log(data);
            console.log(`search res ${searchResults}`);
            setLoading(false);

        } catch (error) {
            toast({
                title: 'Error.',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-left'
            });
            console.log(error);
        }
    }

    const handleGroup = (userAdd) => () => {
        if (selectedUsers.includes(userAdd)) {
            toast({
                title: 'Error.',
                description: 'User already in group.',
                status: 'warning',
                duration: 9000,
                isClosable: true,
                position: 'top-right'
            });
        }
        setSelectedUsers([...selectedUsers, userAdd]);
    }
    const handleDelete = (userDel) => {
        setSelectedUsers(selectedUsers.filter((u) => u._id !== userDel._id) || []);
    }
    //modal props
    const modalTitle = 'Create New Group Chat';
    const modalBody = <>
        <FormControl>
            <Input placeholder='Group Title' mb={3}
                onChange={(e) => setGroupChatName(e.target.value)} />
        </FormControl>
        <FormControl>
            <Input placeholder='Add Group Participants' mb={3}
                onChange={(e) => handleSearch(e.target.value)} />
        </FormControl>
        <Box d='flex' flexWrap='wrap' w='100%'>{selectedUsers.map((u) => (<UserBadge key={u._id} user={u} handleFunction={() => handleDelete(u)} colorScheme='tiffanyBlue' />))}
        </Box>{loading ? <Spinner colorScheme='teal' /> : (
            searchResults?.map((u) => (<UserListItem key={u._id} user={u} handleFunction={() => handleGroup(u)} colorScheme='tiffanyBlue' />))

        )}
    </>
    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <ModalComponent isOpen={isOpen} onClose={onClose} modalTitle={modalTitle} modalBody={modalBody} />
        </>
    );
};

export default GroupChatModel;