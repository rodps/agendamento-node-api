import { type Paciente } from '../entity/paciente.entity'

export interface IPacienteRepository {
  insert: (paciente: Paciente) => Promise<Paciente>
  buscarPorCpf: (cpf: string) => Promise<Paciente[]>
  buscarPorId: (id: number) => Promise<Paciente | null>
}
