import {PokemonClient} from "pokenode-ts";

interface PokemonData {
  id: number;
    name: string;
    height: number;
    weight: number;
    abilities: string[];
    stats: {
      name: string;
      base_stat: number;
  }[];
  types: string[];
  sprite: string | null;
}

export const searchPokemonWithPokeApi = async (pokemonName: string): Promise<PokemonData> => {
  try {
    const client = new PokemonClient({
      cacheOptions: {maxAge: 10000, exclude: {query: false}},
    });
    const response = await client.getPokemonByName(pokemonName);
    const searchResult = {
      id: response.id,
      name: response.name,
      height: response.height,
      weight: response.weight,
      abilities: response.abilities.map((ability) => ability.ability.name),
      stats: response.stats.map((stat) => ({
        name: stat.stat.name,
        base_stat: stat.base_stat,
      })),
      types: response.types.map((type) => type.type.name),
      sprite: response.sprites.front_default,
    };
    return searchResult;
  } catch (error) {
    if (!(error instanceof Error)) throw new Error("Something went wrong");
    if (error.message === "Request failed with status code 404") throw new Error("Pokemon not found");
    throw error;
  }
};
