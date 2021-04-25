const laboratorios = require('express').Router();
const laboratorios_controller = require('../../controllers/laboratorios')
 
laboratorios.post('/', laboratorios_controller.create); 
laboratorios.get('/', laboratorios_controller.findAll); 
laboratorios.put('/:id', laboratorios_controller.update);
laboratorios.delete('/:id', laboratorios_controller.delete);
laboratorios.put('/exame/:id', laboratorios_controller.addExame);
laboratorios.delete('/exame/:id', laboratorios_controller.removeExame);
 

module.exports = laboratorios;