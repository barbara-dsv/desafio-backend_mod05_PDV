const joi = require('joi');

const schemaEditarUsuario = joi.object({
  senha : joi.string().min(5).pattern(/.*\S.*/).messages({
    'string.empty'        :  'O campo senha quando alterado não pode ser encaminhado vazio.',
    'string.pattern.base' :  'O campo senha quando alterado não pode ser encaminhado vazio.',
    'string.min'          :  'O campo senha deve conter no mínimo 5 caracteres. ',
  }),
  nome: joi.string().pattern(/.*\S.*/).messages({
    'string.pattern.base' :  'O campo nome quando alterado não pode ser encaminhado vazio.',
    'string.empty'        :  'O campo nome quando alterado não pode ser encaminhado vazio.'
  }),
  email: joi.string().pattern(/.*\S.*/).email().messages({
    'string.pattern.base' :  'O campo email quando alterado não pode ser encaminhado vazio.',
    'string.email'        :  'O campo email deve ter um formato válido.',
    'string.empty'        :  'O campo email quando alterado não pode ser encaminhado vazio.'
  })
})
module.exports = schemaEditarUsuario