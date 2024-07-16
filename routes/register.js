const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Regsitrar usuário
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log('Email recebido para registro:', email);
    console.log('Senha recebida para registro:', password);

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    // Criptografar senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Senha hashada para registro: ', hashedPassword);

    user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ msg: 'Usuário registrado com sucesso' });
  } catch(e) {
    console.log(e.message);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

module.exports = router;
