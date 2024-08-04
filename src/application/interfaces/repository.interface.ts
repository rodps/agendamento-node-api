import { type Consulta } from '../entity/consulta.entity'
import { type Medico } from '../entity/medico.entity'
import { type Paciente } from '../entity/paciente.entity'
import { type Usuario } from '../entity/usuario.entity'

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

export interface IUsuarioRepository {
  insert: (usuario: Usuario) => Promise<Usuario>
  buscarPorEmail: (email: string) => Promise<Usuario | null>
  buscarPorId: (id: number) => Promise<Usuario | null>
}
