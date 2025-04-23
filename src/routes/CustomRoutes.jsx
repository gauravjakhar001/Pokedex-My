import { Route, Routes } from "react-router-dom";
import PokemonList from "../components/PokemonList/PokemonList";
import PokemonDetails from "../components/PokemonDetails/PokemonDetails";

function CustomRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PokemonList/>}/>
            <Route path="/pokemon/:id" element={<PokemonDetails/>}/>
        </Routes>
    );
}

export default CustomRoutes;