import { type NextFunction, type Request, type Response } from 'express'
import { CadastrarMedicoService } from '../../application/domain/medico/cadastrar/cadastrar-medico.service'
import { MedicoRepository } from '../../repositories/medico.repository'
import { CadastrarMedicoDto } from '../../application/domain/medico/cadastrar/dto/cadastrar-medico.dto'

const medicosController = {
  cadastrar: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const medicoRepository = new MedicoRepository()
      const cadastrarService = new CadastrarMedicoService(medicoRepository)

      const medico = await cadastrarService.execute(new CadastrarMedicoDto(req.body))
      res.status(201).json(medico)
    } catch (err) {
      next(err)
    }
  }
}

export { medicosController }
