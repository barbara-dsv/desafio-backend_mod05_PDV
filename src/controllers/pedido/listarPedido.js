const knex = require('../../db/conexao');

const listarPedido = async (req, res) => {
    const { cliente_id } = req.query
    try {

        if (cliente_id) {

            const clienteExiste = await knex('clientes').where('id', cliente_id).first()
            if (!clienteExiste) return res.status(404).json({ mensagem: 'Cliente não existente' })

            const pedidosPorId = await knex('pedidos').where({ cliente_id })
            if (pedidosPorId.length === 0) { return res.status(404).json({ mensagem: 'Não existe pedido para esse cliente' }) }
            return res.status(200).json(pedidosPorId)
        }

        const pedidos = await knex('pedidos')

        if (pedidos.length === 0) { return res.status(404).json({ mensagem: 'Não existe pedido cadastrado' }) }

        return res.status(200).json(pedidos)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

module.exports = listarPedido