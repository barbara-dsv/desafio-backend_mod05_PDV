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
