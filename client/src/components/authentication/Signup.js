import React, { useState } from 'react'
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, StackDivider, VStack } from '@chakra-ui/react';
import theme from '../../utils/theme';



function Signup() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const toggleButton = () => { setShow(!show) };
    const processImage = (pic) => { console.log('nnooo'); };
    return (
        <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={4}
            align='stretch'
        >
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input type='text' placeholder='Your name' onChange={(e) => {
                    setName(e.target.value);
                }} />
            </FormControl>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type='email' placeholder='Your email' onChange={(e) => {
                    setEmail(e.target.value);
                }} />
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={show ? 'text' : 'password'} placeholder='Your password' onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={toggleButton}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input type={show ? 'text' : 'password'} placeholder='Your password' onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }} />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={toggleButton}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl>
                <FormLabel>Profile picture</FormLabel>
                <Input accept='image/' type='file' onChange={(e) => {
                    processImage(e.target.files[0]);
                }} />
            </FormControl>
            <Button colorScheme='teal' variant='solid'>Signup</Button>
        </VStack>
    )
}

export default Signup
