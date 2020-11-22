import React from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { Layout } from '../../components/Layout';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';
import { EditDeletePostButtons } from '../../components/EditDeletePostButtons';
import { withApollo } from '../../utils/withApollo';

const Post = ({ }) => {
  const { data, error, loading } = useGetPostFromUrl();

  if (loading) {
    return (
      <Layout>
        <Box>Loading...</Box>
      </Layout>
    )
  }

  if (error) {
    return <Box>{error.message}</Box>
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find post</Box>
      </Layout>
    );
  };

  return (
    <Layout>
      <Flex direction='column' mb={4} align='center'>
        <Heading mb={4}>{data.post.title}</Heading>
        {data.post?.text}
      </Flex>
      <Flex>
        <EditDeletePostButtons
          id={data.post.id}
          creatorId={data.post.creator.id}
        />
      </Flex>
    </Layout>
  );
}

export default withApollo({ ssr: true })(Post);
