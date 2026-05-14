import type { DepartmentKey, Liberaciones } from "@/lib/types";

export type { DepartmentKey, Liberaciones };

export const EMPLEADO_PREFIX_TO_DEPT: Record<string, DepartmentKey> = {
  AS: "asesor",
  PR: "perfectura",
  BI: "biblioteca",
  EN: "enfermeria",
  OR: "orientacion",
  CE: "controlEscolar",
};

export const DEPARTMENT_LABELS: Record<DepartmentKey, string> = {
  biblioteca: "Biblioteca",
  perfectura: "Perfectura",
  enfermeria: "Enfermería",
  asesor: "Asesor",
  orientacion: "Orientación",
  controlEscolar: "Control Escolar",
};

export const DASHBOARD_DEPT_ORDER: { key: DepartmentKey; label: string }[] = [
  { key: "biblioteca", label: "Biblioteca" },
  { key: "perfectura", label: "Perfectura" },
  { key: "enfermeria", label: "Enfermería" },
  { key: "asesor", label: "Asesor" },
  { key: "orientacion", label: "Orientación" },
  { key: "controlEscolar", label: "Control Escolar" },
];

export function getDepartmentFromEmpleado(nEmpleado: string): DepartmentKey | null {
  const prefix = nEmpleado.slice(0, 2).toUpperCase();
  return EMPLEADO_PREFIX_TO_DEPT[prefix] ?? null;
}

export function getDepartmentDisplayName(key: DepartmentKey): string {
  return DEPARTMENT_LABELS[key];
}
