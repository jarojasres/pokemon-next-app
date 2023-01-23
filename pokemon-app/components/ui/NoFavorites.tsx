import { Container, Image, Text } from "@nextui-org/react";
import React from "react";

export const NoFavorites = () => {
  return (
    <Container css={{
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 100px)",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
    }}>
      <Text h1>Favorite Pokemons</Text>
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg"
        width={250}
        height={250}
        alt="No favorites"
        css={{
          opacity: 0.1
        }}
      ></Image>
    </Container>
  );
}
