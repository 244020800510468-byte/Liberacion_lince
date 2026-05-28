import { scryptSync, timingSafeEqual } from "crypto";

const SALT = "lince-demo-salt-v1";

export function hashPassword(plain: string): string {
  return scryptSync(plain, SALT, 64).toString("hex");
}

export function verifyPassword(plain: string, hash: string): boolean {
  const candidate = scryptSync(plain, SALT, 64);
  const stored = Buffer.from(hash, "hex");
  if (candidate.length !== stored.length) return false;
  return timingSafeEqual(candidate, stored);
}
