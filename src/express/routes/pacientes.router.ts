/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { PacienteRepository } from '../../repositories/paciente.repository'
import { PacientesController } from '../controllers/pacientes.controller'
import { PacienteService } from '../../application/services/paciente.service'

module.exports = (router: Router) => {
  const pacienteService = new PacienteService(new PacienteRepository())
  const controller = new PacientesController(pacienteService)

  router.post('/pacientes', controller.cadastrar)
}
