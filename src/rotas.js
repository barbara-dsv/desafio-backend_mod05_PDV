const express = require('express');

const validacaoReq = require('./middleware/validacaoReq');
const auth = require('./middleware/autenticacao');

const schemaLoginUsuario = require('./schema/schemaLoginUsuario');
const schemaCadastroUsuario = require('./schema/schemaCadastroUsuarios');
const schemaEditarUsuario = require('./schema/schemaEditarUsuario');

const { cadastrar } = require('./controllers/usuario/cadastrarUsuario');
const { login } = require('./controllers/usuario/loginUsuario');
const detalharPerfil = require('./controllers/usuario/detalharUsuario');
const { editarUsuario } = require('./controllers/usuario/editarUsuario')
const listarCategorias = require('./controllers/produto/listarCategorias');



const rotas = express();

rotas.get('/categoria', listarCategorias);

rotas.post('/usuario', validacaoReq(schemaCadastroUsuario), cadastrar);

rotas.post('/login', validacaoReq(schemaLoginUsuario), login);

rotas.use(auth);

rotas.get('/usuario', detalharPerfil);

rotas.put('/usuario', validacaoReq(schemaEditarUsuario), editarUsuario);

module.exports = rotas