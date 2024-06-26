import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Login from '../components/authentication/Login';
import Signup from '../components/authentication/Signup';

function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userCredentials'));
        if (userInfo) {
            navigate('/chats');
        }
    }, [navigate]);
    return (
        <Container centerContent
        // justifyContent="center"
        // alignItems="center"
        // height="100vh"
        >
            <Box backgroundColor='teal' fontFamily='Style Script' fontWeight='400' borderRadius='md' width='50vw' p={4} m={4} fontSize="xl">
                <Text fontSize="50px" textAlign="center" align="center">WITTER</Text>
            </Box>
            <Box borderRadius='md' m={4}>
                <Text></Text>
                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList mb='1em'>
                        <Tab>LOGIN</Tab>
                        <Tab>SIGNUP</Tab>
                    </TabList>
                    <TabPanels backgroundColor='teal' width='50vw'>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default HomePage
