import React, { useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { FcSearch } from "react-icons/fc";
import { Avatar, MenuDivider, Text, Input } from '@chakra-ui/react';
import { FaRegBell } from "react-icons/fa";
import { Menu, MenuButton, MenuList, MenuItem, Tooltip } from '@chakra-ui/react';
import { TbSquareRoundedChevronDown } from "react-icons/tb";
import ProfileCard from './ProfileCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  useToast,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from '@chakra-ui/react';

const SideDrawer = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const navigate = useNavigate();
  //drawer
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const { user } = ChatState();
  const logOutHandler = () => {
    localStorage.removeItem('userCredentials');
    window.location.reload();
    navigate('/');

  }

  const searchHandler = async () => {
    if (!search) {
      toast({
        title: 'Empty field.',
        description: "please enter something before you submit.",
        status: 'warning',
        duration: 9000,
        isClosable: true,
        position: 'top-left'
      });
      return;

    }
    try {
      setLoading(true);
      // search for user
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };
      const { data } = await axios.get(`/api/user/search?name=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: 'Error.',
        description: "Failed to load search result.",
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-left'
      });
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <>
      <Box
        d='flex'
        justifyContent='space-between'
        alignItems='center'
        bg='white'
        w='100%'
        p='5px 10px'
        borderWidth='5px'
      >
        <Tooltip label="Search for a user" aria-label="Search for a user" hasArrow placement='bottom-end'>
          <Button variant='ghost' backgroundColor='teal' display="flex" alignItems="center" onClick={onOpen}>
            <Text display={{ base: 'none', md: 'flex' }} px='4'>Search for a user</Text>
            <FcSearch />
          </Button>
        </Tooltip>

        <Text fontFamily='Style Script' color='teal' fontSize='4xl'>Twitter</Text>

        <Menu>
          <MenuButton>
            <FaRegBell fontSize='8xl' m={1} color='teal' fontFamily='Style Script' />
          </MenuButton>
          <MenuList>
            <MenuItem>
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<TbSquareRoundedChevronDown />} m={1} backgroundColor='teal'>
            <Avatar size='sm' cursor='pointer' name={user.name} src={user.picture} />
          </MenuButton>
          <MenuList>
            <ProfileCard user={user} >
              <MenuItem>
                PROFILE
              </MenuItem>
            </ProfileCard>
            <MenuDivider />
            <MenuItem
              onClick={logOutHandler}
            >LOGOUT</MenuItem>
          </MenuList>
        </Menu>
      </Box >

      {/* drawer */}
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}

      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='2px'>Search user</DrawerHeader>

          <DrawerBody>
            <Box d='flex' justifyContent='center' pb={2} alignItems='center' flexDirection='column'>
              <Input placeholder='Search here...'
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button colorScheme='teal' onClick={searchHandler}>
                <FcSearch />
              </Button>
            </Box>
            {loading ? (
              <Text>Loading...</Text>
            ) : searchResult.length === 0 ? (
              <Text>No user found.</Text>
            ) : (
              searchResult.map((user) => (
                <Box
                  key={user._id}
                  d='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  p={2}
                  borderWidth='1px'
                  borderRadius='5px'
                >
                  <Avatar size='sm' name={user.name} src={user.picture} />
                  <Text>{user.name}</Text>
                  <Button
                    colorScheme='teal'
                    size='sm'
                    onClick={() => {
                      // create chat
                      console.log('Create chat with:', user);
                    }}
                    isLoading={loadingChat}
                  >
                    Chat
                  </Button>
                </Box>
              ))
            )}


          </DrawerBody>


        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
