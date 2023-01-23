import { Grid, Card, Button, Container, Text, Image } from '@nextui-org/react';
import { pokeApi } from 'api';
import { Layout } from 'components/layouts';
import { Pokemon, PokemonListResponse } from 'interfaces'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { getPokemonInfo, localFavorites } from 'utils';
import confetti from "canvas-confetti";

interface Props {
  pokemon: Pokemon
};

export const PokemonByNamePage: NextPage<Props> = ({pokemon}) => {

  const [isInFavorites, setIsInFavorites] = useState(false); 

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite( pokemon.id);
    setIsInFavorites(!isInFavorites);
    
    if( isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    });
    
  };

  useEffect(() => {
    setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
  }, []);

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
                ghost={!isInFavorites}
                onClick={onToggleFavorite}
                >
                  {isInFavorites ? "Quitar de favoritos" : "Guardar en favoritos"}
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

export const getStaticPaths: GetStaticPaths = async () => {

  const {data} = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const paths = data.results.map((x, i) => ({
    params: {
      name: x.name
    }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {

  const { name } = params as {name: string}; 

  return {
    props: {
      pokemon: await getPokemonInfo(name)
    }
  };
};

export default PokemonByNamePage;

