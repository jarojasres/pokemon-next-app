
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { pokeApi } from 'api';
import { Layout } from 'components/layouts';
import { Pokemon } from 'interfaces';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react'
import { getPokemonInfo, localFavorites } from 'utils';
import confetti from "canvas-confetti";

interface Props {
  pokemon: Pokemon
};

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorites, setIsInFavorites] = useState(false);

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

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
  }, [pokemon.id]);

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
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
            <Card.Header css={{ display: "flex", "justifyContent": "space-between" }}>
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
                <Image src={pokemon.sprites.front_default} alt={"pokemon images"} width={100} height={100} />
                <Image src={pokemon.sprites.back_default} alt={"pokemon images"} width={100} height={100} />
                <Image src={pokemon.sprites.front_shiny} alt={"pokemon images"} width={100} height={100} />
                <Image src={pokemon.sprites.back_shiny} alt={"pokemon images"} width={100} height={100} />
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
    //fallback: false
    fallback: "blocking"
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { id } = params as { id: string };

  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }
  
  return {
    props: {
      pokemon
    },
    revalidate: 86400
  };
};

export default PokemonPage;
