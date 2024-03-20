import React, { useState } from 'react'
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, StackDivider, VStack, ChakraProvider } from '@chakra-ui/react';
import theme from '../../utils/theme';


function Login() {

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const toggleButton = () => { setShow(!show) };
  const submitHandler = () => { console.log('yes'); };
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
        <Button colorScheme='gold' variant='solid' onClick={submitHandler}>Login</Button>

      </VStack>
    </ChakraProvider>
  )
}

export default Login
