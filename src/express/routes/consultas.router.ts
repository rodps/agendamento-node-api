/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { consultasController } from '../controllers/consultas.controller'

module.exports = (router: Router) => {
  router.post('/consultas', consultasController.agendar)
}
