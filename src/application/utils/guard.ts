import { ApplicationError } from '../errors/application.error'

export function guard (value: unknown, message: string): asserts value {
  if (value === undefined || value === null || value === '' || value === 0 || value === false) {
    throw new ApplicationError(message)
  }
}
