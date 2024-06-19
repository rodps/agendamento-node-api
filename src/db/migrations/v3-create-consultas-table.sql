CREATE TABLE consultas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dataInicio DATETIME NOT NULL,
    dataFim DATETIME NOT NULL,
    medicoId INT NOT NULL,
    pacienteId INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    foreign key (medicoId) references medicos(id),
    foreign key (pacienteId) references pacientes(id)
)