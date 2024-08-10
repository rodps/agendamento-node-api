import request from 'supertest'
import app from '../../../src/express/app'
import { closeDbConnection, deleteAllFromTable, getAuthToken } from '../../helpers'
import { Consulta, ConsultaStatus } from '../../../src/application/entity/consulta.entity'
import { Medico } from '../../../src/application/entity/medico.entity'
import { Paciente } from '../../../src/application/entity/paciente.entity'
import { ConsultasFactory } from '../../../src/express/api/consultas/consultas.factory'

const createTestData = async (): Promise<void> => {
  const consultasFactory = new ConsultasFactory()
  const medicoRepository = consultasFactory.createMedicoRepository()
  const pacienteRepository = consultasFactory.createPacienteRepository()
  const consultaRepository = consultasFactory.createConsultaRepository()

  await deleteAllFromTable('consultas')
  await deleteAllFromTable('medicos')
  await deleteAllFromTable('pacientes')

  await medicoRepository.insert(
    new Medico(null, 'nome', '111', 'especialidade')
  )
  await pacienteRepository.insert(
    new Paciente(null, 'nome', 'telefone', 'cpf', '2022-01-01')
  )
  await consultaRepository.insert(
    new Consulta(
      null,
      new Date('2022-01-01T00:00:00.000Z'),
      new Date('2022-01-01T01:00:00.000Z'),
      1,
      1,
      ConsultaStatus.Pendente
    )
  )
}

describe('Agendar Consulta', () => {
  let token = ''

  afterAll(async () => {
    await closeDbConnection()
  })

  beforeEach(async () => {
    await createTestData()
    if (token === '') {
      token = await getAuthToken()
    }
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
    const result = await request(app).post('/consultas').send({
      dataInicio: '2022-01-03T00:00:00.000Z',
      dataFim: '2022-01-03T01:00:00.000Z',
      medicoId: 1,
      pacienteId: 1
    }).auth(token, { type: 'bearer' })

    expect(result.status).toBe(201)
    expect(result.body.id).toBeDefined()
    expect(result.body.dataInicio).toBe('2022-01-03T00:00:00.000Z')
    expect(result.body.dataFim).toBe('2022-01-03T01:00:00.000Z')
    expect(result.body.medicoId).toBe(1)
    expect(result.body.pacienteId).toBe(1)
    expect(result.body.status).toBe('PENDENTE')
  })

  test('deve retornar 400 quando o medicoId for invalido', async () => {
    const result = await request(app).post('/consultas').send({
      dataInicio: '2022-01-01T00:00:00.000Z',
      dataFim: '2022-01-01T01:00:00.000Z',
      medicoId: 999,
      pacienteId: 999
    }).auth(token, { type: 'bearer' })

    expect(result.status).toBe(400)
    expect(result.body.erro).toBe('medicoId não encontrado')
  })

  test('deve retornar 400 quando o pacienteId for invalido', async () => {
    const result = await request(app).post('/consultas').send({
      dataInicio: '2022-01-01T00:00:00.000Z',
      dataFim: '2022-01-01T01:00:00.000Z',
      medicoId: 1,
      pacienteId: 999
    }).auth(token, { type: 'bearer' })

    expect(result.status).toBe(400)
    expect(result.body.erro).toBe('pacienteId não encontrado')
  })

  test('deve retornar 400 quando a data de inicio for vazia', async () => {
    const result = await request(app).post('/consultas').send({
      dataFim: '2022-01-01T01:00:00.000Z',
      medicoId: 1,
      pacienteId: 1
    }).auth(token, { type: 'bearer' })

    expect(result.status).toBe(400)
    expect(result.body.erro).toBeDefined()
    expect(result.body.erro).toHaveLength(1)
  })

  test('deve retornar 400 quando a data de fim for vazia', async () => {
    const result = await request(app).post('/consultas').send({
      dataInicio: '2022-01-01T00:00:00.000Z',
      medicoId: 1,
      pacienteId: 1
    }).auth(token, { type: 'bearer' })

    expect(result.status).toBe(400)
    expect(result.body.erro).toBeDefined()
    expect(result.body.erro).toHaveLength(1)
  })

  test('deve retornar 400 quando a data de inicio for maior que a data de fim', async () => {
    const result = await request(app).post('/consultas').send({
      dataInicio: '2022-01-01T01:00:00.000Z',
      dataFim: '2022-01-01T00:00:00.000Z',
      medicoId: 1,
      pacienteId: 1
    }).auth(token, { type: 'bearer' })

    expect(result.status).toBe(400)
    expect(result.body.erro).toBe(
      'Data inicial deve ser anterior a data final'
    )
  })

  test('deve retornar 400 quando o horário estiver indisponível', async () => {
    const result = await request(app).post('/consultas').send({
      dataInicio: '2022-01-01T00:00:00.000Z',
      dataFim: '2022-01-01T01:00:00.000Z',
      medicoId: 1,
      pacienteId: 1
    }).auth(token, { type: 'bearer' })

    expect(result.status).toBe(400)
    expect(result.body.erro).toBe('Horário indisponível')
  })
})
