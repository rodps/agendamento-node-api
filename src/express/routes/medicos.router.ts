/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { medicosController } from '../controllers/medicos.controller'

module.exports = (router: Router) => {
  router.post('/medicos', medicosController.cadastrar)
}
