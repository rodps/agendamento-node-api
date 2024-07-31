import { PacienteDtoResponse, type PacienteDtoRequest } from '../../dto/paciente/paciente.dto'
import { Paciente } from '../../entity/paciente.entity'
import { ApplicationError } from '../../errors/application.error'
import { type IPacienteRepository } from '../../repository/paciente-repository.interface'

export class CadastrarPacienteService {
  constructor (private readonly pacienteRepository: IPacienteRepository) {}

  async execute (dto: PacienteDtoRequest): Promise<PacienteDtoResponse> {
    await this.validarCpfJaExiste(dto.cpf)

    const paciente = await this.pacienteRepository.insert(Paciente.from(dto))
    return new PacienteDtoResponse(paciente)
  }

  private async validarCpfJaExiste (cpf: string): Promise<void> {
    const paciente = await this.pacienteRepository.buscarPorCpf(cpf)
    if (paciente.length > 0) {
      throw new ApplicationError('Este CPF já existe')
    }
  }
}
