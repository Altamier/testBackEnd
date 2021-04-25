const routes = require('express').Router(); 
const exames = require('./exames');
const laboratorios = require('./laboratorios');

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'API Ok!' });
});
 
routes.use('/exames', exames);
routes.use('/laboratorios', laboratorios);

module.exports = routes;