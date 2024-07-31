import { ConsultaDtoResponse, type ConsultaDtoRequest } from '../../dto/consulta/consulta.dto'
import { Consulta } from '../../entity/consulta.entity'
import { type IConsultaRepository, type IMedicoRepository, type IPacienteRepository } from '../../interfaces/repository.interface'
import { Validator } from '../../utils/validator'

export class AgendarConsultaService {
  constructor (
    private readonly consultaRepository: IConsultaRepository,
    private readonly medicoRepository: IMedicoRepository,
    private readonly pacienteRepository: IPacienteRepository
  ) {}

  public async execute (dto: ConsultaDtoRequest): Promise<ConsultaDtoResponse> {
    const medico = await this.medicoRepository.buscarPorId(dto.medicoId)
    Validator.isNotNull(medico, 'medicoId não encontrado')

    const paciente = await this.pacienteRepository.buscarPorId(dto.pacienteId)
    Validator.isNotNull(paciente, 'pacienteId não encontrado')

    const consultas = await this.consultaRepository.buscarPorData(dto.dataInicio, dto.dataFim)
    Validator.isEmpty(consultas, 'Horário indisponível')

    const consulta = await this.consultaRepository.insert(Consulta.from(dto))

    return new ConsultaDtoResponse(consulta)
  }
}
