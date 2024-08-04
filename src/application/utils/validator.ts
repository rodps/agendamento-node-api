import { ApplicationError } from '../errors/application.error'

export const isNotNull = (value: any, message: string): void => {
  if (value === null || value === undefined) {
    throw new ApplicationError(message)
  }
}
export const isNull = (value: any, message: string): void => {
  if (value !== null && value !== undefined) {
    throw new ApplicationError(message)
  }
}
export const isNotEmpty = (value: any[] | string, message: string): void => {
  if (value === null || value === undefined || value.length === 0) {
    throw new ApplicationError(message)
  }
}
export const isEmpty = (value: any[] | string, message: string): void => {
  if (value.length > 0) {
    throw new ApplicationError(message)
  }
}
export const isGreaterThan = (value: any, min: any, message: string): void => {
  if (value < min) {
    throw new ApplicationError(message)
  }
}
export const isEmail = (value: string, message: string): void => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  if (!regex.test(value)) {
    throw new ApplicationError(message)
  }
}
export const isStrongPassword = (value: string, message: string): void => {
  if (value.length < 8) {
    throw new ApplicationError(message)
  }
}
