import { useState } from "react";
import "./Search.css";

function Search({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="search-wrapper">
            <input
                id="pokemon-name-search"
                type="text"
                placeholder="Search Pokémon..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    onSearch(e.target.value); // Update search immediately on typing
                }}
            />
            <button className="search-button" onClick={handleSearch}>
                Search
            </button>
        </div>
    );
}

export default Search;
