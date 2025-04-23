import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css';
import { Link } from "react-router-dom";

function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [similarPokemon, setSimilarPokemon] = useState([]);

    async function downloadPokemon() {
        try {
            setIsLoading(true);
            setError(null);
            
            // Fetch main Pokemon details
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const pokemonData = response.data;
            
            setPokemon({
                name: pokemonData.name,
                image: pokemonData.sprites.other.dream_world.front_default || pokemonData.sprites.front_default,
                weight: pokemonData.weight,
                height: pokemonData.height,
                types: pokemonData.types.map((t) => t.type.name)
            });

            // Fetch similar Pokemon based on the first type
            if (pokemonData.types.length > 0) {
                const typeResponse = await axios.get(`https://pokeapi.co/api/v2/type/${pokemonData.types[0].type.name}`);
                setSimilarPokemon(typeResponse.data.pokemon.slice(0, 5));
            }
        } catch (err) {
            setError("Failed to fetch Pokemon details");
            console.error("Error fetching Pokemon:", err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        downloadPokemon();
    }, [id]);

    if (isLoading) {
        return <div className="loading">Loading Pokemon details...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="pokemon-details-wrapper">
            <div className="pokemon-details-header">
                <Link to="/" className="back-button">← Back to Pokedex</Link>
            </div>

            <div className="pokemon-details-content">
                <img 
                    className="pokemon-details-image" 
                    src={pokemon.image} 
                    alt={pokemon.name}
                />
                
                <div className="pokemon-details-info">
                    <h1 className="pokemon-details-name">
                        {pokemon.name}
                    </h1>
                    
                    <div className="pokemon-details-stats">
                        <div className="stat">
                            <span className="stat-label">Height:</span>
                            <span className="stat-value">{pokemon.height / 10}m</span>
                        </div>
                        <div className="stat">
                            <span className="stat-label">Weight:</span>
                            <span className="stat-value">{pokemon.weight / 10}kg</span>
                        </div>
                    </div>

                    <div className="pokemon-details-types">
                        <h3>Types:</h3>
                        <div className="types-list">
                            {pokemon.types.map((type) => (
                                <span key={type} className="type-badge">{type}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {similarPokemon.length > 0 && (
                <div className="similar-pokemon">
                    <h3>Similar Pokemon:</h3>
                    <div className="similar-pokemon-list">
                        {similarPokemon.map((p) => (
                            <Link 
                                key={p.pokemon.name} 
                                to={`/pokemon/${p.pokemon.url.split('/').slice(-2, -1)[0]}`}
                                className="similar-pokemon-item"
                            >
                                {p.pokemon.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PokemonDetails;