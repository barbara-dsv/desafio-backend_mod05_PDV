const knex = require('../db/conexao');
const bcrypt = require('bcrypt')

const editarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.usuario;

  if (!nome && email && senha) {
    return res.status(400).json({ message: 'Por favor, forneça nome, email e senha para a atualização.' });
  }

  try {
    const usuarioExiste = await knex('usuarios').where({ id }).first();


    if (!usuarioExiste) {
      return res.status(404).json({ mensagem: 'Usuario não encontrado' });
    }
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    if (email && email !== req.usuario.email) {
      const emailUsuarioExiste = await knex('usuarios')
        .where('email', email)
        .first();

      if (emailUsuarioExiste) {
        return res.status(400).json({ mensagem: 'O Email já existe.' });
      }
    }

    const usuarioAtualizado = await knex('usuarios')
      .where({ id })
      .update({
        nome: nome,
        email: email,
        senha: senhaCriptografada,
      }).returning('*');

    const { senha: _, ...usuario } = usuarioAtualizado[0]

    return res.status(200).json(usuario)

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

module.exports = {
  editarUsuario,
};