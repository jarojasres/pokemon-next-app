
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { pokeApi } from 'api';
import { Layout } from 'components/layouts';
import { Pokemon } from 'interfaces';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react'

interface Props {
  pokemon: Pokemon
};

const PokemonPage : NextPage<Props> = ({pokemon}) => {
  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{marginTop: "5px"}} gap={ 2 }>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{padding: "30px"}}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || "/no-image.png"}
                width="100%"
                alt={pokemon.name}
                height={200}
              />

            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{display: "flex", "justifyContent": "space-between"}}>
              <Text h1 transform='capitalize'>{pokemon.name}</Text>
              <Button
                color="gradient"
                ghost
                >
                  Guardar en favoritos
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction='row' display='flex' gap={0}>
                <Image src={pokemon.sprites.front_default} width={100} height={100} />
                <Image src={pokemon.sprites.back_default} width={100} height={100} />
                <Image src={pokemon.sprites.front_shiny} width={100} height={100} />
                <Image src={pokemon.sprites.back_shiny} width={100} height={100} />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const ids = [...Array(151).keys()].map(x => ({
    params: {
      id: `${x + 1}`
    }
  }));


  return {
    paths: ids,
    fallback: false
  }
};

export const getStaticProps: GetStaticProps = async ({params}) => {

  const { id } = params as {id: string}; 
  const { data: pokemon } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);


  return {
    props: {
      pokemon
    }
  };
};

export default PokemonPage;
