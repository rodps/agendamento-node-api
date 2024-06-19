import { closeDbConnection, deleteAllFromTable } from '../../helpers'
import request from 'supertest'
import app from '../../../src/express/app'

describe('Cadastrar Paciente', () => {
  afterAll(async () => {
    await closeDbConnection()
  })

  beforeEach(async () => {
    await deleteAllFromTable('pacientes')
  })

  it('deve retornar 201', async () => {
    const response = await request(app).post('/pacientes').send({
      nome: 'nome',
      telefone: '123',
      cpf: '123',
      dataNascimento: '2022-01-01'
    })

    expect(response.status).toBe(201)
    expect(response.body.id).toBeDefined()
    expect(response.body.nome).toBe('nome')
    expect(response.body.telefone).toBe('123')
    expect(response.body.cpf).toBe('123')
    expect(response.body.dataNascimento).toBe('2022-01-01')
  })

  it('deve retornar 400 quando o nome for vazio', async () => {
    const response = await request(app).post('/pacientes').send({
      nome: '',
      telefone: '123',
      cpf: '123',
      dataNascimento: '2022-01-01'
    })

    expect(response.status).toBe(400)
    expect(response.body.erro).toBe('Nome obrigatorio')
  })

  it('deve retornar 400 quando o telefone for vazio', async () => {
    const response = await request(app).post('/pacientes').send({
      nome: 'nome',
      telefone: '',
      cpf: '123',
      dataNascimento: '2022-01-01'
    })

    expect(response.status).toBe(400)
    expect(response.body.erro).toBe('Telefone obrigatorio')
  })

  it('deve retornar 400 quando o cpf for vazio', async () => {
    const response = await request(app).post('/pacientes').send({
      nome: 'nome',
      telefone: '123',
      cpf: '',
      dataNascimento: '2022-01-01'
    })

    expect(response.status).toBe(400)
    expect(response.body.erro).toBe('CPF obrigatorio')
  })

  it('deve retornar 400 quando a data de nascimento for vazia', async () => {
    const response = await request(app).post('/pacientes').send({
      nome: 'nome',
      telefone: '123',
      cpf: '123',
      dataNascimento: ''
    })

    expect(response.status).toBe(400)
    expect(response.body.erro).toBe('Data de nascimento obrigatorio')
  })

  it('deve retornar 400 quando a data de nascimento for invalida', async () => {
    const response = await request(app).post('/pacientes').send({
      nome: 'nome',
      telefone: '123',
      cpf: '123',
      dataNascimento: '01-01-2022'
    })

    expect(response.status).toBe(400)
    expect(response.body.erro).toBe('Data de nascimento invalida')
  })
})
