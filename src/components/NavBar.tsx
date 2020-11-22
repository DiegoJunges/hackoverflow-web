import React from 'react';
import { Box, Button, Flex, Heading, Link } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
  const router = useRouter();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  let body = null;

  // data is loading = boddy is null
  if (loading) {

    // user not logged in
  } else if (!data?.me) {
    body = (
      <Flex direction='row'>
        <NextLink href='/login'>
          <Link mr={6}>Login</Link>
        </NextLink>
        <NextLink href='/register'>
          <Link mr={16}>Register</Link>
        </NextLink>
      </Flex>
    )
    //user is logged in
  } else {
    body = (
      <Flex align='center' alignItems='center' justifyContent='center'>
        <NextLink href='/create-post'>
          <Button mr={4}>
            Create post
          </Button>
        </NextLink>
        <Flex align='center' mr={6}>{data.me.username}</Flex>
        <Button onClick={async() => {
          await logout();
          await apolloClient.resetStore();
        }}
          isLoading={logoutFetching}
          color='primary'
          mr={16}
          variant='link'>Logout</Button>
      </Flex>
    )
  }

  return (
    <Flex zIndex={1} top={0} bg='grey' p={4} direction='row'>
      <Flex flex={1} m='auto' maxW={800} align='center' alignItems='center'>
        <NextLink href='/'>
          <Link>
            <Heading>HackerOverflow</Heading>
          </Link>
        </NextLink>
        <Box ml={'auto'}>
          {body}
        </Box>
        <Flex zIndex={2} justifyContent='center' alignItems='center'>
          <DarkModeSwitch />
        </Flex>
      </Flex>
    </Flex>
  )
}
