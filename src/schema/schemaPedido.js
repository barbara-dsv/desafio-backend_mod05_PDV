const joi = require('joi');

const schemaPedido = joi.object({
  cliente_id: joi.number().greater(0).required().messages({
    'string.pattern.base': 'O campo cliente_id quando preenchido não pode ser encaminhado vazio.',
    'any.required': 'O campo cliente_id é obrigatório.',
    'string.empty': 'O campo cliente_id é obrigatório.'
  }),
  pedido_produtos: joi.array().items(
    joi.object({
      produto_id: joi.number().integer().positive().required().messages({
        'number.base': 'O campo deve ser preenchido com um número',
        'any.required': 'O campo produto_id é obrigatório.'
      }),
      quantidade_produto: joi.number().integer().positive().greater(0).required().messages({
        'number.base': 'O campo deve ser preenchido com um número',
        'any.required': 'O campo quantidade_produto é obrigatório.'
      })
    })
  ).required().min(1).messages({
    'any.required': 'O campo pedido_produtos é obrigatório.'
  })
  ,
  observacao: joi.string().pattern(/.*\S.*/).messages({
    'string.pattern.base': 'O campo observacao quando solicitado não pode ser encaminhado vazio.',
    'string.empty': 'O campo observacao tem que ser preenchido corretamente.'
  })
})

module.exports = schemaPedido
