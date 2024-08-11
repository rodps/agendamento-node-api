import { type NextFunction, type Request, type Response } from 'express'
import { AgendarConsultaDto } from './dto/agendar-consulta.dto'
import { type ConsultaService } from '../../../application/services/consulta.service'

export class ConsultasController {
  constructor (private readonly consultaService: ConsultaService) {}

  public agendar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.consultaService.agendar(new AgendarConsultaDto(req.body))
      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }
}