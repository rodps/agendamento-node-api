import { ApplicationError } from '../application/errors/application.error'
import { type IValidator } from '../application/interfaces/validator.interface'

export class Validator implements IValidator {
  public isNotNull (value: any, message?: string): void {
    if (value === null || value === undefined) {
      throw new ApplicationError(message ?? 'O valor não pode ser nulo')
    }
  }

  public isEmpty (value: any[] | string, message?: string): void {
    if (value.length > 0) {
      throw new ApplicationError(message ?? 'O valor deve estar vazio')
    }
  }
}
