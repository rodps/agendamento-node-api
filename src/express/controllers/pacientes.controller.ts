import { type NextFunction, type Request, type Response } from 'express'
import { CadastrarPacienteService } from '../../application/services/paciente/cadastrar/cadastrar-paciente.service'
import { PacienteRepository } from '../../repositories/paciente.repository'
import { z } from 'zod'

const pacientesController = {
  cadastrar: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pacienteRepository = new PacienteRepository()
      const cadastrarService = new CadastrarPacienteService(pacienteRepository)

      const data = z.object({
        nome: z.string().min(3),
        telefone: z.string().min(8),
        cpf: z.string().min(11),
        dataNascimento: z.string().date()
      }).parse(req.body)

      const paciente = await cadastrarService.execute(data)
      res.status(201).json(paciente)
    } catch (err) {
      next(err)
    }
  }
}

export { pacientesController }
