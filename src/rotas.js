const express = require('express');

const validacaoReq = require('./middleware/validacaoReq');
const auth = require('./middleware/autenticacao');

const schemaLoginUsuario = require('./schema/schemaLoginUsuario');
const schemaCadastroUsuario = require('./schema/schemaCadastroUsuarios');
const schemaEditarUsuario = require('./schema/schemaEditarUsuario');
const schemaCadastrarProduto = require('./schema/schemaCadastrarProduto');
const schemaCadastroCliente = require('./schema/schemaCadastroCliente');

const detalharUsuario = require('./controllers/usuario/detalharUsuario');
const { cadastrar } = require('./controllers/usuario/cadastrarUsuario');
const { login } = require('./controllers/usuario/loginUsuario');
const { editarUsuario } = require('./controllers/usuario/editarUsuario');
const { listarCategoria } = require('./controllers/produto/listarCategorias');
const { cadastrarProduto } = require('./controllers/produto/cadastrarProduto');
const { excluirProduto } = require('./controllers/produto/excluirProduto');
const { listarClientes } = require('./controllers/usuario/listarClientes');
const { cadastrarCliente } = require('./controllers/cliente/cadastrarCliente');
const { listarProdutos } = require('./controllers/produto/listarProdutos');



const rotas = express();

rotas.get('/categoria', listarCategoria);

rotas.post('/usuario', validacaoReq(schemaCadastroUsuario), cadastrar);

rotas.post('/login', validacaoReq(schemaLoginUsuario), login);

rotas.use(auth);

rotas.get('/usuario', detalharUsuario);

rotas.get('/produto/:id?', listarProdutos);

rotas.put('/usuario', validacaoReq(schemaEditarUsuario), editarUsuario);

rotas.post('/produto', validacaoReq(schemaCadastrarProduto), cadastrarProduto);

rotas.delete('/produto/:id', excluirProduto);

rotas.post('/cliente', validacaoReq(schemaCadastroCliente), cadastrarCliente)

rotas.get('/usuario', listarClientes);

module.exports = rotas
