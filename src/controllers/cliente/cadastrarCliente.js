const knex = require('../../db/conexao');

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body

    try {
        const emailRegistrado = await knex('clientes').where({ email }).first()

        if (emailRegistrado) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' })
        }

        const cpfRegistrado = await knex('clientes').where({ cpf }).first()

        if (cpfRegistrado) {
            return res.status(400).json({ mensagem: 'CPF já cadastrado' })
        }

        const clienteCadastrado = await knex('clientes').insert({
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        }).returning('*')

        return res.status(201).json(clienteCadastrado)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

module.exports = { cadastrarCliente }