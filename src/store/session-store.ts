"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { findStudentByMatricula, getAllStudentMatriculas } from "@/lib/db";
import { initialLiberacionesForStudent } from "@/lib/mock";
import type { DepartmentKey, Liberaciones } from "@/lib/types";

export type StudentSession = {
  usuario: string;
  matricula: string;
  nombre?: string;
};

export type AdminSession = {
  nEmpleado: string;
  departamento: DepartmentKey;
  nombre?: string;
};

type SessionState = {
  student: StudentSession | null;
  admin: AdminSession | null;
  liberacionesByMatricula: Record<string, Liberaciones>;
  loginStudent: (usuario: string, matricula: string, nombre?: string) => void;
  logoutStudent: () => void;
  loginAdmin: (
    nEmpleado: string,
    departamento: DepartmentKey,
    nombre?: string
  ) => void;
  logoutAdmin: () => void;
  getLiberacionesForMatricula: (matricula: string) => Liberaciones | undefined;
  registerMatriculaIfKnown: (matricula: string) => boolean;
  liberarMatricula: (
    matricula: string,
    dept: DepartmentKey
  ) => "not_found" | "already" | "ok";
  resetDemoData: () => void;
};

function buildInitialMatriculaMap(): Record<string, Liberaciones> {
  const map: Record<string, Liberaciones> = {};
  for (const matricula of getAllStudentMatriculas()) {
    map[matricula] = initialLiberacionesForStudent(matricula);
  }
  return map;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      student: null,
      admin: null,
      liberacionesByMatricula: buildInitialMatriculaMap(),

      loginStudent: (usuario, matricula, nombre) =>
        set({ student: { usuario, matricula, nombre }, admin: null }),

      logoutStudent: () => set({ student: null }),

      loginAdmin: (nEmpleado, departamento, nombre) =>
        set({ admin: { nEmpleado, departamento, nombre }, student: null }),

      logoutAdmin: () => set({ admin: null }),

      getLiberacionesForMatricula: (matricula) =>
        get().liberacionesByMatricula[matricula],

      registerMatriculaIfKnown: (matricula: string) => {
        const student = findStudentByMatricula(matricula);
        if (!student) return false;
        const map = { ...get().liberacionesByMatricula };
        if (!map[matricula]) {
          map[matricula] = initialLiberacionesForStudent(matricula);
        }
        set({ liberacionesByMatricula: map });
        return true;
      },

      liberarMatricula: (matricula, dept) => {
        const map = { ...get().liberacionesByMatricula };
        const row = map[matricula];
        if (!row) return "not_found";
        if (row[dept]) return "already";
        map[matricula] = { ...row, [dept]: true };
        set({ liberacionesByMatricula: map });
        return "ok";
      },

      resetDemoData: () =>
        set({ liberacionesByMatricula: buildInitialMatriculaMap() }),
    }),
    {
      name: "lince-session",
      partialize: (s) => ({
        student: s.student,
        admin: s.admin,
        liberacionesByMatricula: s.liberacionesByMatricula,
      }),
      merge: (persisted, current) => {
        const p = persisted as Partial<SessionState> | undefined;
        const base = (current ?? {}) as SessionState;
        if (!p) return base;
        return {
          ...base,
          ...p,
          liberacionesByMatricula: {
            ...buildInitialMatriculaMap(),
            ...(p.liberacionesByMatricula ?? {}),
          },
        };
      },
    }
  )
);
