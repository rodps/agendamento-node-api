import { guard } from '../utils/guard'

export abstract class ApplicationEntity {
  constructor (readonly id: number | null) {}

  public getId (): number {
    guard(this.id, 'Id obrigatório')
    return this.id
  }
}
