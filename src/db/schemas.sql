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
