import { type Consulta } from './consulta.entity'

export interface IConsultaRepository {
  insert: (consulta: Consulta) => Promise<Consulta>
  buscarPorData: (dataInicio: Date, dataFim: Date) => Promise<Consulta[]>
}
