import React from 'react'
import { Button, IconButton, Text, useDisclosure, Avatar } from '@chakra-ui/react'
import { GrView } from "react-icons/gr";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

const ProfileCard = ({ user, children }) => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const OverlayTwo = () => (
        <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='80%'
            backdropBlur='2px'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)
    return (
        <>
            {children ? <span onClick={() => {
                setOverlay(<OverlayOne />)
                onOpen()
            }}
            >{children}</span> : (<IconButton icon={<GrView />} d={{ base: 'flex' }}
                onClick={onOpen} />)}
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader
                        fontSize='40x'
                        d='flex'
                        justifyContent='center'
                    >{user.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        d='flex'
                        flexDirection='column'
                        justifyContent='space-between'
                    >
                        <Avatar size='2xl' cursor='pointer' name={user.name} src={user.picture} />
                        <Text>{user.email}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

export default ProfileCard