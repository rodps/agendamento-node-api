import { MedicoDtoResponse, type MedicoDtoRequest } from '../../dto/medico/medico.dto'
import { Medico } from '../../entity/medico.entity'
import { ApplicationError } from '../../errors/application.error'
import { type IMedicoRepository } from '../../repository/medico-repository.interface'

export class CadastrarMedicoService {
  constructor (private readonly medicoRepository: IMedicoRepository) {}

  public async execute (dto: MedicoDtoRequest): Promise<MedicoDtoResponse> {
    await this.validarCrmExiste(dto.crm)

    const medico = await this.medicoRepository.insert(Medico.from(dto))
    return new MedicoDtoResponse(medico)
  }

  private async validarCrmExiste (crm: string): Promise<void> {
    const medico = await this.medicoRepository.buscarPorCrm(crm)
    if (medico.length > 0) {
      throw new ApplicationError('CRM ja existe')
    }
  }
}
