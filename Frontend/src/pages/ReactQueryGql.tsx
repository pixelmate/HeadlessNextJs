import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { request, gql } from 'graphql-request';
import { GetStaticProps } from 'next';

const endpoint = 'https://graphqlzero.almansi.me/api';

const QUERY_KEY = 'ports';

const getData = async () => {
  const {
    posts: { data },
  } = await request<{ posts: { data: { id: number; title: string }[] } }>(
    endpoint,
    gql`
      query {
        posts {
          data {
            id
            title
          }
        }
      }
    `
  );
  return data;
};

const usePosts = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getData,
    retry: 0,
  });
};

const GraphQLPOC = () => {
  const { data } = usePosts();
  return (
    <>{data && data.map((post: { title: string }) => <div key={post.title}>{post.title}</div>)}</>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([QUERY_KEY], getData);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default GraphQLPOC;
