# Liberación Lince — datos demo para despliegue (host)

Copia esta referencia en tu servidor o documentación interna. **No uses estas credenciales en producción**; son solo para la demo mock sin backend.

## Estudiante

| Campo | Valor |
|--------|--------|
| Usuario | `244020800510468` |
| Contraseña | `test1234567` |
| Correo institucional | `244020800510468@cecytebc.edu.mx` |
| Matrícula | `244020800510468` |
| Nombre (mock) | Estudiante CECYTEBC |

## Admin / Asesor

| Campo | Valor |
|--------|--------|
| N. Empleado | `AS244020800510468` |
| Contraseña | `1234` |
| Prefijo | `AS` → rol Asesor |
| Correo (recuperación admin) | `admin@escuela.edu.mx` |

## Recuperación de cuenta (código demo)

| Uso | Valor |
|-----|--------|
| Código de verificación (estudiante y admin) | `123456` |

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
