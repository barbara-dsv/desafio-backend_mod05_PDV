const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const knex = require('../../db/conexao');

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await knex('usuarios').where({ email }).first();

    if (!usuario) {
      return res.status(400).json({
        mensagem: 'Email ou senha não conferem'
      })
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(400).json({
        mensagem: 'Email ou senha não conferem'
      })
    }

    const token = jwt.sign({ id: usuario.id }, process.env.HASH, { expiresIn: '8h' })

    const { senha: _, ...dadosUsuario } = usuario

    return res.status(200).json({
      usuario: dadosUsuario,
      token,
    })

  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro interno do servidor.'
    })
  }



}


module.exports = {
  login
}