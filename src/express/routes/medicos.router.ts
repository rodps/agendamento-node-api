/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { MedicoRepository } from '../../repositories/medico.repository'
import { MedicosController } from '../controllers/medicos.controller'

module.exports = (router: Router) => {
  const controller = new MedicosController(new MedicoRepository())

  router.post('/medicos', controller.cadastrar)
}
