const knex = require('../../db/conexao');

const listarProdutos = async (req, res) => {
  try {
    const categoria_id = req.params.id;

    // Se categoria não foi informado, retorna todos os produtos
    if (!categoria_id) {
      const todosProdutos = await knex('produtos');

      if (todosProdutos.length === 0) {
        return res.status(404).json({
          mensagem: 'Nenhum produto encontrado.'
        });
      }

      return res.status(200).json(todosProdutos);
    }

    // Se categoria foi informado, verifica se a categoria existe
    const categoria = await knex('categorias').where({ id: categoria_id }).first();

    if (!categoria) {
      return res.status(404).json({
        mensagem: 'Categoria informada não existe.'
      });
    }

    // Se a categoria existe, filtra os produtos de acordo com a categoria
    const produtos = await knex('produtos').where({ categoria_id });

    if (produtos.length === 0) {
      return res.status(404).json({
        mensagem: 'Nenhum produto encontrado para a categoria informada.'
      });
    }

    return res.status(200).json(produtos);

  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro interno do servidor.'
    });
  }
};

module.exports = {
  listarProdutos
};