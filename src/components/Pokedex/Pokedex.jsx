import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";


//CSS Import

import './Pokedex.css'

function Pokedex(){
     
    return (
        <div className="pokedex-wrapper">
        
       
        <PokemonList />
        </div>
    )

}

export default Pokedex;