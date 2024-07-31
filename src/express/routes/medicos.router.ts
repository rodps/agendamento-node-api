/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { MedicoRepository } from '../../repositories/medico.repository'
import { MedicosController } from '../controllers/medicos.controller'
import { Validator } from '../../lib/validator'

module.exports = (router: Router) => {
  const controller = new MedicosController(new MedicoRepository(), new Validator())

  router.post('/medicos', controller.cadastrar)
}
