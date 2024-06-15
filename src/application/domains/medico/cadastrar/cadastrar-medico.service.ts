import { ApplicationError } from '../../../errors/application.error'
import { type IMedicoRepository } from '../repository.interface'
import { type CadastrarMedicoResponseDto } from './dto/cadastrar-medico-response.dto'
import { type CadastrarMedicoDto } from './dto/cadastrar-medico.dto'

export class CadastrarMedicoService {
  constructor (private readonly _medicoRepository: IMedicoRepository) {}

  public async execute (dto: CadastrarMedicoDto): Promise<CadastrarMedicoResponseDto> {
    if (await this._existeCrm(dto.crm)) {
      throw new ApplicationError('CRM ja existe')
    }
    return await this._medicoRepository.insert(dto)
  }

  private async _existeCrm (crm: string): Promise<boolean> {
    const medico = await this._medicoRepository.buscarPorCrm(crm)
    return medico.length > 0
  }
}
