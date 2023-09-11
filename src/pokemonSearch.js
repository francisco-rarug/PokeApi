import React, { useState } from 'react';

function PokemonSearch() {
    const [pokeId, setPokeId] = useState('');
    const [pokemon, setPokemon] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchPokemon = async () => {
        setLoading(true); 

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);

            if (!response.ok) {
                throw new Error('No se pudo encontrar el Pokémon');
            }

            const data = await response.json();
            setPokemon(data);
            setErrorMsg(''); 
        } catch (error) {
            setPokemon(null);
            setErrorMsg(error.message);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div>
            <input 
                type="number" 
                placeholder="Número de Pokedex" 
                value={pokeId}
                onChange={(e) => setPokeId(e.target.value)}
            />
            <button onClick={fetchPokemon}>Buscar</button>

            {loading && <div className="loading-bar"></div>}


            {errorMsg && <p className="error">{errorMsg}</p>}
            {pokemon && (
                <div>
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </div>
            )}
        </div>
    );
}

export default PokemonSearch;


