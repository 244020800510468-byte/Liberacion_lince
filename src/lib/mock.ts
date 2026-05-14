import type { Liberaciones } from "@/lib/types";

/** Estudiante principal (demo CECYTEBC) */
export const mockStudent = {
  usuario: "244020800510468",
  nombre: "Estudiante CECYTEBC",
  contrasena: "test1234567",
  email: "244020800510468@cecytebc.edu.mx",
  matricula: "244020800510468",
  liberaciones: {
    biblioteca: false,
    perfectura: false,
    enfermeria: false,
    asesor: false,
    orientacion: false,
    controlEscolar: false,
  },
} as const;

/** Admin asesor (prefijo AS) */
export const mockAdmin = {
  nEmpleado: "AS244020800510468",
  contrasena: "1234",
  email: "admin@escuela.edu.mx",
} as const;

export const MOCK_RECOVERY_CODE = "123456";

export function getStudentByMatricula(matricula: string) {
  if (matricula === mockStudent.matricula) {
    return mockStudent;
  }
  return null;
}

export function initialLiberacionesForStudent(): Liberaciones {
  return { ...mockStudent.liberaciones };
}
