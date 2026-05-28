import type { Liberaciones } from "@/lib/types";
import {
  findStudentByMatricula as findStudent,
  studentsDb,
  staffDb,
} from "@/lib/db";

/** Estudiante principal (demo) — reexportado desde la base de datos */
export const mockStudent = studentsDb[0];

/** Admin asesor (demo) — reexportado desde la base de datos */
export const mockAdmin = {
  nEmpleado: staffDb[0].nEmpleado,
  contrasena: "AdminPass123456",
  email: staffDb[0].email,
} as const;

export const MOCK_RECOVERY_CODE = "123456";

export function getStudentByMatricula(matricula: string) {
  const student = findStudent(matricula);
  if (!student) return null;
  return {
    usuario: student.usuario,
    nombre: student.nombre,
    contrasena: "",
    email: student.email,
    matricula: student.matricula,
    liberaciones: student.liberaciones,
  };
}

export function initialLiberacionesForStudent(matricula?: string): Liberaciones {
  const student = matricula ? findStudent(matricula) : studentsDb[0];
  if (student) return { ...student.liberaciones };
  return {
    biblioteca: false,
    perfectura: false,
    enfermeria: false,
    asesor: false,
    orientacion: false,
    controlEscolar: false,
  };
}

export { studentsDb, staffDb };
