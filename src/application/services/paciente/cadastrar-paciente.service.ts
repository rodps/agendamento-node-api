import { PacienteDtoResponse, type PacienteDtoRequest } from '../../dto/paciente/paciente.dto'
import { Paciente } from '../../entity/paciente.entity'
import { type IPacienteRepository } from '../../interfaces/repository.interface'
import { Validator } from '../../utils/validator'

export class CadastrarPacienteService {
  constructor (
    private readonly pacienteRepository: IPacienteRepository
  ) {}

  async execute (dto: PacienteDtoRequest): Promise<PacienteDtoResponse> {
    const pacientes = await this.pacienteRepository.buscarPorCpf(dto.cpf)
    Validator.isEmpty(pacientes, 'CPF já existe')

    const paciente = await this.pacienteRepository.insert(Paciente.from(dto))
    return new PacienteDtoResponse(paciente)
  }
}
