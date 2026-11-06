import { defineMiddleware } from 'astro:middleware';
import { COOKIE_SESION, verificarSesion } from './lib/session';

const RUTAS_PUBLICAS = ['/pos/login', '/pos/logout'];
const MODO_DEMO = import.meta.env.PUBLIC_DEMO_MODE === 'true';

// En el login el <body> es un flex centrado, así que ahí la franja va fija arriba
// para no quedar como un elemento más al lado de la tarjeta.
function franjaDemo(fija: boolean) {
  const posicion = fija ? 'position:fixed;left:0;right:0;top:0' : 'position:sticky;top:0';
  return `
<div id="franja-demo" style="${posicion};z-index:9999;background:#18181b;color:#fff;font:600 13px/1.4 system-ui,sans-serif;padding:8px 16px;text-align:center;border-bottom:3px solid #ea580c">
  <span style="color:#fb923c">DEMO</span> · Torque Repuestos es una tienda ficticia con datos de prueba. Puedes recorrer todo el sistema, pero los cambios no se guardan.
</div>`;
}

const CREDENCIALES_DEMO = `
<div style="margin-top:18px;border:1px solid rgba(251,146,60,.35);background:rgba(234,88,12,.08);border-radius:12px;padding:14px;font:500 13px/1.5 system-ui,sans-serif;color:#d1d5db">
  <div style="font-weight:700;color:#fb923c;font-size:11px;letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px">Acceso rápido a la demo</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
    <button type="button" data-demo-usuario="demo" style="cursor:pointer;border:1px solid rgba(255,255,255,.12);background:#1f2937;color:#f9fafb;border-radius:10px;padding:10px 8px;font:700 13px system-ui,sans-serif">Administrador<br><span style="font-weight:500;font-size:11px;color:#9ca3af">demo</span></button>
    <button type="button" data-demo-usuario="cajero" style="cursor:pointer;border:1px solid rgba(255,255,255,.12);background:#1f2937;color:#f9fafb;border-radius:10px;padding:10px 8px;font:700 13px system-ui,sans-serif">Empleado<br><span style="font-weight:500;font-size:11px;color:#9ca3af">cajero</span></button>
  </div>
  <div style="margin-top:10px;font-size:12px;color:#9ca3af;text-align:center">Contraseña de ambos: <code style="color:#fdba74">torque2026</code></div>
</div>
<script>
  document.querySelectorAll('[data-demo-usuario]').forEach(function (boton) {
    boton.addEventListener('click', function () {
      var usuario = document.getElementById('usuario');
      var clave = document.getElementById('contrasena');
      var form = document.getElementById('loginForm');
      if (!usuario || !clave || !form) return;
      usuario.value = boton.getAttribute('data-demo-usuario');
      clave.value = 'torque2026';
      form.requestSubmit ? form.requestSubmit() : form.submit();
    });
  });
</script>`;

const PIE_DEMO = 'Demo de portafolio · Desarrollado por Diego Andrés Rodríguez Martínez';

async function conFranjaDemo(respuesta: Response, esLogin: boolean): Promise<Response> {
  if (!MODO_DEMO) return respuesta;
  if (!(respuesta.headers.get('content-type') || '').includes('text/html')) return respuesta;

  let html = await respuesta.text();
  html = html.replace(/<body([^>]*)>/i, (m) => m + franjaDemo(esLogin));
  if (esLogin) {
    html = html.replace(/<\/form>/i, (m) => m + CREDENCIALES_DEMO);
    html = html.replace('Acceso restringido — Solo personal autorizado', PIE_DEMO);
  }

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
