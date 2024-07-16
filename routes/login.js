const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Autenticar usuário
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    console.log('Senha hashada armazenada:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Comparação de senha resultou em:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ msg: 'Senha incorreta' });
    }

    res.status(200).json({ msg: 'Login realizado com sucesso' });
  } catch(e) {
    console.log(e.message);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

module.exports = router;