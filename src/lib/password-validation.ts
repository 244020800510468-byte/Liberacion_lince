export const PASSWORD_MIN_LENGTH = 15;
export const PASSWORD_MAX_LENGTH = 18;

export const PASSWORD_LENGTH_HINT = `La contraseña debe tener entre ${PASSWORD_MIN_LENGTH} y ${PASSWORD_MAX_LENGTH} caracteres.`;

export function isPasswordLengthValid(password: string): boolean {
  const len = password.length;
  return len >= PASSWORD_MIN_LENGTH && len <= PASSWORD_MAX_LENGTH;
}

export function getPasswordLengthError(password: string): string | null {
  if (!password) return null;
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`;
  }
  if (password.length > PASSWORD_MAX_LENGTH) {
    return `La contraseña no puede exceder ${PASSWORD_MAX_LENGTH} caracteres.`;
  }
  return null;
}
