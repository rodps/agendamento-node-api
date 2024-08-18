import { type MedicoDto } from '../dto/medico/medico.dto'
import { Medico } from '../entity/medico.entity'
import { type IMedicoRepository } from '../interfaces/repository.interface'
import { guard } from '../utils/guard'

export class MedicoService {
  constructor (
    private readonly medicoRepository: IMedicoRepository
  ) {}

  public async cadastrar (dto: MedicoDto): Promise<Medico> {
    const medicos = await this.medicoRepository.buscarPorCrm(dto.crm)
    guard(medicos.length === 0, 'CRM já existe')

    const medico = await this.medicoRepository.insert(Medico.from(dto))

    return medico
  }
}
