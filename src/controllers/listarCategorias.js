const knex = require('../db/conexao');

const listarCategorias = async (req, res) => {
    try {
        const categorias = await knex('categorias').select('*');

        if (categorias.length === 0) {
            return res.status(404).json({
                mensagem: 'Nenhuma categoria encontrada.'
            });
        }

        return res.status(200).json({
            categorias
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensagem: 'Erro do servidor.',
            error: error.message
        });
    }
};

module.exports = listarCategorias;