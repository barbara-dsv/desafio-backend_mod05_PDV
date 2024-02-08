const express = require('express');

const validacaoReq = require('./middleware/validacaoReq');
const auth = require('./middleware/autenticacao');
const multer = require('./middleware/multer')

const schemaLoginUsuario = require('./schema/schemaLoginUsuario');
const schemaUsuario = require('./schema/schemaUsuario');
const schemaProduto = require('./schema/schemaProduto');
const schemaCliente = require('./schema/schemaCliente');
const schemaPedido = require('./schema/schemaPedido');

const detalharUsuario = require('./controllers/usuario/detalharUsuario');
const { cadastrar } = require('./controllers/usuario/cadastrarUsuario');
const { login } = require('./controllers/usuario/loginUsuario');
const { editarUsuario } = require('./controllers/usuario/editarUsuario');
const { listarCategoria } = require('./controllers/produto/listarCategorias');
const { cadastrarProduto } = require('./controllers/produto/cadastrarProduto');
const { excluirProduto } = require('./controllers/produto/excluirProduto');
const { listarClientes } = require('./controllers/cliente/listarClientes');
const { cadastrarCliente } = require('./controllers/cliente/cadastrarCliente');
const { listarProdutos } = require('./controllers/produto/listarProdutos');
const { editarProduto } = require('./controllers/produto/editarProduto');
const { editarCliente } = require('./controllers/cliente/editarCliente');
const { detalharCliente } = require('./controllers/cliente/detalharCliente')
const { detalhar } = require('./controllers/produto/detalharProduto');
const { cadastrarPedido } = require('./controllers/pedido/cadastrarPedido');
const listarPedido = require('./controllers/pedido/listarPedido');



const rotas = express();

rotas.get('/categoria', listarCategoria);

rotas.post('/usuario', validacaoReq(schemaUsuario), cadastrar);

rotas.post('/login', validacaoReq(schemaLoginUsuario), login);

rotas.use(auth);

rotas.get('/usuario', detalharUsuario);

rotas.put('/usuario', validacaoReq(schemaUsuario), editarUsuario);

rotas.post('/produto', multer.single('imagem'), validacaoReq(schemaProduto), cadastrarProduto);

rotas.get('/produto/:id', detalhar);

rotas.put('/produto/:id', multer.single('imagem'), validacaoReq(schemaProduto), editarProduto);

rotas.get('/produtos', listarProdutos);

rotas.delete('/produto/:id', excluirProduto);

rotas.post('/cliente', validacaoReq(schemaCliente), cadastrarCliente)

rotas.put('/cliente/:id', validacaoReq(schemaCliente), editarCliente)

rotas.get('/clientes', listarClientes);

rotas.get('/cliente/:id', detalharCliente)

rotas.post('/pedido', validacaoReq(schemaPedido), cadastrarPedido);

rotas.get('/pedido?:cliente_id', listarPedido)

module.exports = rotas
