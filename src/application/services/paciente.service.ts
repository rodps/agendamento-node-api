import { type PacienteDto } from '../dto/paciente/paciente.dto'
import { Paciente } from '../entity/paciente.entity'
import { type IPacienteRepository } from '../interfaces/repository.interface'
import { guard } from '../utils/guard'

export class PacienteService {
  constructor (
    private readonly pacienteRepository: IPacienteRepository
  ) {}

  async cadastrar (dto: PacienteDto): Promise<Paciente> {
    const pacientes = await this.pacienteRepository.buscarPorCpf(dto.cpf)
    guard(pacientes.length === 0, 'CPF já existe')

    const paciente = await this.pacienteRepository.insert(Paciente.from(dto))

    return paciente
  }
}
