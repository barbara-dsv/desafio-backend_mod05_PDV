const knex = require('../../db/conexao');
const { uploadImagem } = require('../../servicos/uploads')

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id, imagem } = req.body;

  try {

    const verificaCategoria = await knex('categorias').where('id', categoria_id).first();

    if (!verificaCategoria) {
      return res.status(404).json({
        mensagem: "Categoria informada não existe."
      })
    }

    let cadastraProduto = await knex('produtos').insert({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id
    }).returning('*')

    const id = cadastraProduto[0].id
    if (req.file) {
      const { originalname, mimetype, buffer } = req.file

      const imagem = await uploadImagem(
        `produtos/${id}/${originalname}`,
        buffer,
        mimetype
      )

      cadastraProduto = await knex('produtos').update({
        produto_imagem: imagem.url
      }).where({ id }).returning('*')

    }

    return res.status(201).json(cadastraProduto[0]);

  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro interno do servidor.'
    })
  }
}

module.exports = {
  cadastrarProduto
};