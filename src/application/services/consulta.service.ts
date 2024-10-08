import { type ConsultaDto } from '../dto/consulta/consulta.dto'
import { Consulta } from '../entity/consulta.entity'
import { type IConsultaRepository, type IMedicoRepository, type IPacienteRepository } from '../interfaces/repository.interface'
import { guard } from '../utils/guard'

export class ConsultaService {
  constructor (
    private readonly consultaRepository: IConsultaRepository,
    private readonly medicoRepository: IMedicoRepository,
    private readonly pacienteRepository: IPacienteRepository
  ) {}

  public async agendar (dto: ConsultaDto): Promise<Consulta> {
    const medico = await this.medicoRepository.buscarPorId(dto.medicoId)
    guard(medico, 'medicoId não encontrado')

    const paciente = await this.pacienteRepository.buscarPorId(dto.pacienteId)
    guard(paciente, 'pacienteId não encontrado')

    const consultas = await this.consultaRepository.buscarPorData(dto.dataInicio, dto.dataFim)
    guard(consultas.length === 0, 'Horário indisponível')

    const consulta = await this.consultaRepository.insert(Consulta.from(dto))

    return consulta
  }
}
