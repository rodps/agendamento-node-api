import { type NextFunction, type Request, type Response } from 'express'
import { CadastrarMedicoService } from '../../application/services/medico/cadastrar/cadastrar-medico.service'
import { MedicoRepository } from '../../repositories/medico.repository'
import { z } from 'zod'

const medicosController = {
  cadastrar: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const medicoRepository = new MedicoRepository()
      const cadastrarService = new CadastrarMedicoService(medicoRepository)

      const data = z.object({
        nome: z.string().min(3),
        crm: z.string().min(6),
        especialidade: z.string().min(3)
      }).parse(req.body)

      const medico = await cadastrarService.execute(data)
      res.status(201).json(medico)
    } catch (err) {
      next(err)
    }
  }
}

export { medicosController }
