import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import Link from 'next/link';

export const GET_FILMS = gql`
  query GetFilms {
    allFilms {
      films {
        id
        title
      }
    }
  }
`;

const apiURl = 'https://swapi-graphql.netlify.app/.netlify/functions/index';

const Test = (): JSX.Element => {
  const { data, status } = useQuery<FilmsData>({ queryKey: ['posts'], queryFn: fetchData });

  if (status === 'loading') {
    return <p>Loading films...</p>;
  }

  if (status === 'error') {
    return <p>Error loading films!</p>;
  }
  return (
    <div>
      <h1>Film List</h1>
      {data && data?.data?.allFilms?.films.map((film: Film) => <li key={film.id}>{film.title}</li>)}
      <br />
      <Link href="/">Back to Home</Link>
    </div>
  );
};

export default Test;

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['posts'], fetchData);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const fetchData = async () => {
  const res = await fetch(apiURl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_FILMS,
    }),
  });

  return res.json();
};

interface Film {
  id: string;
  title: string;
}

interface FilmsData {
  data: {
    allFilms: {
      films: Film[];
    };
  };
}
