import React, { useState } from 'react'
import { useToast, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, StackDivider, VStack, ChakraProvider } from '@chakra-ui/react';
import theme from '../../utils/theme';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //
  const [loading, setLoading] = useState(false);
  const toast = useToast()
  const navigate = useNavigate();


  const toggleButton = () => { setShow(!show) };
  const submitHandler = async () => {
    setLoading(true);

    if (!email || !password) {
      alert('All fields are required');
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const { data } = await axios.post('/api/user/login', {
        email,
        password,
      }, config);

      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      localStorage.setItem('userCredentials', JSON.stringify(data));
      setLoading(false);
      navigate('/chats');
    } catch (error) {
      toast({
        title: 'An Error Occurred',
        description: error.response.data.message || 'Something went wrong.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };
  return (
    <ChakraProvider theme={theme}>
      <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align='stretch'
      >
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
        <Button colorScheme='gold' variant='solid' onClick={submitHandler}
          isLoading={loading}>Login</Button>

      </VStack>
    </ChakraProvider>
  )
}

export default Login
