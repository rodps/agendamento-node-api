import { type Request, type Response, Router } from 'express'
import { CadastrarPacienteController } from '../controllers/pacientes/cadastrar-paciente.controller'

const pacientesRouter = Router()

pacientesRouter.post('/pacientes', (req: Request, res: Response) => {
  void new CadastrarPacienteController().handle(req, res)
})

export { pacientesRouter }
