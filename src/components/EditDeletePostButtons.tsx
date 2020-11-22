import React from 'react';
import NextLink from 'next/link';
import { Flex, IconButton } from '@chakra-ui/core';
import { MdModeEdit, MdDeleteForever } from 'react-icons/md';
import { useDeletePostMutation, useMeQuery } from '../generated/graphql';

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId
}) => {
  const { data: meData } = useMeQuery();

  const [deletePost] = useDeletePostMutation();

  if (meData?.me?.id !== creatorId) {
    return null
  }


  return (
    <Flex ml='auto' justifyContent='space-between' direction="row">
      <NextLink
        href='/post/edit/[id]'
        as={`/post/edit/${id}`}
      >
        <IconButton
          mr={4}
          mt='1px'
          borderRadius='10px'
          size='sm'
          as={MdModeEdit}
          aria-label='Edit post'
          ml='auto'
          color='black'
          background='grey'
          variant='ghost'
          colorScheme='green'
        />
      </NextLink>
      <IconButton
        mr={4}
        mt='1px'
        borderRadius='10px'
        size='sm'
        as={MdDeleteForever}
        aria-label='Delete post'
        ml='auto'
        color='black'
        background='grey'
        variant='ghost'
        colorScheme='red'
        onClick={() => {
          deletePost({ variables: { id }, update: (cache) => {
            // e.g. Post:45
            cache.evict({ id: 'Post:' + id });
          } });
        }}
      />
    </Flex>
  );
}
