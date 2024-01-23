CREATE TABLE usuarios (
    id serial PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    senha TEXT
)

CREATE TABLE categorias (
    id serial PRIMARY KEY,
    descricao TEXT
)

INSERT INTO categorias (descricao) VALUES
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255),
    quantidade_estoque INT,
    valor INT,
    categoria_id INT,  
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)  
);

CREATE TABLE clientes(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(200) UNIQUE,
    cpf VARCHAR(14) UNIQUE,
    cep VARCHAR(9),
    rua VARCHAR(255),
    numero INT,
    bairro VARCHAR(255),
    cidade VARCHAR(255),
    estado VARCHAR(255)
);

ALTER TABLE produtos 
ALTER COLUMN valor TYPE NUMERIC(10,2)