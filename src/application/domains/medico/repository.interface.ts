import { type CadastrarMedicoDto } from './cadastrar/dto/cadastrar-medico.dto'
import { type Medico } from './medico.entity'

export interface IMedicoRepository {
  insert: (medico: CadastrarMedicoDto) => Promise<Medico>
  buscarPorCrm: (crm: string) => Promise<Medico[]>
}
