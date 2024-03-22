import React, { useState } from 'react'
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, StackDivider, VStack, ChakraProvider } from '@chakra-ui/react';
import theme from '../../utils/theme';



function Signup() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // pic loading
    const [loading, setLoading] = useState(false);

    const toggleButton = () => { setShow(!show) };
    const processImage = (pic) => {
        setLoading(true);
        if (!pic) return;
        if (pic.type === 'image/jpeg' || pic.type === 'image/png') {
            const data = new FormData();
            data.append('file', pic);
            data.append('upload_preset', 'mern_chat_web_app');
            data.append('cloud_name', 'dyca8fhde');
            fetch('https://api.cloudinary.com/v1_1/dyca8fhde/image/upload', {
                method: 'post',
                body: data
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    setProfilePic(data.url);
                    setLoading(false);
                }).catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        }

    };
    const submitHandler = () => {
        setLoading(true);
        if (!name || !email || !password || !confirmPassword) {
            alert('All fields are required');
            setLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            setLoading(false);
            return;
        }
        fetch('http://localhost:5000/api/auth/signup', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
                profilePic
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                setLoading(false);
            }).catch(err => {
                console.log(err);
                setLoading(false);
            });
    };
    return (
        <ChakraProvider theme={theme}>
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
                <Button colorScheme='gold' variant='solid' onClick={submitHandler}>Signup</Button>
            </VStack>
        </ChakraProvider>
    )
}

export default Signup
