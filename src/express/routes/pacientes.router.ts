/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { PacienteRepository } from '../../repositories/paciente.repository'
import { PacientesController } from '../controllers/pacientes.controller'

module.exports = (router: Router) => {
  const controller = new PacientesController(new PacienteRepository())

  router.post('/pacientes', controller.cadastrar)
}