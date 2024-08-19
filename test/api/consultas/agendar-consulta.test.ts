import request from 'supertest'
import app from '../../../src/express/app'
import { closeDbConnection, deleteAllFromTable, TestUser } from '../../helpers'
import { createConsulta, createMedico, createPaciente } from '../../db-factory'

describe('POST /consultas', () => {
  let token = ''
  let testUser: TestUser

  beforeAll(async () => {
    testUser = await TestUser.create()
    token = testUser.getAuthToken()
  })

  afterAll(async () => {
    await closeDbConnection()
  })

  beforeEach(async () => {
    await deleteAllFromTable('consultas')
    await deleteAllFromTable('pacientes')
    await deleteAllFromTable('medicos')
  })

  test('deve retornar 401 quando o usuario não estiver autenticado', async () => {
    const result = await request(app).post('/consultas').send({
      dataInicio: '2022-01-01T00:00:00.000Z',
      dataFim: '2022-01-01T01:00:00.000Z',
      medicoId: 1,
      pacienteId: 1
    })

    expect(result.status).toBe(401)
  })

  test('deve retornar 201', async () => {
    const medico = await createMedico()
    const paciente = await createPaciente()

    const result = await request(app).post('/consultas').send({
      dataInicio: '2022-01-03T00:00:00.000Z',
      dataFim: '2022-01-03T01:00:00.000Z',
      medicoId: medico.getId(),
      pacienteId: paciente.getId()
    }).auth(token, { type: 'bearer' })

    expect(result.status).toBe(201)
    expect(result.body.data.id).toBeDefined()
    expect(result.body.data.dataInicio).toBe('2022-01-03T00:00:00.000Z')
    expect(result.body.data.dataFim).toBe('2022-01-03T01:00:00.000Z')
    expect(result.body.data.medicoId).toBe(1)
    expect(result.body.data.pacienteId).toBe(1)
    expect(result.body.data.status).toBe('PENDENTE')
  })

  test('deve retornar 400 quando o medicoId for invalido', async () => {
    const result = await request(app).post('/consultas').send({
      dataInicio: '2022-01-01T00:00:00.000Z',
      dataFim: '2022-01-01T01:00:00.000Z',
      medicoId: 999,
      pacienteId: 999
    }).auth(token, { type: 'bearer' })

    expect(result.status).toBe(400)
    expect(result.body.error.message).toBe('medicoId não encontrado')
  })

  test('deve retornar 400 quando o pacienteId for invalido', async () => {
    const medico = await createMedico()

    const result = await request(app).post('/consultas').send({
      dataInicio: '2022-01-01T00:00:00.000Z',
      dataFim: '2022-01-01T01:00:00.000Z',
      medicoId: medico.getId(),
      pacienteId: 999
    }).auth(token, { type: 'bearer' })

    expect(result.status).toBe(400)
    expect(result.body.error.message).toBe('pacienteId não encontrado')
  })

  test('deve retornar 400 quando a data de inicio for vazia', async () => {
    const medico = await createMedico()
    const paciente = await createPaciente()

    const result = await request(app).post('/consultas').send({
      dataFim: '2022-01-01T01:00:00.000Z',
      medicoId: medico.getId(),
      pacienteId: paciente.getId()
    }).auth(token, { type: 'bearer' })

    expect(result.status).toBe(400)
    expect(result.body.error).toBeDefined()
    expect(result.body.error.errors).toHaveLength(1)
  })

  test('deve retornar 400 quando a data de fim for vazia', async () => {
    const result = await request(app).post('/consultas').send({
      dataInicio: '2022-01-01T00:00:00.000Z',
      medicoId: 1,
      pacienteId: 1
    }).auth(token, { type: 'bearer' })

    expect(result.status).toBe(400)
    expect(result.body.error).toBeDefined()
    expect(result.body.error.errors).toHaveLength(1)
  })

  test('deve retornar 400 quando a data de inicio for maior que a data de fim', async () => {
    const medico = await createMedico()
    const paciente = await createPaciente()

    const result = await request(app).post('/consultas').send({
      dataInicio: '2022-01-01T01:00:00.000Z',
      dataFim: '2022-01-01T00:00:00.000Z',
      medicoId: medico.getId(),
      pacienteId: paciente.getId()
    }).auth(token, { type: 'bearer' })

    expect(result.status).toBe(400)
    expect(result.body.error.message).toBe(
      'Data inicial deve ser anterior a data final'
    )
  })

  test('deve retornar 400 quando o horário estiver indisponível', async () => {
    const medico = await createMedico()
    const paciente = await createPaciente()
    const consulta = await createConsulta(medico, paciente)

    const result = await request(app).post('/consultas').send({
      dataInicio: consulta.dataInicio,
      dataFim: consulta.dataFim,
      medicoId: medico.getId(),
      pacienteId: paciente.getId()
    }).auth(token, { type: 'bearer' })

    expect(result.status).toBe(400)
    expect(result.body.error.message).toBe('Horário indisponível')
  })
})
