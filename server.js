const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Conexão ao MongoDB Compass
mongoose.connect('mongodb://localhost:27017/jumpFlixApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
});

const User = mongoose.model('User', userSchema);

// Registro
app.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();
    res.status(201).send('Usuário cadastrado com sucesso!')
  } catch(e) {
    res.status(400).send('Erro ao cadastrar usuário: ' + e.message);
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).send('Login feito com sucesso!');
    } else {
      res.status(400).send('Email ou senha inválidos');
    }
  } catch(e) {
    res.status(400).send('Erro ao logar: ' + e.message);
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando no http://localhost:${port}/`);
})