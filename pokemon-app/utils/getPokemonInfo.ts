import { pokeApi } from "api";
import { Pokemon } from "interfaces";

export const getPokemonInfo = async (pokemonNameOrId: string) => {

  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${pokemonNameOrId}`);
    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites
    };

  } catch(error) {
    return null;
  }

};