const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const dbURI = 'mongodb://localhost:27017/jumpFlixApp';

// Conexão ao MongoDB Compass
mongoose.connect(dbURI)
  .then(() => console.log('Conectado ao MongoDB Compass'))
  .catch(err => console.error("Erro ao conectar ao MongoDB Compass", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos a pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})