import { createMedicosTable } from './v1-create-medicos-table'
import { createPacientesTable } from './v2-create-pacientes-table'
import { createConsultasTable } from './v3-create-consultas-table'
import { createUsuariosTable } from './v4-create-usuarios-table'

export const migrations = [
  createMedicosTable,
  createPacientesTable,
  createConsultasTable,
  createUsuariosTable
]
