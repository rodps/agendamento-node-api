export interface Consulta {
  id?: number
  dataInicio: Date
  dataFim: Date
  medicoId: number
  pacienteId: number
  status: ConsultaStatus
}

export enum ConsultaStatus {
  Pendente = 'PENDENTE',
  Realizada = 'REALIZADA',
  Cancelada = 'CANCELADA'
}
