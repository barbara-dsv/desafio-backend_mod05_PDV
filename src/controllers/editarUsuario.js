const bcrypt = require('bcrypt')
const knex = require('../db/conexao')

const editarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  let senhaCript

  if (!nome && !email && !senha) {
    return res.status(400).json({
      mensagem: 'Ao menos um campo deve ser informado.'
    })
  }

  try {

    if (email) {
      const emailJaCadastrado = await knex('usuarios').where({ email }).first();

      if (emailJaCadastrado) {
        return res.status(400).json({
          mensagem: 'Email informado já pertence a outra conta.'
        })
      }

    }


    if (senha) {
      senhaCript = await bcrypt.hash(senha, 10);
    }

    const usuarioAtulizado = await knex('usuarios').where({ id: req.usuario.id }).update({
      nome,
      email,
      senha: senhaCript
    })

    if (!usuarioAtulizado) {
      return res.status(400).json({
        mensagem: 'O usuario não foi atualizado.'
      })
    }

    return res.status(200).json({
      mensagem: 'Usuário atualizado com sucesso.'
    })
  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro interno do servidor.'
    })
  }
}

module.exports = {
  editarUsuario
}