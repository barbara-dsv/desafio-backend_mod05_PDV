const joi = require('joi');

const schemaEditarCliente = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome precisa ser preenchido.',
        'string.empty': 'O campo nome precisa ser preenchido.'
    }),

    email: joi.string().email().required().messages({
        'any.required': 'O campo email precisa ser preenchido.',
        'string.email': 'O campo email deve ter um formato válido.',
        'string.empty': 'O campo email precisa ser preenchido'
    }),

    cpf: joi.string().required().min(11).max(11).messages({
        'string.min':  'O campo cpf deve conter no mínimo 14 caracteres.',
        'string.max':  'O campo cpf deve conter no máximo 14 caracteres.',
        'any.required': 'O campo cpf precisa ser preenchido.',
        'string.empty': 'O campo cpf precisa ser preenchido'
    }),
    cep: joi.string().min(8).max(8).pattern(/.*\S.*/).messages({
        'string.min': 'O campo CEP deve ter 8 dígitos',
        'string.max': 'O campo CEP deve ter 8 dígitos',
        'string.pattern.base': 'O campo CEP quando preenchido não pode ser encaminhado vazio'

    }),
    rua: joi.string().pattern(/.*\S.*/).messages({
        'string.empty': 'O campo rua quando preenchido não pode ser encaminhado vazio',
        'string.pattern.base': 'O campo rua quando preenchido não pode ser encaminhado vazio'
    }),
    numero: joi.number().integer().positive().messages({
        'number.base': 'O campo numero deve ter um formato válido, somente números',
        'number.integer': 'O campo numero deve ser um numero inteiro',
        'number.positive': 'O campo numero dever ser positivo'
    }),
    bairro: joi.string().pattern(/.*\S.*/).messages({
        'string.empty': 'O campo bairro quando preenchido não pode ser encaminhado vazio',
        'string.pattern.base': 'O campo bairro quando preenchido não pode ser encaminhado vazio'
    }),
    cidade: joi.string().pattern(/.*\S.*/).messages({
        'string.empty': 'O campo cidade quando preenchido não pode ser encaminhado vazio',
        'string.pattern.base': 'O campo cidade quando preenchido não pode ser encaminhado vazio'
    }),
    estado: joi.string().pattern(/.*\S.*/).messages({
        'string.empty': 'O campo estado quando preenchido não pode ser encaminhado vazio',
        'string.pattern.base': 'O campo estado quando preenchido não pode ser encaminhado vazio'
    })
})

module.exports = schemaEditarCliente;