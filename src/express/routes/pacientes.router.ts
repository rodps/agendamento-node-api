/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { pacientesController } from '../controllers/pacientes.controller'

module.exports = (router: Router) => {
  router.post('/pacientes', pacientesController.cadastrar)
}
