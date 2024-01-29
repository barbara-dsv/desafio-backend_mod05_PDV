const knex = require('../../db/conexao');

const detalharCliente = async (req, res) => {
    const { id } = req.params

    try {
        const clienteEncontrado = await knex('clientes').where({ id }).first()
       
     if (!clienteEncontrado) {
        return res.status(404).json({
            mensagem:'Id informado não cadastrado.'
        })
        } 
        
    return res.status(200).json(clienteEncontrado)

    }catch (error) {
        return res.status(500).json({
            mensagem: 'Erro interno do servidor.'
        })
    }
}

module.exports = {
    detalharCliente
}