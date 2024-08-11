import { AuthController } from '../../../express/api/auth/auth.controller'
import { ConsultasController } from '../../../express/api/consultas/consultas.controller'
import { MedicosController } from '../../../express/api/medicos/medicos.controller'
import { PacientesController } from '../../../express/api/pacientes/pacientes.controller'
import { UsuariosController } from '../../../express/api/usuarios/usuarios.controller'
import { createAuthService, createConsultaService, createMedicoService, createPacienteService, createUsuarioService } from '../application/app-service.factory'

export const createAuthController = (): AuthController => new AuthController(createAuthService())
export const createConsultasController = (): ConsultasController => new ConsultasController(createConsultaService())
export const createMedicosController = (): MedicosController => new MedicosController(createMedicoService())
export const createPacientesController = (): PacientesController => new PacientesController(createPacienteService())
export const createUsuariosController = (): UsuariosController => new UsuariosController(createUsuarioService())
