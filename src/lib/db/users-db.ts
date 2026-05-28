import type { DepartmentKey, Liberaciones } from "@/lib/types";

export type StudentRecord = {
  id: string;
  usuario: string;
  matricula: string;
  nombre: string;
  email: string;
  passwordHash: string;
  liberaciones: Liberaciones;
};

export type StaffRecord = {
  id: string;
  nEmpleado: string;
  nombre: string;
  email: string;
  departamento: DepartmentKey;
  passwordHash: string;
};

const defaultLiberaciones = (): Liberaciones => ({
  biblioteca: false,
  perfectura: false,
  enfermeria: false,
  asesor: false,
  orientacion: false,
  controlEscolar: false,
});

/** Base de datos demo — contraseñas hasheadas con scrypt (ver CREDENCIALES-HOST.md) */
export const studentsDb: StudentRecord[] = [
  {
    id: "stu-1",
    usuario: "244020800510468",
    matricula: "244020800510468",
    nombre: "Estudiante CECYTEBC",
    email: "244020800510468@cecytebc.edu.mx",
    passwordHash:
      "3740adec82724a7005ccfd2be597ddf7496d03d0f6628f4f4b36c853ff100ad718f04f4990eeb35754ca2c40d7b37d46760d928c5245981abca7e074676391eb",
    liberaciones: defaultLiberaciones(),
  },
  {
    id: "stu-2",
    usuario: "244020800510469",
    matricula: "244020800510469",
    nombre: "María González López",
    email: "244020800510469@cecytebc.edu.mx",
    passwordHash:
      "c9c27943467f3737f477e70f623cf56d71d9984cd87593ca7065b4d325a9ffac2f313cd5c214fa97d7399c3d673e0c31da7e09f8fe7c081f022cd7b2f8470dc9",
    liberaciones: defaultLiberaciones(),
  },
];

export const staffDb: StaffRecord[] = [
  {
    id: "staff-asesor",
    nEmpleado: "AS244020800510468",
    nombre: "Asesor Demo",
    email: "admin@escuela.edu.mx",
    departamento: "asesor",
    passwordHash:
      "cbb3cb9724cce5569c3f98b68bf97535bd0cac67396aded99cd1a6b071029ecbff88b91209d860fe29a941d98eb267e8180b8bd9745e73fa4b715b6c4ec09845",
  },
  {
    id: "staff-biblio",
    nEmpleado: "BI244020800510001",
    nombre: "Personal Biblioteca",
    email: "biblioteca@escuela.edu.mx",
    departamento: "biblioteca",
    passwordHash:
      "038d44e0402a8b9bc1d01e48645564d396a806580af5815f5049d1b28c0110e78eed336716b9cfa18c646b4dfb2fe17b640d2fe2e6f8bbba225c8e8a365a1362",
  },
  {
    id: "staff-perfect",
    nEmpleado: "PR244020800510002",
    nombre: "Personal Perfectura",
    email: "perfectura@escuela.edu.mx",
    departamento: "perfectura",
    passwordHash:
      "3c5ba3d64edcaab10cb255df20a6194ef4ce5bf024833d56ad453d8e5dbd9666a30624f3a59a79b0b234945b2257f83ca6cd9eba1c58817635c7bc8dbe579184",
  },
  {
    id: "staff-enfermeria",
    nEmpleado: "EN244020800510003",
    nombre: "Personal Enfermería",
    email: "enfermeria@escuela.edu.mx",
    departamento: "enfermeria",
    passwordHash:
      "cbb3cb9724cce5569c3f98b68bf97535bd0cac67396aded99cd1a6b071029ecbff88b91209d860fe29a941d98eb267e8180b8bd9745e73fa4b715b6c4ec09845",
  },
  {
    id: "staff-orientacion",
    nEmpleado: "OR244020800510004",
    nombre: "Personal Orientación",
    email: "orientacion@escuela.edu.mx",
    departamento: "orientacion",
    passwordHash:
      "cbb3cb9724cce5569c3f98b68bf97535bd0cac67396aded99cd1a6b071029ecbff88b91209d860fe29a941d98eb267e8180b8bd9745e73fa4b715b6c4ec09845",
  },
  {
    id: "staff-control",
    nEmpleado: "CE244020800510005",
    nombre: "Personal Control Escolar",
    email: "control@escuela.edu.mx",
    departamento: "controlEscolar",
    passwordHash:
      "cbb3cb9724cce5569c3f98b68bf97535bd0cac67396aded99cd1a6b071029ecbff88b91209d860fe29a941d98eb267e8180b8bd9745e73fa4b715b6c4ec09845",
  },
];

export function findStudentByUsuario(usuario: string): StudentRecord | null {
  return studentsDb.find((s) => s.usuario === usuario.trim()) ?? null;
}

export function findStudentByMatricula(matricula: string): StudentRecord | null {
  return studentsDb.find((s) => s.matricula === matricula.trim()) ?? null;
}

export function findStudentByEmail(email: string): StudentRecord | null {
  const normalized = email.trim().toLowerCase();
  return studentsDb.find((s) => s.email.toLowerCase() === normalized) ?? null;
}

export function findStaffByEmpleado(nEmpleado: string): StaffRecord | null {
  return staffDb.find((s) => s.nEmpleado === nEmpleado.trim()) ?? null;
}

export function findStaffByEmail(email: string): StaffRecord | null {
  const normalized = email.trim().toLowerCase();
  return staffDb.find((s) => s.email.toLowerCase() === normalized) ?? null;
}

export function getAllStudentMatriculas(): string[] {
  return studentsDb.map((s) => s.matricula);
}
