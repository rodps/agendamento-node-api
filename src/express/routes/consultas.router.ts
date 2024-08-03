/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { ConsultasController } from '../controllers/consultas.controller'
import { ConsultaRepository } from '../../repositories/consulta.repository'
import { MedicoRepository } from '../../repositories/medico.repository'
import { PacienteRepository } from '../../repositories/paciente.repository'
import { ConsultaService } from '../../application/services/consulta.service'

module.exports = (router: Router) => {
  const consultaService = new ConsultaService(
    new ConsultaRepository(),
    new MedicoRepository(),
    new PacienteRepository()
  )
  const controller = new ConsultasController(consultaService)

  router.post('/consultas', controller.agendar)
}
