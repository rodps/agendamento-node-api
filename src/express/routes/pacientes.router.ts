/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { PacienteRepository } from '../../infrastructure/repositories/paciente.repository'
import { PacientesController } from '../controllers/pacientes.controller'
import { PacienteService } from '../../application/services/paciente.service'

const pacientesRouter = Router()

const pacienteService = new PacienteService(new PacienteRepository())
const controller = new PacientesController(pacienteService)

pacientesRouter.post('/pacientes', controller.cadastrar)

export { pacientesRouter }
