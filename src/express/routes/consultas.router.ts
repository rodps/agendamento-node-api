/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { ConsultasController } from '../controllers/consultas.controller'
import { ConsultaRepository } from '../../repositories/consulta.repository'
import { MedicoRepository } from '../../repositories/medico.repository'
import { PacienteRepository } from '../../repositories/paciente.repository'
import { Validator } from '../../lib/validator'

module.exports = (router: Router) => {
  const controller = new ConsultasController(
    new ConsultaRepository(),
    new MedicoRepository(),
    new PacienteRepository(),
    new Validator()
  )
  router.post('/consultas', controller.agendar)
}
