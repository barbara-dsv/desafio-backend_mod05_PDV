const jwt = require('jsonwebtoken');
const knex = require('../db/conexao');

const editarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'Por favor, forneça nome, email e senha para a atualização.' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'privatekeyJWT');
    const userId = decodedToken.id;

    const usuarioAtualizado = await knex('usuarios')
      .where('id', userId)
      .update({
        nome: nome,
        email: email,
        senha: senha,
      });

    if (usuarioAtualizado > 0) {
      return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso.' });
    } else {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }
  } catch (error) {
    console.log(error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ mensagem: 'Token inválido.' });
    }
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

module.exports = {
  editarUsuario,
};