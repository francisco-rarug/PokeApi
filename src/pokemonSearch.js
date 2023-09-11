import React, { useState } from 'react';

function PokemonSearch() {
    const [pokeId, setPokeId] = useState('');
    const [pokemon, setPokemon] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const fetchPokemon = async () => {
        setLoading(true);
        setShowDetails(false);

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
            <div>
                <input 
                    type="number" 
                    placeholder="Número de Pokedex" 
                    value={pokeId}
                    onChange={(e) => setPokeId(e.target.value)}
                />
                <button onClick={fetchPokemon}>Buscar</button>
            </div>
    
            {loading && <div className="loading-bar"></div>}
    
            {errorMsg && <p className="error">{errorMsg}</p>}
    
            {pokemon && (
                <div className="pokemon-card">
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </div>
            )}
    
            {pokemon && (
            <div>
                <button className="show-details-btn" onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? "Ocultar detalles" : "Ver detalles"}
                </button>
            </div>
            )}

    
            {showDetails && (
                <div className="details-card">
                    <h3>Características</h3>
                    <div className="detail">
                        <strong>Peso:</strong> {pokemon.weight / 10} kg
                    </div>
                    <div className="detail">
                        <strong>Altura:</strong> {pokemon.height / 10} m
                    </div>
                    
                    <h3>Tipo</h3>
                    <div className="detail">
                        {pokemon.types.map((typeObj, index) => (
                            <span key={index}>{typeObj.type.name} </span>
                        ))}
                    </div>

                    <h3>Habilidades</h3>
                    {pokemon.abilities.map((abilityObj, index) => (
                        <div className="detail" key={index}>
                            {abilityObj.ability.name}
                        </div>
                    ))}
                </div>
            )}


        </div>
    );
    
}

export default PokemonSearch;





