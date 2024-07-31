import { PacienteDtoResponse, type PacienteDtoRequest } from '../../dto/paciente/paciente.dto'
import { Paciente } from '../../entity/paciente.entity'
import { type IPacienteRepository } from '../../interfaces/repository.interface'
import { type IValidator } from '../../interfaces/validator.interface'

export class CadastrarPacienteService {
  constructor (
    private readonly pacienteRepository: IPacienteRepository,
    private readonly validator: IValidator
  ) {}

  async execute (dto: PacienteDtoRequest): Promise<PacienteDtoResponse> {
    const pacientes = await this.pacienteRepository.buscarPorCpf(dto.cpf)
    this.validator.isEmpty(pacientes, 'CPF já existe')

    const paciente = await this.pacienteRepository.insert(Paciente.from(dto))
    return new PacienteDtoResponse(paciente)
  }
}
