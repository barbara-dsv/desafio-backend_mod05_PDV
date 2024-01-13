const express = require('express');

const validacaoReq = require('./middleware/validacaoReq');
const auth = require('./middleware/autenticacao');

const schemaLoginUsuario = require('./schema/schemaLoginUsuario');
const schemaCadastroUsuario = require('./schema/schemaCadastroUsuarios');

const { cadastrar } = require('./controllers/cadastrarUsuario');
const { login } = require('./controllers/loginUsuario');


const rotas = express();

rotas.post('/cadastroUser', validacaoReq(schemaCadastroUsuario), cadastrar );

rotas.post('/login', validacaoReq(schemaLoginUsuario), login)

rotas.use(auth)



module.exports = rotas