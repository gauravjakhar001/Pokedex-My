import { useState, useEffect } from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";
import Search from "../Search/Search";

function PokemonList() {
    const [pokemonListState, setPokemonListState] = usePokemonList("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPokemon, setFilteredPokemon] = useState([]);

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
            <Search onSearch={setSearchTerm} />
            
            <div className="pokemon-wrapper">
                {pokemonListState.isLoading ? (
                    <div className="loading">Loading...</div>
                ) : filteredPokemon.length === 0 ? (
                    <div className="no-results">No Pokémon found</div>
                ) : (
                    filteredPokemon.map((p) => (
                        <Pokemon 
                            key={p.id} 
                            name={p.name} 
                            image={p.image} 
                            id={p.id} 
                        />
                    ))
                )}
            </div>

            <div className="controls">
                <button
                    disabled={!pokemonListState.prevUrl}
                    onClick={() => {
                        setPokemonListState((state) => ({ 
                            ...state, 
                            pokedexUrl: pokemonListState.prevUrl 
                        }));
                    }}
                >
                    Prev
                </button>

                <button
                    disabled={!pokemonListState.nextUrl}
                    onClick={() => {
                        setPokemonListState((state) => ({ 
                            ...state, 
                            pokedexUrl: pokemonListState.nextUrl 
                        }));
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default PokemonList;
