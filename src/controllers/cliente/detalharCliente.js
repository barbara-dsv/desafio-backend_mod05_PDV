const knex = require('../../db/conexao');

const detalharCliente = async (req, res) => {

    const { id } = req.params
    try {
        const usuarioEncontrado = await knex('clientes').where({ id }).first()
        if (!usuarioEncontrado) {
            return res.status(404).json('Usuario inválido')
        } else {
            return res.status(200).json(usuarioEncontrado)
        }

    } catch (error) {
        return res.status(500).json('Erro interno do servidor')
    }
}
module.exports = {
    detalharCliente
}