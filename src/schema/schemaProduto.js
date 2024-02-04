const joi = require('joi');

const schemaProduto = joi.object({
  descricao: joi.string().pattern(/.*\S.*/).required().messages({
    'string.pattern.base': 'O campo descrição quando preenchido não pode ser encaminhado vazio.',
    'any.required': 'O campo descrição é obrigatório.',
    'string.empty': 'O campo descrição é obrigatório.'
  }),

  quantidade_estoque: joi.number().integer().greater(0).required().messages({
    'number.greater': 'O campo quantidade_estoque deve possuir um valor maior do que 0 (zero).',
    'number.base': 'O campo quantidade_estoque deve ser preenchido com um valor numérico.',
    'any.required': 'O campo quantidade_estoque é obrigatório.'
  }),
  valor: joi.number().required().integer().messages({
    'number.greater': 'O campo valor deve possuir um valor maior do que 0 (zero).',
    'number.base': 'O campo valor deve ser preenchido com um valor numérico.',
    'any.required': 'O campo valor é obrigatório.'
  }),
  categoria_id: joi.number().greater(0).integer().required().messages({
    'number.greater': 'O campo valor deve possuir um valor maior do que 0 (zero).',
    'number.base': 'O campo valor deve ser preenchido com um valor numérico.',
    'any.required': 'O campo categoria_id é obrigatório.'
  })
})

module.exports = schemaProduto