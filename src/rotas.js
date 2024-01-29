const express = require('express');

const validacaoReq = require('./middleware/validacaoReq');
const auth = require('./middleware/autenticacao');

const schemaLoginUsuario  =  require('./schema/schemaLoginUsuario');
const schemaUsuario       =  require('./schema/schemaUsuario');
const schemaProduto       =  require('./schema/schemaProduto');
const schemaCliente       =  require('./schema/schemaCliente');

const detalharUsuario      =  require('./controllers/usuario/detalharUsuario');
const { cadastrar }        =  require('./controllers/usuario/cadastrarUsuario');
const { login }            =  require('./controllers/usuario/loginUsuario');
const { editarUsuario }    =  require('./controllers/usuario/editarUsuario');
const { listarCategoria }  =  require('./controllers/produto/listarCategorias');
const { cadastrarProduto } =  require('./controllers/produto/cadastrarProduto');
const { excluirProduto }   =  require('./controllers/produto/excluirProduto');
const { listarClientes }   =  require('./controllers/cliente/listarClientes');
const { cadastrarCliente } =  require('./controllers/cliente/cadastrarCliente');
const { listarProdutos }   =  require('./controllers/produto/listarProdutos');
const { editarProduto }    =  require('./controllers/produto/editarProduto');
const { editarCliente }    =  require('./controllers/cliente/editarCliente');
const { detalharCliente }  =  require('./controllers/cliente/detalharCliente')
const { detalhar }         =  require('./controllers/produto/detalharProduto');


const rotas = express();

rotas.get('/categoria', listarCategoria);

rotas.post('/usuario', validacaoReq(schemaUsuario), cadastrar);

rotas.post('/login', validacaoReq(schemaLoginUsuario), login);

rotas.use(auth);

rotas.get('/usuario', detalharUsuario);

rotas.put('/usuario', validacaoReq(schemaUsuario), editarUsuario);

rotas.post('/produto', validacaoReq(schemaProduto), cadastrarProduto);

rotas.get('/produto/:id', detalhar);

rotas.put('/produto/:id',validacaoReq(schemaProduto), editarProduto);

rotas.get('/produtos', listarProdutos);

rotas.delete('/produto/:id', excluirProduto);

rotas.post('/cliente', validacaoReq(schemaCliente), cadastrarCliente)

//editar dados do cliente

rotas.put('/cliente/:id', validacaoReq(schemaCliente), editarCliente)
rotas.get('/clientes', listarClientes);
rotas.get('/cliente/:id', detalharCliente)

//detalhar cliente 

module.exports = rotas
