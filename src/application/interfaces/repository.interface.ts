import { type Consulta } from '../entity/consulta.entity'
import { type Medico } from '../entity/medico.entity'
import { type Paciente } from '../entity/paciente.entity'

export interface IConsultaRepository {
  insert: (consulta: Consulta) => Promise<Consulta>
  buscarPorData: (dataInicio: Date, dataFim: Date) => Promise<Consulta[]>
}

export interface IMedicoRepository {
  insert: (medico: Medico) => Promise<Medico>
  buscarPorCrm: (crm: string) => Promise<Medico[]>
  buscarPorId: (id: number) => Promise<Medico | null>
}

export interface IPacienteRepository {
  insert: (paciente: Paciente) => Promise<Paciente>
  buscarPorCpf: (cpf: string) => Promise<Paciente[]>
  buscarPorId: (id: number) => Promise<Paciente | null>
}
