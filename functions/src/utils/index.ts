import algoliasearch from "algoliasearch";

const ALGOLIA_ID: string = process.env.ALGOLIA_APP_ID as string;
const ALGOLIA_ADMIN_KEY: string = process.env.ALGOLIA_ADMIN_KEY as string;

const algoliaClient = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
export const algoliaIndex = algoliaClient.initIndex("pokedocs_pokemons");
