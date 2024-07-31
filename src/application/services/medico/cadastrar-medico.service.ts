import { MedicoDtoResponse, type MedicoDtoRequest } from '../../dto/medico/medico.dto'
import { Medico } from '../../entity/medico.entity'
import { type IMedicoRepository } from '../../interfaces/repository.interface'
import { Validator } from '../../utils/validator'

export class CadastrarMedicoService {
  constructor (
    private readonly medicoRepository: IMedicoRepository
  ) {}

  public async execute (dto: MedicoDtoRequest): Promise<MedicoDtoResponse> {
    const medicos = await this.medicoRepository.buscarPorCrm(dto.crm)
    Validator.isEmpty(medicos, 'CRM já existe')

    const medico = await this.medicoRepository.insert(Medico.from(dto))
    return new MedicoDtoResponse(medico)
  }
}
