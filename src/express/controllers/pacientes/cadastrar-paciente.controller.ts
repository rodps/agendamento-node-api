import { type Request, type Response } from 'express'
import { BaseController } from '../base.controller'
import { CadastrarPacienteService } from '../../../application/domains/paciente/cadastrar/cadastrar-paciente.service'
import { PacienteRepository } from '../../../repositories/paciente.repository'
import { CadastrarPacienteDto } from '../../../application/domains/paciente/cadastrar/dto/cadastrar-paciente.dto'

export class CadastrarPacienteController extends BaseController {
  protected async _execute (req: Request, res: Response): Promise<void> {
    const pacienteRepository = new PacienteRepository()
    const cadastrarService = new CadastrarPacienteService(pacienteRepository)

    const data = new CadastrarPacienteDto({
      nome: req.body.nome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      dataNascimento: req.body.dataNascimento
    })

    const paciente = await cadastrarService.execute(data)

    res.status(201).json(paciente)
  }
}
