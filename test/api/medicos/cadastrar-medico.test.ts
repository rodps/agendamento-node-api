import request from 'supertest'
import app from '../../../src/express/app'
import { closeDbConnection, deleteMedicosTable } from '../../helpers'

describe('Cadastrar Medico', () => {
  afterAll(async () => {
    await closeDbConnection()
  })

  beforeEach(async () => {
    await deleteMedicosTable()
  })

  it('deve retornar 201', async () => {
    const response = await request(app).post('/medicos').send({
      crm: '123',
      especialidade: 'especialidade',
      nome: 'nome'
    })

    expect(response.status).toBe(201)
    expect(response.body.id).toBeDefined()
    expect(response.body.crm).toBe('123')
    expect(response.body.especialidade).toBe('especialidade')
    expect(response.body.nome).toBe('nome')
  })

  it('deve retornar 400 quando o crm ja existir', async () => {
    await request(app).post('/medicos').send({
      crm: '123',
      especialidade: 'especialidade',
      nome: 'nome'
    })

    const response = await request(app).post('/medicos').send({
      crm: '123',
      especialidade: 'especialidade',
      nome: 'nome'
    })

    expect(response.status).toBe(400)
    expect(response.body.erro).toBe('CRM ja existe')
  })

  it('deve retornar 400 quando o nome for vazio', async () => {
    const response = await request(app).post('/medicos').send({
      crm: '123',
      especialidade: 'especialidade',
      nome: ''
    })

    expect(response.status).toBe(400)
    expect(response.body.erro).toBe('Nome obrigatorio')
  })

  it('deve retornar 400 quando o crm for vazio', async () => {
    const response = await request(app).post('/medicos').send({
      crm: '',
      especialidade: 'especialidade',
      nome: 'nome'
    })

    expect(response.status).toBe(400)
    expect(response.body.erro).toBe('CRM obrigatorio')
  })

  it('deve retornar 400 quando a especialidade for vazia', async () => {
    const response = await request(app).post('/medicos').send({
      crm: '123',
      especialidade: '',
      nome: 'nome'
    })

    expect(response.status).toBe(400)
    expect(response.body.erro).toBe('Especialidade obrigatorio')
  })
})
