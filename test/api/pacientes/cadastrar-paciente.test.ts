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
      telefone: '12345678',
      cpf: '12345678910',
      dataNascimento: '2022-01-01'
    })

    const { data } = response.body

    expect(response.status).toBe(201)
    expect(data.id).toBeDefined()
    expect(data.nome).toBe('nome')
    expect(data.telefone).toBe('12345678')
    expect(data.cpf).toBe('12345678910')
    expect(data.dataNascimento).toBe('2022-01-01')
  })

  it('deve retornar 400 quando o nome for vazio', async () => {
    const response = await request(app).post('/pacientes').send({
      nome: '',
      telefone: '12345678',
      cpf: '12345678910',
      dataNascimento: '2022-01-01'
    })

    expect(response.status).toBe(400)
    expect(response.body.errors).toHaveLength(1)
  })

  it('deve retornar 400 quando o telefone for vazio', async () => {
    const response = await request(app).post('/pacientes').send({
      nome: 'nome',
      telefone: '',
      cpf: '12345678910',
      dataNascimento: '2022-01-01'
    })

    expect(response.status).toBe(400)
    expect(response.body.errors).toHaveLength(1)
  })

  it('deve retornar 400 quando o cpf for vazio', async () => {
    const response = await request(app).post('/pacientes').send({
      nome: 'nome',
      telefone: '12345678',
      cpf: '',
      dataNascimento: '2022-01-01'
    })

    expect(response.status).toBe(400)
    expect(response.body.errors).toHaveLength(1)
  })

  it('deve retornar 400 quando a data de nascimento for vazia', async () => {
    const response = await request(app).post('/pacientes').send({
      nome: 'nome',
      telefone: '12345678',
      cpf: '12345678910',
      dataNascimento: ''
    })

    expect(response.status).toBe(400)
    expect(response.body.errors).toHaveLength(1)
  })

  it('deve retornar 400 quando a data de nascimento for invalida', async () => {
    const response = await request(app).post('/pacientes').send({
      nome: 'nome',
      telefone: '12345678',
      cpf: '12345678911',
      dataNascimento: '01-01-2022'
    })

    expect(response.status).toBe(400)
    expect(response.body.errors).toHaveLength(1)
  })
})
