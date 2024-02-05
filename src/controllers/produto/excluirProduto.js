const knex = require('../../db/conexao');
const aws = require('aws-sdk');


const s3 = new aws.S3({
    endpoint: new aws.Endpoint(`https://${process.env.ENDPOINT_BACKBLAZE}`),
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }
});
const excluirProduto = async (req, res) => {
  const { id } = req.params;

  try {
    // Obter o produto, incluindo o nome da imagem associada a ele
    const produto = await knex('produtos').where({ id }).first();

    if (!produto) {
      return res.status(404).json({
        mensagem: 'Produto não encontrado.'
      });
    }

    const pedidoCadastrado = await knex('pedido_produtos').where('produto_id', id).first();
    
    if (pedidoCadastrado) {
      return res.status(400).json({
        mensagem: 'O produto está cadastrado em um pedido e não pode ser excluído.'
      });
    }

    // Identificar o campo que contém o nome da imagem
    let nomeCampoImagem;
    for (const chave in produto) {
      if (Object.prototype.hasOwnProperty.call(produto, chave) && typeof produto[chave] === 'string') {
        nomeCampoImagem = chave;
        break;
      }
    }

    // Obter o nome do arquivo da imagem associada ao produto
    const imagemNome = produto[nomeCampoImagem];

    // Excluir o produto do banco de dados
    await knex('produtos').where({ id }).del();

    // Se o nome da imagem existir, excluir a imagem usando a função exclusaoDeImagem
    if (imagemNome) {
      await exclusaodeImagem(imagemNome);
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensagem: 'Erro interno do servidor.'
    });
  }
};

module.exports = {
  excluirProduto
};