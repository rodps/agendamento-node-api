import { type CadastrarPacienteDto } from './cadastrar/dto/cadastrar-paciente.dto'
import { type Paciente } from './paciente.entity'

export interface IPacienteRepository {
  buscarPorCpf: (cpf: string) => Promise<Paciente[]>
  insert: (paciente: CadastrarPacienteDto) => Promise<Paciente>
}
