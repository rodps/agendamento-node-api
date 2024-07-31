import { MedicoDtoResponse, type MedicoDtoRequest } from '../../dto/medico/medico.dto'
import { Medico } from '../../entity/medico.entity'
import { type IMedicoRepository } from '../../interfaces/repository.interface'
import { type IValidator } from '../../interfaces/validator.interface'

export class CadastrarMedicoService {
  constructor (
    private readonly medicoRepository: IMedicoRepository,
    private readonly validator: IValidator
  ) {}

  public async execute (dto: MedicoDtoRequest): Promise<MedicoDtoResponse> {
    const medicos = await this.medicoRepository.buscarPorCrm(dto.crm)
    this.validator.isEmpty(medicos, 'CRM já existe')

    const medico = await this.medicoRepository.insert(Medico.from(dto))
    return new MedicoDtoResponse(medico)
  }
}
