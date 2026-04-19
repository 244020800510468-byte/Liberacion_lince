"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockStudent } from "@/lib/mock";
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
  liberarMatricula: (
    matricula: string,
    dept: DepartmentKey
  ) => "not_found" | "already" | "ok";
  resetDemoData: () => void;
};

const initialLiberaciones: Liberaciones = {
  ...mockStudent.liberaciones,
};

function buildInitialMatriculaMap(): Record<string, Liberaciones> {
  return {
    [mockStudent.matricula]: { ...initialLiberaciones },
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
    }
  )
);
