export {
  findStaffByEmail,
  findStaffByEmpleado,
  findStudentByEmail,
  findStudentByMatricula,
  findStudentByUsuario,
  getAllStudentMatriculas,
  staffDb,
  studentsDb,
  type StaffRecord,
  type StudentRecord,
} from "./users-db";
export { hashPassword, verifyPassword } from "./password";
