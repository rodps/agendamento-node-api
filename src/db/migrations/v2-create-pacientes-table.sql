CREATE TABLE pacientes (
  id INT auto_increment primary key,
  nome VARCHAR(255) NOT NULL,
  telefone VARCHAR(255) NOT NULL,
  cpf VARCHAR(255) NOT NULL,
  data_nascimento DATE NOT NULL
);