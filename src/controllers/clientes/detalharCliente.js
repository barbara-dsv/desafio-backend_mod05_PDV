const knex = require('../../db/conexao');

const detalharCliente = async (req, res) =>{
    try { 
        const usuarioEncontrado = await knex('clientes').where({id: req.params}).first()
    if (!usuarioEncontrado) {
        return res.status(404).json('Usuario inválido')
        } else {
            return res.status.json(usuarioEncontrado)
        }
    
    } catch (error) {
        return res.status(500).json('Erro interno do servidor')
    }
}
module.exports = {
    detalharCliente
}