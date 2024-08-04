export interface IEncryptionService {
  hash: (value: string) => string
  compare: (value: string, hash: string) => boolean
}
