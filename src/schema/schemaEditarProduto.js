const joi = require('joi');

const schemaEditarProduto = joi.object({
    descricao: joi.string().pattern(/.*\S.*/).messages({
        'string.pattern.base': 'O campo descrição quando preenchido não pode ser encaminhado vazio.',
        'string.empty': 'O campo descrição é obrigatório.'
    }),

    quantidade_estoque: joi.number().integer().greater(0).messages({
        'number.greater': 'O campo quantidade_estoque deve possuir um valor maior do que 0 (zero).',
        'number.base': 'O campo quantidade_estoque deve ser preenchido com um valor numérico.'
    }),
    valor: joi.number().greater(0).messages({
        'number.greater': 'O campo valor deve possuir um valor maior do que 0 (zero).',
        'number.base': 'O campo valor deve ser preenchido com um valor numérico.'
    }),
    categoria_id: joi.number().greater(0).integer().required().messages({
        'number.greater': 'O campo valor deve possuir um valor maior do que 0 (zero).',
        'number.base': 'O campo valor deve ser preenchido com um valor numérico.',
        'any.required': 'O campo categoria_id é obrigatório.'
    })
})

module.exports = schemaEditarProduto