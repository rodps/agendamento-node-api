export abstract class ApplicationEntity {
  constructor (readonly id: number | null) {}

  public getIdOrThrow (): number {
    if (this.id == null) {
      throw new Error('Id obrigatorio')
    }
    return this.id
  }
}
