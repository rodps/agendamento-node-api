/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { MedicoRepository } from '../../infrastructure/repositories/medico.repository'
import { MedicosController } from '../controllers/medicos.controller'
import { MedicoService } from '../../application/services/medico.service'

const medicosRouter = Router()
const medicoService = new MedicoService(new MedicoRepository())
const controller = new MedicosController(medicoService)

medicosRouter.post('/medicos', controller.cadastrar)

export { medicosRouter }
