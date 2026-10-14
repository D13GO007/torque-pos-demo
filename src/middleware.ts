import { defineMiddleware } from 'astro:middleware';
import { COOKIE_SESION, verificarSesion } from './lib/session';

const RUTAS_PUBLICAS = ['/pos/login', '/pos/logout'];
const MODO_DEMO = import.meta.env.PUBLIC_DEMO_MODE === 'true';

const FRANJA_DEMO = `
<div id="franja-demo" style="position:sticky;top:0;z-index:9999;background:#18181b;color:#fff;font:600 13px/1.4 system-ui,sans-serif;padding:8px 16px;text-align:center;border-bottom:3px solid #ea580c">
  <span style="color:#fb923c">DEMO</span> · Torque Repuestos es una tienda ficticia con datos de prueba. Puedes recorrer todo el sistema, pero los cambios no se guardan.
</div>`;

const CREDENCIALES_DEMO = `
<div style="max-width:380px;margin:12px auto 0;background:#fff7ed;border:1px solid #fdba74;border-radius:10px;padding:10px 14px;font:500 13px/1.5 system-ui,sans-serif;color:#7c2d12">
  <strong>Usuarios de prueba</strong><br>
  Administrador: <code>demo</code> / <code>torque2026</code><br>
  Empleado: <code>cajero</code> / <code>torque2026</code>
</div>`;

async function conFranjaDemo(respuesta: Response, esLogin: boolean): Promise<Response> {
  if (!MODO_DEMO) return respuesta;
  if (!(respuesta.headers.get('content-type') || '').includes('text/html')) return respuesta;

  let html = await respuesta.text();
  html = html.replace(/<body([^>]*)>/i, (m) => m + FRANJA_DEMO);
  if (esLogin) html = html.replace(/<\/form>/i, (m) => m + CREDENCIALES_DEMO);

  const headers = new Headers(respuesta.headers);
  headers.delete('content-length');
  return new Response(html, { status: respuesta.status, statusText: respuesta.statusText, headers });
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Permitir rutas públicas y assets
  if (RUTAS_PUBLICAS.includes(pathname) || !pathname.startsWith('/pos')) {
    return conFranjaDemo(await next(), pathname === '/pos/login');
  }

  // La cookie solo vale si su firma es correcta y no ha expirado
  const role = verificarSesion(context.cookies.get(COOKIE_SESION)?.value);

  // Sin sesión válida → login
  if (!role) {
    context.cookies.delete(COOKIE_SESION, { path: '/' });
    return context.redirect('/pos/login');
  }

  // Empleados no pueden acceder a estadísticas
  if (role === 'empleado' && pathname.startsWith('/pos/estadisticas')) {
    return context.redirect('/pos/inicio');
  }

  context.locals.userRole = role;

  return conFranjaDemo(await next(), false);
});
