import { createHmac, createHash, timingSafeEqual } from 'node:crypto';

export type Rol = 'admin' | 'empleado';

export const COOKIE_SESION = 'pr_session';
export const DURACION_SESION_SEG = 60 * 60 * 10; // 10 horas

const ROLES: readonly Rol[] = ['admin', 'empleado'];

function env(nombre: string): string {
  const valor = process.env[nombre] ?? ((import.meta as any).env ?? {})[nombre];
  return (valor ?? '').trim();
}

function secreto(): string | null {
  const s = env('SESSION_SECRET');
  // Un secreto corto se puede adivinar; mejor no aceptar ninguna sesión.
  return s.length >= 32 ? s : null;
}

function firmar(datos: string, clave: string): string {
  return createHmac('sha256', clave).update(datos).digest('base64url');
}

// Compara en tiempo constante para no filtrar información por la duración.
function iguales(a: string, b: string): boolean {
  const ha = createHash('sha256').update(a).digest();
  const hb = createHash('sha256').update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function crearSesion(rol: Rol): string | null {
  const clave = secreto();
  if (!clave) return null;
  const expira = Math.floor(Date.now() / 1000) + DURACION_SESION_SEG;
  const datos = `${rol}.${expira}`;
  return `${datos}.${firmar(datos, clave)}`;
}

export function verificarSesion(token: string | undefined): Rol | null {
  const clave = secreto();
  if (!clave || !token) return null;

  const partes = token.split('.');
  if (partes.length !== 3) return null;
  const [rol, expira, firma] = partes;

  if (!iguales(firma, firmar(`${rol}.${expira}`, clave))) return null;
  if (!ROLES.includes(rol as Rol)) return null;
  if (!/^\d+$/.test(expira) || Number(expira) < Math.floor(Date.now() / 1000)) return null;

  return rol as Rol;
}

// Las credenciales viven en variables de entorno, nunca en el código.
export function validarCredenciales(usuario: string, contrasena: string): Rol | null {
  const cuentas: { rol: Rol; usuario: string; contrasena: string }[] = [
    { rol: 'admin', usuario: env('POS_ADMIN_USER'), contrasena: env('POS_ADMIN_PASS') },
    { rol: 'empleado', usuario: env('POS_EMPLEADO_USER'), contrasena: env('POS_EMPLEADO_PASS') },
  ];

  for (const cuenta of cuentas) {
    if (!cuenta.usuario || !cuenta.contrasena) continue;
    const usuarioOk = iguales(usuario, cuenta.usuario.toLowerCase());
    const claveOk = iguales(contrasena, cuenta.contrasena);
    if (usuarioOk && claveOk) return cuenta.rol;
  }
  return null;
}

export function configuracionCompleta(): boolean {
  return Boolean(secreto() && env('POS_ADMIN_USER') && env('POS_ADMIN_PASS'));
}
