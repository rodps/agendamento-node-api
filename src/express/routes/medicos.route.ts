import { type Request, type Response, Router } from 'express'
import { CadastrarMedicoController } from '../controllers/medicos/cadastrar-medico.controller'

const router = Router()

router.post('/medicos', (req: Request, res: Response) => {
  void new CadastrarMedicoController().handle(req, res)
})

export default router
