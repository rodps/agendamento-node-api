/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { ConsultasController } from '../controllers/consultas.controller'
import { ConsultaRepository } from '../../repositories/consulta.repository'
import { MedicoRepository } from '../../repositories/medico.repository'
import { PacienteRepository } from '../../repositories/paciente.repository'

module.exports = (router: Router) => {
  const controller = new ConsultasController(
    new ConsultaRepository(),
    new MedicoRepository(),
    new PacienteRepository()
  )
  router.post('/consultas', controller.agendar)
}
