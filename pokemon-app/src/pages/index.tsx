import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { Button, Card, Grid, Row, Text } from '@nextui-org/react'
import { Layout } from 'components/layouts';
import { GetStaticProps, NextPage } from 'next';
import { pokeApi } from 'api';
import { PokemonListResponse, SmallPokemon } from 'interfaces';
import { POKE_IMG_URL } from 'utils';
import { PokemonCard } from 'components/pokemon';

const inter = Inter({ subsets: ['latin'] })

interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({pokemons}) => {

  return (
    <Layout title="Listado de Pokémons">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  )
};

export const getStaticProps: GetStaticProps =  async (context) => {

  const {data} = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
  return {
    props: {
      pokemons: data.results.map((x, i) => ({
        ...x,
        id: i + 1,
        img: `${POKE_IMG_URL}/${i + 1}.svg`
      }))

    }, // will be passed to the page component as props
  }
};

export default HomePage;
