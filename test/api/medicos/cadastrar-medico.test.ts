import request from 'supertest'
import app from '../../../src/express/app'
import { closeDbConnection, deleteAllFromTable } from '../../helpers'

describe('Cadastrar Medico', () => {
  afterAll(async () => {
    await closeDbConnection()
  })

  beforeAll(async () => {
    await deleteAllFromTable('consultas')
  })

  beforeEach(async () => {
    await deleteAllFromTable('medicos')
  })

  it('deve retornar 201', async () => {
    const response = await request(app).post('/medicos').send({
      crm: '123456',
      especialidade: 'especialidade',
      nome: 'nome'
    })

    expect(response.status).toBe(201)
    expect(response.body.data.id).toBeDefined()
    expect(response.body.data.crm).toBe('123456')
    expect(response.body.data.especialidade).toBe('especialidade')
    expect(response.body.data.nome).toBe('nome')
  })

  it('deve retornar 400 quando o crm ja existir', async () => {
    await request(app).post('/medicos').send({
      crm: '123456',
      especialidade: 'especialidade',
      nome: 'nome'
    })

    const response = await request(app).post('/medicos').send({
      crm: '123456',
      especialidade: 'especialidade',
      nome: 'nome'
    })

    expect(response.status).toBe(400)
    expect(response.body.error.message).toBe('CRM já existe')
  })

  it('deve retornar 400 quando o nome for vazio', async () => {
    const response = await request(app).post('/medicos').send({
      crm: '123456',
      especialidade: 'especialidade',
      nome: ''
    })

    expect(response.status).toBe(400)
    expect(response.body.error.errors).toHaveLength(1)
  })

  it('deve retornar 400 quando o crm for vazio', async () => {
    const response = await request(app).post('/medicos').send({
      crm: '',
      especialidade: 'especialidade',
      nome: 'nome'
    })

    expect(response.status).toBe(400)
    expect(response.body.error.errors).toHaveLength(1)
  })

  it('deve retornar 400 quando a especialidade for vazia', async () => {
    const response = await request(app).post('/medicos').send({
      crm: '123456',
      especialidade: '',
      nome: 'nome'
    })

    expect(response.status).toBe(400)
    expect(response.body.error.errors).toHaveLength(1)
  })
})
