import React, { FC } from "react"
import { Card, Grid } from '@nextui-org/react';
import { useRouter } from "next/router";

interface Props {
  pokemonId: number
}

export const FavoriteCardPokemon: FC<Props> = ({ pokemonId }) => {

  const router = useRouter();

  const onHandleClick = () => {
    router.push(`/pokemon/${pokemonId}`);
  };
  return (
    <Grid key={pokemonId} xs={6} sm={3} md={2} lg={1} xl={1}>
      <Card isHoverable isPressable css={{ padding: "10px" }} onClick={onHandleClick}>
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
          width="100%"
          height={140}
        >
        </Card.Image>
      </Card>
    </Grid>
  )
}
