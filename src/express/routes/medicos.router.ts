/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { MedicoRepository } from '../../repositories/medico.repository'
import { MedicosController } from '../controllers/medicos.controller'
import { MedicoService } from '../../application/services/medico.service'

module.exports = (router: Router) => {
  const medicoService = new MedicoService(new MedicoRepository())
  const controller = new MedicosController(medicoService)

  router.post('/medicos', controller.cadastrar)
}
