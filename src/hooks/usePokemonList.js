import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(url,type){
    console.log("B")
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList : [],
        isLoading :true ,
        pokedexUrl: url,
        nextUrl : '',
        prevUrl: ''
    });

    async function downloadPokemon (){
        // setIsLoading(true);
 
        setPokemonListState({...pokemonListState, isLoading : true});
 
         const response =  await axios.get(pokemonListState.pokedexUrl);  // This downloades the list of the 20 pokemons 
 
         const pokemonResults = response.data.results; // We get the array of the pokemons from the result
 
         console.log("response is ",response.data.pokemon);
         console.log(pokemonListState);

         setPokemonListState((state)=>({
             ...state,
             nextUrl : response.data.next,
             prevUrl : response.data.previous ,
             
 }));
         
 
         // Iterating over the array of pokemons ,and using their url, to create an array of promises
         // that will download those 20 pokemons 

         if(type){

            setPokemonListState((state) =>({
                ...state ,
                pokemonList: response.data.pokemon.slice(0,5)
            }))

         }else{

         const pokemonResultPromise =  pokemonResults.map((pokemon) => axios.get(pokemon.url));
 
         //Passing that promise array to axios.all
 
         const pokemonData = await axios.all(pokemonResultPromise);// Array of 20 pokemons detailed data 
         console.log(pokemonData);
 
         // now iterate on the data of each pokemon, and extract id,name , image, types 
         const pokemonListResult =pokemonData.map((pokeData) =>{
             const pokemon  = pokeData.data;
 
             return { 
                     id : pokemon.id,
                     name : pokemon.name  ,
                     image : (pokemon .sprites.other)? pokemon.sprites.other.dream_world.front_default: pokemon.sprites.front_shiny,
                     types: pokemon.types
                 }
 
         });
         console.log(pokemonListResult);
 
         setPokemonListState( (state) =>({ 
             ...state,
              pokemonList : pokemonListResult ,
             isLoading : false
            }));
        }
    }

     useEffect(() => {
        downloadPokemon();
     },[pokemonListState.pokedexUrl])

     return {pokemonListState , setPokemonListState}
}


export default usePokemonList;