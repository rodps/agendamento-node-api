import { ApplicationError } from '../errors/application.error'

export const Validator = {
  isNotNull: (value: any, message?: string): void => {
    if (value === null || value === undefined) {
      throw new ApplicationError(message ?? 'O valor não pode ser nulo')
    }
  },
  isNotEmpty: (value: any[] | string, message?: string): void => {
    if (value === null || value === undefined || value.length === 0) {
      throw new ApplicationError(message ?? 'O valor deve estar vazio')
    }
  },
  isEmpty: (value: any[] | string, message?: string): void => {
    if (value.length > 0) {
      throw new ApplicationError(message ?? 'O valor deve estar vazio')
    }
  },
  isGreaterThan: (value: any, min: any, message?: string): void => {
    if (value < min) {
      throw new ApplicationError(message ?? 'O valor deve ser maior que ' + min)
    }
  }
}
