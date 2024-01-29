const joi = require('joi');

const schemaCliente = joi.object({
    nome: joi.string().pattern(/.*\S.*/).required().messages({
        'string.pattern.base': 'O campo nome quando preenchido não pode ser encaminhado vazio',
        'any.required'       : 'O campo nome é obrigatório',
        'any.empty'          : 'O campo nome é obrigatório',
        'string.empty'       : 'O campo nome é obrigatório'
    }),

    email: joi.string().pattern(/.*\S.*/).email().required().messages({
        'string.email'        : 'O campo email precisa ter um formato válido',
        'any.required'        : 'O campo email é obrigatório',
        'string.empty'        : 'O campo email é obrigatório',
        'string.pattern.base' : 'O campo email quando preenchido não pode ser encaminhado vazio.',
    }),
    cpf: joi.string().min(11).max(11).required().messages({
        'string.empty' : 'O campo CPF é obrigatório',
        'any.required' : 'O campo CPF é obrigatório',
        'string.min'   : 'O campo CPF deve ter 11 dígitos',
        'string.max'   : 'O campo CPF deve ter 11 dígitos'
    }),
    cep: joi.string().min(8).max(8).pattern(/.*\S.*/).messages({
        'string.min'          : 'O campo CEP deve ter 8 dígitos',
        'string.max'          : 'O campo CEP deve ter 8 dígitos',
        'string.pattern.base' : 'O campo CEP quando preenchido não pode ser encaminhado vazio'
    }),
    rua: joi.string().pattern(/.*\S.*/).messages({
        'string.empty'       : 'O campo rua quando preenchido não pode ser encaminhado vazio',
        'string.pattern.base': 'O campo rua quando preenchido não pode ser encaminhado vazio'
    }),
    numero: joi.number().integer().positive().messages({
        'number.base'     : 'O campo numero deve ter um formato válido, somente números',
        'number.integer'  : 'O campo numero deve ser um numero inteiro',
        'number.positive' : 'O campo numero dever ser positivo'
    }),
    bairro: joi.string().pattern(/.*\S.*/).messages({
        'string.empty'        : 'O campo bairro quando preenchido não pode ser encaminhado vazio',
        'string.pattern.base' : 'O campo bairro quando preenchido não pode ser encaminhado vazio'
    }),
    cidade: joi.string().pattern(/.*\S.*/).messages({
        'string.empty'        : 'O campo cidade quando preenchido não pode ser encaminhado vazio',
        'string.pattern.base' : 'O campo cidade quando preenchido não pode ser encaminhado vazio'
    }),
    estado: joi.string().pattern(/.*\S.*/).messages({
        'string.empty'        : 'O campo estado quando preenchido não pode ser encaminhado vazio',
        'string.pattern.base' : 'O campo estado quando preenchido não pode ser encaminhado vazio'
    })
})

module.exports = schemaCliente