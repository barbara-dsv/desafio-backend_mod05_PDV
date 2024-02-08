const knex = require('../../db/conexao');

const editarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
    const { id } = req.params;

    try {
        const clienteExiste = await knex('clientes').where({ id }).first();

        if (!clienteExiste) {
            return res.status(404).json('cliente não encontrado')
        }

        const emailRegistrado = await knex('clientes').where({ email }).andWhereNot({ id }).first();

        if (emailRegistrado) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' })
        }


        const cpfRegistrado = await knex('clientes').where({ cpf }).andWhereNot({ id }).first();

        if (cpfRegistrado) {
            return res.status(400).json({ mensagem: 'CPF já cadastrado' })
        }


        const cliente = await knex('clientes').where({ id })
            .update({
                nome,
                email,
                cpf,
                cep,
                rua,
                numero,
                bairro,
                cidade,
                estado
            })
            .returning('*');

        if (!cliente) {
            return res.status(404).json('não foi possivel atualizar o cliente');
        }

        return res.status(201).json(cliente[0])

    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro interno do servidor.'
        })
    }
}

module.exports = {
    editarCliente
}
