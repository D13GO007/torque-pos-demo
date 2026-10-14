# Torque POS

Punto de venta web para tiendas de repuestos de moto. Maneja inventario, ventas de contado y a crédito, cartera, clientes, facturas en PDF y estadísticas, con roles de administrador y empleado.

Nació como un sistema hecho para una tienda real de repuestos en Cali. Esta es una versión demo con una tienda ficticia, **Torque Repuestos**, y datos de prueba.

**Demo en vivo:** https://torque-pos-demo.vercel.app

| Rol | Usuario | Contraseña |
|---|---|---|
| Administrador | `demo` | `torque2026` |
| Empleado | `cajero` | `torque2026` |

La demo es de solo lectura: puedes recorrer todas las pantallas y armar ventas, pero nada se guarda.

## Qué hace

- **Ventas**: carrito con búsqueda por familia, descuentos por producto y descuento general por cliente, venta de contado, a crédito o como cotización, varios métodos de pago y factura en PDF.
- **Inventario**: productos con precio de costo y de venta, stock, imagen y control de qué aparece en el catálogo. Genera un catálogo en PDF agrupado por familia.
- **Cartera**: ventas a crédito pendientes, abonos con historial, fechas de vencimiento y reporte de cartera en PDF.
- **Historial**: todas las facturas y cotizaciones, con opción de reimprimir, convertir cotizaciones en venta o anular.
- **Clientes**: datos de contacto, documento y descuento general que se aplica solo en cada venta.
- **Estadísticas**: ventas del periodo, productos más vendidos y saldo por cobrar. Solo para administradores.

## Stack

- [Astro](https://astro.build) con renderizado en servidor y componentes de React
- [Supabase](https://supabase.com) (PostgreSQL) como base de datos
- Tailwind CSS
- jsPDF y React PDF para facturas, recibos y catálogos
- Desplegado en Vercel

## Decisiones técnicas

**Sesión firmada.** El login genera un token `rol.vencimiento.firma` firmado con HMAC-SHA256 y lo guarda en una cookie `httpOnly`. El middleware verifica la firma y el vencimiento en cada petición, así que la cookie no se puede falsificar ni editar a mano. Las credenciales viven en variables de entorno y se comparan en tiempo constante.

**Seguridad en la base de datos.** Todas las tablas tienen Row Level Security. En la demo, la clave pública solo tiene permiso de lectura, de modo que aunque alguien use la consola del navegador no puede modificar datos.

**Modo demo.** Con `PUBLIC_DEMO_MODE=true`, el cliente de Supabase intercepta las escrituras y responde con un aviso amable en lugar de un error, y el sitio muestra una franja indicando que es una demo. El mismo código corre en producción con el modo apagado.

**Historial fiel.** Cada venta guarda una copia del carrito y del detalle por producto. Si un precio cambia después, las facturas viejas siguen mostrando lo que realmente se cobró.

## Correr el proyecto

```bash
npm install
cp .env.example .env   # y llena los valores
npm run dev
```

El POS queda en `http://localhost:4321/pos/login`.

Variables necesarias (ver `.env.example`):

| Variable | Para qué |
|---|---|
| `PUBLIC_SUPABASE_URL` / `PUBLIC_SUPABASE_ANON_KEY` | Conexión a Supabase con la clave pública |
| `PUBLIC_DEMO_MODE` | `true` para el modo demo de solo lectura |
| `SESSION_SECRET` | Clave para firmar las sesiones, mínimo 32 caracteres |
| `POS_ADMIN_USER` / `POS_ADMIN_PASS` | Cuenta de administrador |
| `POS_EMPLEADO_USER` / `POS_EMPLEADO_PASS` | Cuenta de empleado |

## Estructura

```
src/
  middleware.ts      verificación de sesión, roles y franja de demo
  lib/session.ts     creación y verificación de sesiones firmadas
  lib/supabase.js    cliente de Supabase (con modo demo)
  lib/demo.js        bloqueo de escrituras en modo demo
  pages/pos/         pantallas del POS
  pos/ventas/        lógica del carrito, checkout, clientes y PDF
  components/        catálogo en PDF
```

---

Hecho por Diego Andrés Rodríguez Martínez · [GitHub](https://github.com/D13GO007)
