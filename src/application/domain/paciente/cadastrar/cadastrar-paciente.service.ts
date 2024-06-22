import { Paciente } from '../../../entity/paciente.entity'
import { ApplicationError } from '../../../errors/application.error'
import { type IPacienteRepository } from '../../../repository/paciente-repository.interface'
import { CadastrarPacienteResponseDto } from './dto/cadastrar-paciente-response.dto'
import { type CadastrarPacienteDto } from './dto/cadastrar-paciente.dto'

export class CadastrarPacienteService {
  constructor (private readonly _pacienteRepository: IPacienteRepository) {}

  async execute (dto: CadastrarPacienteDto): Promise<CadastrarPacienteResponseDto> {
    if (await this._existeCpf(dto.cpf)) {
      throw new ApplicationError('Este CPF já existe')
    }
    const paciente = await this._pacienteRepository.insert(new Paciente(
      null,
      dto.nome,
      dto.telefone,
      dto.cpf,
      dto.dataNascimento
    ))
    return new CadastrarPacienteResponseDto(paciente)
  }

  private async _existeCpf (cpf: string): Promise<boolean> {
    const paciente = await this._pacienteRepository.buscarPorCpf(cpf)
    return paciente.length > 0
  }
}
