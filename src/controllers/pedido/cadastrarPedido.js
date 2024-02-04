const { log } = require('handlebars');
const {readFile} = require('fs')
const { htmlCompiler } = require('../../utils/compiler');
const knex = require('../../db/conexao');
const { transport } = require('../../utils/mail');

const cadastrarPedido = async (req, res)=>{
  const {cliente_id, pedido_produtos, produto_id, quantidade_produto, observacao} = req.body;
  let valorTotal = 0;

  try {
    const cliente = await knex('clientes').where('id', cliente_id).first();
    if (!cliente) {
        return res.status(404).json({ mensagem: 'Id do cliente informado não encontrado.' });
    }

    let valorTotal = 0;
    let produtosPedido = [];

    
    for (const item of pedido_produtos) {
        const produto = await knex('produtos').where('id', item.produto_id).first();
        if (!produto) {
            return res.status(404).json({ mensagem: 'Id do produto informado não encontrado.' });
        }
        if (item.quantidade_produto > produto.quantidade_estoque) {
            return res.status(400).json({ mensagem: 'Quantidade inserida inválida.' });
        }

        valorTotal += produto.valor * item.quantidade_produto;
        produtosPedido.push({ ...item, valor: produto.valor });
    }

    
    const [pedidoCadastrado] = await knex('pedidos').insert({
        cliente_id,
        observacao,
        valor_total: valorTotal
    }).returning('*');

    const pedidoId = pedidoCadastrado.id;
   
    for (const item of produtosPedido) {
        await knex('produtos').where('id', item.produto_id).decrement('quantidade_estoque', item.quantidade_produto);

        await knex('pedido_produtos').insert({
            pedido_id: pedidoId,
            produto_id: item.produto_id,
            quantidade_produto: item.quantidade_produto,
            valor_produto: item.valor
        });
    }

    const html = await htmlCompiler('./src/templates/index.html', {
      clienteNome : cliente.nome
    })

    transport.sendMail({
      from:`${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
      to: `${cliente.nome} <${cliente.email}>`,
      subject: 'Confirmação de Pedido',
      html,
    })

    return res.status(200).json({ mensagem: 'Pedido cadastrado com sucesso!'});

} catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
}
  
}

module.exports = {
  cadastrarPedido
}