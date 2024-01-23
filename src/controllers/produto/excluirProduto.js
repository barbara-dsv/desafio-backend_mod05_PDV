const knex = require('../../db/conexao');

const excluirProduto = async (req, res) => {

    const { id } = req.params;

    try {
        const produto = await knex('produtos').where({ id }).first(); //usar o id//

        if (!produto) {

            return res.status(404).json({

                mensagem: 'Produto não encontrado.'
            });
        }

        await knex('produtos').where({ id }).del(); //deletar usando o id//

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