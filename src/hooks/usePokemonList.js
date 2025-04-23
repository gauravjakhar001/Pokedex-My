import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(url, type) {
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: url,
        nextUrl: '',
        prevUrl: ''
    });

    async function downloadPokemon() {
        setPokemonListState({ ...pokemonListState, isLoading: true });

        try {
            const response = await axios.get(pokemonListState.pokedexUrl);
            const pokemonResults = response.data.results;

            // Fetch details for each Pokemon
            const pokemonDetails = await Promise.all(
                pokemonResults.map(async (pokemon) => {
                    const detailsResponse = await axios.get(pokemon.url);
                    return {
                        name: detailsResponse.data.name,
                        image: detailsResponse.data.sprites.other.dream_world.front_default,
                        id: detailsResponse.data.id
                    };
                })
            );

            setPokemonListState((state) => ({
                ...state,
                nextUrl: response.data.next,
                prevUrl: response.data.previous,
                pokemonList: pokemonDetails,
                isLoading: false
            }));
        } catch (error) {
            console.error("Error fetching Pokemon:", error);
            setPokemonListState((state) => ({
                ...state,
                isLoading: false
            }));
        }
    }

    useEffect(() => {
        downloadPokemon();
    }, [pokemonListState.pokedexUrl]);

    return [pokemonListState, setPokemonListState];
}

export default usePokemonList;