export type DepartmentKey =
  | "biblioteca"
  | "perfectura"
  | "enfermeria"
  | "asesor"
  | "orientacion"
  | "controlEscolar";

export type Liberaciones = Record<DepartmentKey, boolean>;
