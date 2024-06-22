import { ApplicationError } from '../../../../errors/application.error'

interface CadastrarMedicoParams {
  nome: string
  crm: string
  especialidade: string
}

export class CadastrarMedicoDto {
  readonly nome: string
  readonly crm: string
  readonly especialidade: string

  constructor ({ nome, crm, especialidade }: CadastrarMedicoParams) {
    if (nome === undefined || nome.length === 0) {
      throw new ApplicationError('Nome obrigatorio')
    }
    if (crm === undefined || crm.length === 0) {
      throw new ApplicationError('CRM obrigatorio')
    }
    if (especialidade === undefined || especialidade.length === 0) {
      throw new ApplicationError('Especialidade obrigatorio')
    }
    this.nome = nome
    this.crm = crm
    this.especialidade = especialidade
  }
}
