const bcrypt = require('bcrypt')
const knex = require('../../db/conexao');

const editarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  

  try {

      const emailJaCadastrado = await knex('usuarios').where({ email }).andWhereNot({ id:req.usuario.id }).first();

      if (emailJaCadastrado) {
        return res.status(400).json({
          mensagem: 'Email informado já pertence a outra conta.'
        })
      }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuarioAtulizado = await knex('usuarios').where({ id: req.usuario.id }).update({
      nome,
      email,
      senha: senhaCriptografada
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
  editarUsuario }
