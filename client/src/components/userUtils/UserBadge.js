import { Box } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons';

import React from 'react'

const UserBadge = ({ user, handleFunction }) => {
    return (
        <Box
            p={2}
            borderRadius='lg'
            m={2}
            variant='solid'
            fontSize={14}
            colorscheme='teal'
            cursor='pointer'
            onClick={handleFunction}
        >
            {user.name}
            <CloseIcon />
        </Box>
    )
}

export default UserBadge