import { AuthController } from '../../express/api/auth/auth.controller'
import { ConsultasController } from '../../express/api/consultas/consultas.controller'
import { MedicosController } from '../../express/api/medicos/medicos.controller'
import { PacientesController } from '../../express/api/pacientes/pacientes.controller'
import { makeAuthService, makeConsultaService, makeMedicoService, makePacienteService } from './application-services.factory'

export const makeAuthController = (): AuthController => new AuthController(makeAuthService())
export const makeConsultasController = (): ConsultasController => new ConsultasController(makeConsultaService())
export const makeMedicosController = (): MedicosController => new MedicosController(makeMedicoService())
export const makePacientesController = (): PacientesController => new PacientesController(makePacienteService())
