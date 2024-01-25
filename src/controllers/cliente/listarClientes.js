const knex = require('../../db/conexao');

const listarClientes = async (req, res) => {

    try {
        const clientes = await knex('clientes');

        if (clientes.length === 0) {

            return res.status(404).json({
                mensagem: 'Nenhum cliente encontrado.'
            });
        }

        return res.status(200).json({
            clientes
        });
    } catch (error) {

        return res.status(500).json({
            mensagem: 'Erro interno do servidor.'
        });
    }
};

module.exports = {

    listarClientes
};
