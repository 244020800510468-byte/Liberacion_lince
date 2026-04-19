"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getStudentByMatricula,
  initialLiberacionesForStudent,
  mockStudent,
} from "@/lib/mock";
import type { DepartmentKey, Liberaciones } from "@/lib/types";

export type StudentSession = {
  usuario: string;
  matricula: string;
};

export type AdminSession = {
  nEmpleado: string;
  departamento: DepartmentKey;
};

type SessionState = {
  student: StudentSession | null;
  admin: AdminSession | null;
  liberacionesByMatricula: Record<string, Liberaciones>;
  loginStudent: (usuario: string, matricula: string) => void;
  logoutStudent: () => void;
  loginAdmin: (nEmpleado: string, departamento: DepartmentKey) => void;
  logoutAdmin: () => void;
  getLiberacionesForMatricula: (matricula: string) => Liberaciones | undefined;
  /** Si la matrícula existe en el mock y no está en el mapa, la registra. Devuelve false si no existe en demo. */
  registerMatriculaIfKnown: (matricula: string) => boolean;
  liberarMatricula: (
    matricula: string,
    dept: DepartmentKey
  ) => "not_found" | "already" | "ok";
  resetDemoData: () => void;
};

function buildInitialMatriculaMap(): Record<string, Liberaciones> {
  return {
    [mockStudent.matricula]: initialLiberacionesForStudent(),
  };
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      student: null,
      admin: null,
      liberacionesByMatricula: buildInitialMatriculaMap(),

      loginStudent: (usuario, matricula) =>
        set({ student: { usuario, matricula }, admin: null }),

      logoutStudent: () => set({ student: null }),

      loginAdmin: (nEmpleado, departamento) =>
        set({ admin: { nEmpleado, departamento }, student: null }),

      logoutAdmin: () => set({ admin: null }),

      getLiberacionesForMatricula: (matricula) =>
        get().liberacionesByMatricula[matricula],

      registerMatriculaIfKnown: (matricula: string) => {
        const student = getStudentByMatricula(matricula);
        if (!student) return false;
        const map = { ...get().liberacionesByMatricula };
        if (!map[matricula]) {
          map[matricula] = initialLiberacionesForStudent();
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
