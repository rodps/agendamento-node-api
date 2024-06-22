import { Consulta, ConsultaStatus } from '../../../entity/consulta.entity'
import { ApplicationError } from '../../../errors/application.error'
import { type IConsultaRepository } from '../../../repository/consulta-repository.interface'
import { type IMedicoRepository } from '../../../repository/medico-repository.interface'
import { type IPacienteRepository } from '../../../repository/paciente-repository.interface'
import { AgendarConsultaResponseDto } from './dto/agendar-consulta-response.dto'
import { type AgendarConsultaDto } from './dto/agendar-consulta.dto'

export class AgendarConsultaService {
  constructor (
    private readonly _consultaRepository: IConsultaRepository,
    private readonly _medicoRepository: IMedicoRepository,
    private readonly _pacienteRepository: IPacienteRepository
  ) {}

  public async execute (dto: AgendarConsultaDto): Promise<AgendarConsultaResponseDto> {
    if (await this._existeConsultaNaData(dto.dataInicio, dto.dataFim)) {
      throw new ApplicationError('Horário indisponível')
    }

    if (!await this._dataValida(dto.dataInicio, dto.dataFim)) {
      throw new ApplicationError('Data inicial deve ser anterior a data final')
    }

    if (!await this._medicoExiste(dto.medicoId)) {
      throw new ApplicationError('medicoId não encontrado')
    }

    if (!await this._pacienteExiste(dto.pacienteId)) {
      throw new ApplicationError('pacienteId não encontrado')
    }

    const consulta = await this._consultaRepository.insert(
      new Consulta(null, dto.dataInicio, dto.dataFim, dto.medicoId, dto.pacienteId, ConsultaStatus.Pendente)
    )

    return new AgendarConsultaResponseDto(consulta)
  }

  private async _medicoExiste (medicoId: number): Promise<boolean> {
    const medico = await this._medicoRepository.buscarPorId(medicoId)
    return medico !== null
  }

  private async _pacienteExiste (pacienteId: number): Promise<boolean> {
    const paciente = await this._pacienteRepository.buscarPorId(pacienteId)
    return paciente !== null
  }

  private async _existeConsultaNaData (dataInicio: Date, dataFim: Date): Promise<boolean> {
    const consulta = await this._consultaRepository.buscarPorData(dataInicio, dataFim)
    return consulta.length > 0
  }

  private async _dataValida (dataInicio: Date, dataFim: Date): Promise<boolean> {
    return dataFim > dataInicio
  }
}
