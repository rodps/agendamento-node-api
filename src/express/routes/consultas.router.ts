/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { ConsultasController } from '../controllers/consultas.controller'
import { ConsultaRepository } from '../../infrastructure/repositories/consulta.repository'
import { MedicoRepository } from '../../infrastructure/repositories/medico.repository'
import { PacienteRepository } from '../../infrastructure/repositories/paciente.repository'
import { ConsultaService } from '../../application/services/consulta.service'

const consultasRouter = Router()

const consultaService = new ConsultaService(
  new ConsultaRepository(),
  new MedicoRepository(),
  new PacienteRepository()
)
const controller = new ConsultasController(consultaService)

consultasRouter.post('/consultas', controller.agendar)

export { consultasRouter }
