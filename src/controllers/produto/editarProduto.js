const knex = require('../../db/conexao');
const { excluirImagem, uploadImagem } = require('../../servicos/uploads');

const editarProduto = async (req, res) => {

    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const produtoExistente = await knex('produtos').where({ id }).first();

        if (!produtoExistente) {

            return res.status(404).json({
                mensagem: 'Produto não encontrado.'
            });
        }

        const verificaCategoria = await knex('categorias').where('id', categoria_id).first();

        if (!verificaCategoria) {

            return res.status(404).json({
                mensagem: 'Categoria informada não existe.'
            });
        }
        if (req.file) {
            const { originalname, mimetype, buffer } = req.file
            if (produtoExistente.produto_imagem !== null) {
                await excluirImagem(produtoExistente.produto_imagem)
            }

            const upload = await uploadImagem(
                `produtos/${produtoExistente.id}/${originalname}`,
                buffer,
                mimetype
            )

            const editarImagem = await knex('produtos').where({ id }).update({
                produto_imagem: upload.url
            })
        }


        const produtoAtualizado = await knex('produtos')
            .where({ id })
            .update({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id
            });

        if (!produtoAtualizado) {

            return res.status(400).json({
                mensagem: 'O produto não foi atualizado.'
            });
        }

        return res.status(200).json({
            mensagem: 'Produto atualizado com sucesso.'
        });
    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro interno do servidor.'
        });
    }
};

module.exports = {
    editarProduto
};
