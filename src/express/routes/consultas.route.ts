import { type Request, type Response, type Router } from 'express'
import { AgendarConsultaController } from '../controllers/consultas/agendar-consulta.controller'

module.exports = (router: Router) => {
  router.post('/consultas', (req: Request, res: Response) => {
    void new AgendarConsultaController().handle(req, res)
  })
}
