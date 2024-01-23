const knex = require('../../db/conexao');

const cadastrarProduto = async ( req, res ) =>{
  const {descricao, quantidade_estoque, valor, categoria_id} = req.body;

  try {

    const verificaCategoria = await knex( 'categorias' ).where('id', categoria_id).first();

    if(!verificaCategoria){
      return res.status(404).json({
        mensagem: "Categoria informada não existe."
    })
  }

    const cadastraProduto = await knex('produtos').insert({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id
  })

    return res.status(201).json({
      mensagem: "Produto cadastrado com sucesso!"
  });
  
  } catch (error) {
    return res.status(500).json({
        mensagem: 'Erro interno do servidor.'
    })
  }
}

module.exports = {
  cadastrarProduto };