import { NextResponse } from "next/server";
import { findStudentByUsuario, verifyPassword } from "@/lib/db";
import {
  getPasswordLengthError,
  isPasswordLengthValid,
} from "@/lib/password-validation";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      usuario?: string;
      contrasena?: string;
    };

    const usuario = body.usuario?.trim() ?? "";
    const contrasena = body.contrasena ?? "";

    if (!usuario || !contrasena) {
      return NextResponse.json(
        { error: "Usuario y contraseña son obligatorios." },
        { status: 400 }
      );
    }

    const lengthError = getPasswordLengthError(contrasena);
    if (!isPasswordLengthValid(contrasena)) {
      return NextResponse.json({ error: lengthError }, { status: 400 });
    }

    const student = findStudentByUsuario(usuario);
    if (!student || !verifyPassword(contrasena, student.passwordHash)) {
      return NextResponse.json(
        { error: "Usuario o contraseña incorrectos." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      usuario: student.usuario,
      matricula: student.matricula,
      nombre: student.nombre,
      email: student.email,
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo procesar el inicio de sesión." },
      { status: 500 }
    );
  }
}
