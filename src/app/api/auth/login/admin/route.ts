import { NextResponse } from "next/server";
import { getDepartmentFromEmpleado } from "@/lib/departments";
import { findStaffByEmpleado, verifyPassword } from "@/lib/db";
import {
  getPasswordLengthError,
  isPasswordLengthValid,
} from "@/lib/password-validation";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      nEmpleado?: string;
      contrasena?: string;
    };

    const nEmpleado = body.nEmpleado?.trim() ?? "";
    const contrasena = body.contrasena ?? "";

    if (!nEmpleado || !contrasena) {
      return NextResponse.json(
        { error: "N. Empleado y contraseña son obligatorios." },
        { status: 400 }
      );
    }

    const lengthError = getPasswordLengthError(contrasena);
    if (!isPasswordLengthValid(contrasena)) {
      return NextResponse.json({ error: lengthError }, { status: 400 });
    }

    const dept = getDepartmentFromEmpleado(nEmpleado);
    const staff = findStaffByEmpleado(nEmpleado);

    if (!staff || !dept || staff.departamento !== dept) {
      return NextResponse.json(
        {
          error:
            "No se encontró coincidencia con el usuario que ingresó, Inténtelo de nuevo",
        },
        { status: 401 }
      );
    }

    if (!verifyPassword(contrasena, staff.passwordHash)) {
      return NextResponse.json(
        { error: "Contraseña incorrecta, Inténtelo de nuevo" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      nEmpleado: staff.nEmpleado,
      departamento: staff.departamento,
      nombre: staff.nombre,
      email: staff.email,
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo procesar el inicio de sesión." },
      { status: 500 }
    );
  }
}
