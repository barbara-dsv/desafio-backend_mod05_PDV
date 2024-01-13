const bcrypt = require('bcrypt');
const knex = require('../db/conexao');

const cadastrar = async (req,res)=>{
  const { nome, email, senha } = req.body
  

  try {

    const emailRegistrado = await knex('usuarios').where({ email }).first();

    if(emailRegistrado) {
      return res.status(400).json({
        mensagem: 'Email já cadastrado.'
      })
    }

    const senhaCriptografada = await bcrypt.hash(senha,10);

    const usuario = await knex('usuarios').insert({
      nome,
      email,
      senha: senhaCriptografada
    }).returning('*')

    return res.status(201).json(usuario)

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensagem: 'Erro interno do servidor.'
    })
  }
}

module.exports = {
  cadastrar
}