const express = require('express');
const controllers = require('../controllers');

const router= express.Router();

router.get('/', (req, res) => res.send('Welcome'))

router.post('/pokemon', controllers.savePokemonData);
router.get('/pokemonLast', controllers.getLastPokemon);
router.get('/pokemon', controllers.getPokemons);

module.exports = router;

