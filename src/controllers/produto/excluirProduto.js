const knex = require('../../db/conexao');
const { excluirImagem } = require('../../servicos/uploads');

const excluirProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await knex('produtos').where({ id }).first();

    if (!produto) {
      return res.status(404).json({
        mensagem: 'Produto não encontrado.'
      });
    }

    const pedidoCadastrado = await knex('pedido_produtos').where('produto_id', id).first();

    if (pedidoCadastrado) {
      return res.status(400).json({
        mensagem: 'O produto está cadastrado em um pedido e não pode ser excluído.'
      });
    }

    if (produto.produto_imagem !== null) {
      await excluirImagem(produto.produto_imagem)
    }

    await knex('produtos').where({ id }).del();

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro interno do servidor.'
    });
  }
};

module.exports = {
  excluirProduto
};