import { useState, useEffect } from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";
import Search from "../Search/Search";

function PokemonList() {
    const { pokemonListState, setPokemonListState } = usePokemonList("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPokemon, setFilteredPokemon] = useState([]);

    // Update the displayed Pokémon when the search term changes
    useEffect(() => {
        if (searchTerm === "") {
            setFilteredPokemon(pokemonListState.pokemonList);
        } else {
            const filtered = pokemonListState.pokemonList.filter((p) =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPokemon(filtered);
        }
    }, [searchTerm, pokemonListState.pokemonList]);

    return (
        <div className="pokemon-list-wrapper">
            {/* Search Component */}
            <Search onSearch={setSearchTerm} />

            <div className="pokemon-wrapper">
                {pokemonListState.isLoading
                    ? "Loading...."
                    : filteredPokemon.map((p) => (
                          <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
                      ))}
            </div>

            <div className="controls">
                <button
                    disabled={pokemonListState.prevUrl == null}
                    onClick={() => {
                        const urlToSet = pokemonListState.prevUrl;
                        setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet });
                    }}
                >
                    Prev
                </button>

                <button
                    disabled={pokemonListState.nextUrl == null}
                    onClick={() => {
                        const urlToSet = pokemonListState.nextUrl;
                        setPokemonListState((state) => ({ ...pokemonListState, pokedexUrl: urlToSet }));
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default PokemonList;
