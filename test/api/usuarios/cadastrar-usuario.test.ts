import { closeDbConnection, deleteAllFromTable } from '../../helpers'
import request from 'supertest'
import app from '../../../src/express/app'

describe('Cadastrar Usuário', () => {
  afterAll(async () => {
    await closeDbConnection()
  })

  beforeEach(async () => {
    await deleteAllFromTable('usuarios')
  })

  it('deve retornar 201', async () => {
    const body = {
      nome: 'nome',
      email: 'email@test.com',
      password: '12345678'
    }
    const response = await request(app).post('/usuarios').send(body)

    const { data } = response.body

    expect(response.status).toBe(201)
    expect(data.id).toBeDefined()
    expect(data.nome).toBe(data.nome)
    expect(data.email).toBe(data.email)
    expect(data.password).toBeUndefined()
  })

  it('deve retornar 400 quando o nome for vazio', async () => {
    const data = {
      nome: '',
      email: 'email@test.com',
      password: '12345678'
    }
    const response = await request(app).post('/usuarios').send(data)

    expect(response.status).toBe(400)
    expect(response.body.errors).toHaveLength(1)
  })

  it('deve retornar 400 quando o email for vazio', async () => {
    const data = {
      nome: 'nome',
      email: '',
      password: '12345678'
    }
    const response = await request(app).post('/usuarios').send(data)

    expect(response.status).toBe(400)
    expect(response.body.errors).toHaveLength(1)
  })

  it('deve retornar 400 quando a senha for vazia', async () => {
    const data = {
      nome: 'nome',
      email: 'email@test.com',
      password: ''
    }
    const response = await request(app).post('/usuarios').send(data)

    expect(response.status).toBe(400)
    expect(response.body.errors).toHaveLength(1)
  })

  it('deve retornar 400 quando o email for invalido', async () => {
    const data = {
      nome: 'nome',
      email: 'email',
      password: '12345678'
    }
    const response = await request(app).post('/usuarios').send(data)

    expect(response.status).toBe(400)
    expect(response.body.errors).toHaveLength(1)
  })
})
