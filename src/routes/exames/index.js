const exames = require('express').Router();
const exames_controller = require('../../controllers/exames');

exames.post('/', exames_controller.create); 
exames.get('/', exames_controller.findAll); 
exames.get('/:nome', exames_controller.findbyName); 
exames.put('/:id', exames_controller.update);
exames.delete('/:id', exames_controller.delete);

module.exports = exames;