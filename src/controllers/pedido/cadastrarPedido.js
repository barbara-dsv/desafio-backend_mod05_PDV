const { log } = require('handlebars');
const { readFile } = require('fs')
const { htmlCompiler } = require('../../utils/compiler');
const knex = require('../../db/conexao');
const { transport } = require('../../utils/mail');

const cadastrarPedido = async (req, res) => {
    const { cliente_id, pedido_produtos, produto_id, quantidade_produto, observacao } = req.body;

    try {
        const cliente = await knex('clientes').where('id', cliente_id).first();
        if (!cliente) {
            return res.status(404).json({ mensagem: 'Id do cliente informado não encontrado.' });
        }

        const produtosNaoEncontrados = [];
        const produtosSemEstoque = [];
        let valorTotal = 0;
        for (const item of pedido_produtos) {
            const produto = await knex('produtos').where('id', item.produto_id).first();

            if (!produto) {
                produtosNaoEncontrados.push(item.produto_id);
            } else if (produto.quantidade_estoque < item.quantidade_produto) {
                produtosSemEstoque.push(item.produto_id);
            }

        }

        if (produtosNaoEncontrados.length > 0) {
            return res.status(400).json({ mensagem: `Produto(s) não encontrados: ${produtosNaoEncontrados}` });
        }

        if (produtosSemEstoque.length > 0) {
            return res.status(400).json({ mensagem: `Produto(s) sem estoque suficiente: ${produtosSemEstoque}` });
        }

        for (const item of pedido_produtos) {
            const produto = await knex('produtos').where('id', item.produto_id).first();
            valorTotal += produto.valor * item.quantidade_produto;
        }

        // Cadastrar o pedido
        const [pedidoCadastrado] = await knex('pedidos').insert({
            cliente_id,
            observacao,
            valor_total: valorTotal
        }).returning('*');

        const pedidoId = pedidoCadastrado.id;

        // Atualizar quantidade em estoque e cadastrar os produtos do pedido
        for (const item of pedido_produtos) {
            const produto = await knex('produtos')
                .select('valor')
                .where('id', item.produto_id)
                .first();

            await knex('pedido_produtos').insert({
                pedido_id: pedidoId,
                produto_id: item.produto_id,
                quantidade_produto: item.quantidade_produto,
                valor_produto: produto.valor
            });
        }

        const html = await htmlCompiler('./src/templates/index.html', {
            clienteNome: cliente.nome
        })

        transport.sendMail({
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
            to: `${cliente.nome} <${cliente.email}>`,
            subject: 'Confirmação de Pedido',
            html,
        })

        return res.status(200).json({ mensagem: 'Pedido cadastrado com sucesso!' });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }

}

module.exports = {
    cadastrarPedido
}