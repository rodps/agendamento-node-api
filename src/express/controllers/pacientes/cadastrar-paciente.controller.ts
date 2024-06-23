import { type Request, type Response } from 'express'
import { BaseController } from '../base.controller'
import { CadastrarPacienteService } from '../../../application/domain/paciente/cadastrar/cadastrar-paciente.service'
import { PacienteRepository } from '../../../repositories/paciente.repository'
import { CadastrarPacienteDto } from '../../../application/domain/paciente/cadastrar/dto/cadastrar-paciente.dto'

export class CadastrarPacienteController extends BaseController {
  protected async _execute (req: Request, res: Response): Promise<void> {
    const pacienteRepository = new PacienteRepository()
    const cadastrarService = new CadastrarPacienteService(pacienteRepository)

    const paciente = await cadastrarService.execute(
      new CadastrarPacienteDto(req.body)
    )

    res.status(201).json(paciente)
  }
}
