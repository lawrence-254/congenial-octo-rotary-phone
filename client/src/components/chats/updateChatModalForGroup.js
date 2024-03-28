import { IconButton } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineFundView } from "react-icons/ai";


const updateChatModalForGroup = ({ reloadChats, setReloadChats }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();


    return (
        <>
            <IconButton d={{ base: 'flex' }} icon={<AiOutlineFundView />} onClick={onOpen}/>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color='tiffanyBlue'>Edit</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody d='flex' flexDir='column' alignItems='center'>{modalBody}</ModalBody>
                    <ModalFooter>
                        <Button colorScheme='teal' mr={3} onClick={handleSubmit}>
                            Create Group Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default updateChatModalForGroup