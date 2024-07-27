import { type NextFunction, type Request, type Response } from 'express'
import { CadastrarPacienteService } from '../../application/domain/paciente/cadastrar/cadastrar-paciente.service'
import { PacienteRepository } from '../../repositories/paciente.repository'
import { CadastrarPacienteDto } from '../../application/domain/paciente/cadastrar/dto/cadastrar-paciente.dto'

const pacientesController = {
  cadastrar: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pacienteRepository = new PacienteRepository()
      const cadastrarService = new CadastrarPacienteService(pacienteRepository)

      const paciente = await cadastrarService.execute(new CadastrarPacienteDto(req.body))
      res.status(201).json(paciente)
    } catch (err) {
      next(err)
    }
  }
}

export { pacientesController }
