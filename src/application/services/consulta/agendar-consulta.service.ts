import { ConsultaDtoResponse, type ConsultaDtoRequest } from '../../dto/consulta/consulta.dto'
import { Consulta } from '../../entity/consulta.entity'
import { ApplicationError } from '../../errors/application.error'
import { type IConsultaRepository } from '../../repository/consulta-repository.interface'
import { type IMedicoRepository } from '../../repository/medico-repository.interface'
import { type IPacienteRepository } from '../../repository/paciente-repository.interface'

export class AgendarConsultaService {
  constructor (
    private readonly consultaRepository: IConsultaRepository,
    private readonly medicoRepository: IMedicoRepository,
    private readonly pacienteRepository: IPacienteRepository
  ) {}

  public async execute (dto: ConsultaDtoRequest): Promise<ConsultaDtoResponse> {
    await this.validarMedicoExiste(dto.medicoId)
    await this.validarPacienteExiste(dto.pacienteId)
    await this.validarDisponibilidade(dto.dataInicio, dto.dataFim)

    const consulta = await this.consultaRepository.insert(Consulta.from(dto))

    return new ConsultaDtoResponse(consulta)
  }

  private async validarMedicoExiste (medicoId: number): Promise<void> {
    const medico = await this.medicoRepository.buscarPorId(medicoId)
    if (medico == null) {
      throw new ApplicationError('medicoId não encontrado')
    }
  }

  private async validarPacienteExiste (pacienteId: number): Promise<void> {
    const paciente = await this.pacienteRepository.buscarPorId(pacienteId)
    if (paciente == null) {
      throw new ApplicationError('pacienteId não encontrado')
    }
  }

  private async validarDisponibilidade (dataInicio: Date, dataFim: Date): Promise<void> {
    const consulta = await this.consultaRepository.buscarPorData(dataInicio, dataFim)
    if (consulta.length > 0) {
      throw new ApplicationError('Horário indisponível')
    }
  }
}
