const axios = require('axios');

const models = require('../database/models');


const pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon';

const savePokemonData = async (req, res) => {
    const { pokemonName } = req.body;

    try {
        if (typeof pokemonName !== 'string') {
            throw new Error('pokemonName must be a string');
        }

        const searchUrl = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(pokemonName.toLowerCase())}`;

        const response = await axios.get(searchUrl);

        const { id, name, abilities, types, sprites } = response.data;

        if (!sprites || !sprites.front_default) {
            throw new Error('Sprites data not available');
        }

        const newPokemon = await models.Pokemon.create({
            pokeId: id,
            name,
            abilities: abilities.map(ability => ability.ability.name),
            types: types.map(type => type.type.name),
            imageUrl: sprites.front_default
        });

        return res.status(200).json(newPokemon);
    } catch (error) {
        console.error('Error saving Pokémon data:', error.message);
        return res.status(500).json({ error: 'Error saving Pokémon data' });
    }
};

const getPokemons = async (req, res) => {
    console.log('obteniendo pokemon ...');
    console.log(models);
    try {
        const pokemons = await models.Pokemon.findAll({
            include: [
            ]
        
        });
        if (!pokemons || pokemons.length === 0) {
            return res.status(404).json({ error: 'No se encontraron Pokémon.' });
        }

        return res.status(200).json({ pokemons });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getLastPokemon = async (req, res) => {
    try {
        const lastPokemon = await models.Pokemon.findOne({
            order: [['createdAt', 'DESC']]
        });

        if (!lastPokemon) {
            return res.status(404).json({ error: 'No se encontró ningún Pokémon.' });
        }

        return res.status(200).json({ pokemon: lastPokemon });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    savePokemonData,
    getLastPokemon,
    getPokemons
};