import React, { useState } from 'react'
import { Box, FormControl, FormLabel, Input, StackDivider, VStack } from '@chakra-ui/react';


function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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

        </VStack>
    )
}

export default Signup
