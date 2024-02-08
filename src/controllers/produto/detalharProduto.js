const knex = require('../../db/conexao');

const detalhar = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await knex('produtos').where({ id }).first();

    if (!produto) {
      return res.status(404).json({
        mensagem: 'Produto não encontrado.'
      });
    }

    return res.status(200).json(produto);

  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro interno do servidor.'
    });
  }
};

module.exports = { detalhar };