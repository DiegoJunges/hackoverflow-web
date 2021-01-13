import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/core';
import NextLink from 'next/link';
import React from 'react';
import { EditDeletePostButtons } from '../components/EditDeletePostButtons';
import { Layout } from '../components/Layout';
import { UpdootSection } from '../components/UpdootSection';
import { usePostsQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

const Index = () => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });


  if (!loading && !data) {
    return (
      <Box>
        <Box>You got query failed for some reason</Box>
        <Box>{error?.message}</Box>
      </Box>
    )
  }

  return (
    <Layout>
        <Heading>HackOverflow</Heading>
        <NextLink href='/create-post'>
          <Link>Create post</Link>
        </NextLink>
        <br />
        {!data && loading ? (
          <div>Loading...</div>
        ) : (
            <Stack spacing={8} >
              {data!.posts.posts.map((p) =>
                !p ? null : (
                  <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                    <Box flex={1}>
                      <NextLink href='/post/[id]' as={`/post/${p.id}`}>
                        <Link>
                          <Heading fontSize="xl">{p.title}</Heading>
                        </Link>
                      </NextLink>
                      <Text>Posted by {p.creator.username}</Text>
                      <Text flex={1} mt={4}>{p.textSnippet}</Text>
                    </Box>
                    <Flex ml='auto' justifyContent='space-between' direction="row">
                      <EditDeletePostButtons
                        id={p.id}
                        creatorId={p.creator.id}
                      />
                    </Flex>
                    <UpdootSection post={p} />
                  </Flex>
                ))}
            </Stack>
          )}
        {data && data.posts.hasMore ? (
          <Flex>
            <Button
              onClick={() => {
                fetchMore({
                  variables: {
                    limit: variables?.limit,
                    cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
                  },
                });
              }}
              isLoading={loading}
              m="auto"
              my={8}
            >
              Load more
          </Button>
          </Flex>
        ) : null}
    </Layout>
  )
}

export default withApollo({ ssr: true })(Index);
