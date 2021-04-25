const express = require('express')
const app = express()
const cors = require('cors');
const env = require('dotenv').config();
const routes = require('../routes/index');
const mongoose = require('mongoose')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

app.use('/', routes); 

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection
db.once('open', _ => {
    console.log('Banco conectado')
})

db.on('error', err => {
    console.error('Erro de conexão')
})
 
const port = process.env.PORT;
app.listen(port, () => {
    console.log('Servidor em execução na porta ' + port);
}); 

 