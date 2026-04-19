export const mockStudent = {
  usuario: "alumno01",
  contrasena: "test1234567",
  email: "lester.skibidi.sigma@gmail.com",
  matricula: "24402080157041",
  liberaciones: {
    biblioteca: false,
    perfectura: true,
    enfermeria: false,
    asesor: true,
    orientacion: false,
    controlEscolar: true,
  },
} as const;

export const mockAdmin = {
  nEmpleado: "ASMOH67",
  contrasena: "abc123",
  email: "admin@escuela.edu.mx",
} as const;

/** Código mock para flujos de recuperación (demo sin backend) */
export const MOCK_RECOVERY_CODE = "123456";
