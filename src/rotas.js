const express = require('express');

const validacaoReq = require('./middleware/validacaoReq');
const auth = require('./middleware/autenticacao');

const schemaLoginUsuario = require('./schema/schemaLoginUsuario');
const schemaCadastroUsuario = require('./schema/schemaCadastroUsuarios');
const schemaEditarUsuario = require('./schema/schemaEditarUsuario');

const { cadastrar } = require('./controllers/cadastrarUsuario');
const { login } = require('./controllers/loginUsuario');
const detalharPerfil = require('./controllers/detalharUsuario');
const { editarUsuario } = require('./controllers/editarUsuario')
const listarCategorias = require('./controllers/listarCategorias');



const rotas = express();

rotas.get('/categoria', listarCategorias);

rotas.post('/usuario', validacaoReq(schemaCadastroUsuario), cadastrar);

rotas.post('/login', validacaoReq(schemaLoginUsuario), login);

rotas.use(auth);

rotas.get('/usuario', detalharPerfil);

rotas.put('/usuario', validacaoReq(schemaEditarUsuario) ,editarUsuario);

module.exports = rotas