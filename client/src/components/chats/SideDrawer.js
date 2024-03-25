import React, { useState } from 'react'
import { Box } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/react';

const SideDrawer = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  return (
    <>
      <Box>
        <Tooltip label="Search for a user" aria-label="Search for a user"></Tooltip>
      </Box>
    </>
  )
}

export default SideDrawer