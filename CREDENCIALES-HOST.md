# Liberación Lince — datos demo para despliegue (host)

Copia esta referencia en tu servidor o documentación interna. **No uses estas credenciales en producción**; son solo para la demo con base de datos mock y contraseñas hasheadas (scrypt).

## Estudiantes

| Usuario / Matrícula | Contraseña | Correo | Nombre |
|---------------------|------------|--------|--------|
| `244020800510468` | `test12345678901` | `244020800510468@cecytebc.edu.mx` | Estudiante CECYTEBC |
| `244020800510469` | `Estudiante2026!` | `244020800510469@cecytebc.edu.mx` | María González López |

> Las contraseñas deben tener **entre 15 y 18 caracteres**.

## Personal administrativo

| N. Empleado | Departamento | Contraseña | Correo |
|-------------|--------------|------------|--------|
| `AS244020800510468` | Asesor | `AdminPass123456` | `admin@escuela.edu.mx` |
| `BI244020800510001` | Biblioteca | `BiblioPass12345` | `biblioteca@escuela.edu.mx` |
| `PR244020800510002` | Perfectura | `PerfectPass1234` | `perfectura@escuela.edu.mx` |
| `EN244020800510003` | Enfermería | `AdminPass123456` | `enfermeria@escuela.edu.mx` |
| `OR244020800510004` | Orientación | `AdminPass123456` | `orientacion@escuela.edu.mx` |
| `CE244020800510005` | Control Escolar | `AdminPass123456` | `control@escuela.edu.mx` |

## Recuperación de cuenta (código demo)

| Uso | Valor |
|-----|--------|
| Código de verificación (estudiante y admin) | `123456` |

## Base de datos

Los usuarios están definidos en `src/lib/db/users-db.ts` con contraseñas **hasheadas** (scrypt). El login se valida en:

- `POST /api/auth/login/student`
- `POST /api/auth/login/admin`

## URLs útiles

| Descripción | Ruta |
|-------------|------|
| Inicio (roles) | `/` |
| Login estudiante | `/login/estudiante` |
| Login admin | `/login/admin` |
| Panel estudiante (liberaciones) | `/estudiante/status` |
| Vista previa estudiante (sin login) | `/estudiante/status?preview=1` |
| Panel asesor | `/admin/dashboard` |

## Comando de build / arranque

```bash
npm install
npm run build
npm start
```

Desarrollo local: `npm run dev` → [http://localhost:3000](http://localhost:3000)
