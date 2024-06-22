import { type Request, type Response } from 'express'
import { BaseController } from '../base.controller'
import { CadastrarMedicoService } from '../../../application/domain/medico/cadastrar/cadastrar-medico.service'
import { MedicoRepository } from '../../../repositories/medico.repository'
import { CadastrarMedicoDto } from '../../../application/domain/medico/cadastrar/dto/cadastrar-medico.dto'

export class CadastrarMedicoController extends BaseController {
  protected async _execute (req: Request, res: Response): Promise<void> {
    const medicoRepository = new MedicoRepository()
    const cadastrarService = new CadastrarMedicoService(medicoRepository)

    const data = new CadastrarMedicoDto({
      nome: req.body.nome,
      crm: req.body.crm,
      especialidade: req.body.especialidade
    })

    const medico = await cadastrarService.execute(data)

    res.status(201).json(medico)
  }
}
