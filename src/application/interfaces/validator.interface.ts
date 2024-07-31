export interface IValidator {
  /**
   * @throws {ApplicationError}
   */
  isNotNull: (value: any, message?: string) => void

  /**
   * @throws {ApplicationError}
   */
  isEmpty: (value: any[] | string, message?: string) => void
}
