import { type Medico } from '../entity/medico.entity'

export interface IMedicoRepository {
  insert: (medico: Medico) => Promise<Medico>
  buscarPorCrm: (crm: string) => Promise<Medico[]>
  buscarPorId: (id: number) => Promise<Medico | null>
}
