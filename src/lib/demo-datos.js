// Datos de prueba de la demo. Todo es ficticio: la tienda, los clientes y las ventas.
// Las ventas se generan con fechas relativas a hoy para que el inicio, el historial
// y las estadísticas siempre muestren movimiento reciente.

export const familias = [
  { id: 'f-frenos', nombre: 'Frenos' },
  { id: 'f-motor', nombre: 'Motor' },
  { id: 'f-clutch', nombre: 'Clutch y transmisión' },
  { id: 'f-electrico', nombre: 'Eléctrico' },
  { id: 'f-direccion', nombre: 'Dirección y ejes' },
  { id: 'f-cables', nombre: 'Cables' },
  { id: 'f-accesorios', nombre: 'Accesorios y carrocería' },
];

// [imagen, modelo, familia, precio de venta]
const CATALOGO = [
  ['pastilla-freno-akt-110s.jpg', 'Pastilla de freno AKT 110S', 'f-frenos', 18000],
  ['pastilla-freno-akt-125-flex.jpg', 'Pastilla de freno AKT 125 Flex', 'f-frenos', 18000],
  ['pastilla-freno-apache-180.jpg', 'Pastilla de freno Apache 180', 'f-frenos', 26000],
  ['pastilla-freno-best-125.jpg', 'Pastilla de freno Best 125', 'f-frenos', 18000],
  ['pastilla-freno-cb-125f.jpg', 'Pastilla de freno CB 125F', 'f-frenos', 22000],
  ['pastilla-freno-cbf-150.jpg', 'Pastilla de freno CBF 150', 'f-frenos', 24000],
  ['pastilla-freno-crypton-t-115-fi.jpg', 'Pastilla de freno Crypton T115 FI', 'f-frenos', 22000],
  ['pastilla-freno-dr-150.jpg', 'Pastilla de freno DR 150', 'f-frenos', 24000],
  ['pastilla-freno-invicta.jpg', 'Pastilla de freno Invicta', 'f-frenos', 20000],
  ['pastilla-freno-pulsar-135ls.jpg', 'Pastilla de freno Pulsar 135 LS', 'f-frenos', 22000],
  ['pastilla-freno-pulsar-200ns.jpg', 'Pastilla de freno Pulsar 200 NS', 'f-frenos', 32000],
  ['pastilla-freno-triller-150.jpg', 'Pastilla de freno Triller 150', 'f-frenos', 22000],
  ['pastilla-freno-vivar-115.jpg', 'Pastilla de freno Viva R 115', 'f-frenos', 20000],
  ['pastilla-freno-xr-150l.jpg', 'Pastilla de freno XR 150L', 'f-frenos', 24000],
  ['pastilla-freno-xtz-125e.jpg', 'Pastilla de freno XTZ 125E', 'f-frenos', 24000],
  ['pastilla-freno-xtz-150.jpg', 'Pastilla de freno XTZ 150', 'f-frenos', 26000],
  ['pastilla-freno-xtz250.jpg', 'Pastilla de freno XTZ 250', 'f-frenos', 34000],
  ['pastilla-freno-ybr-125.jpg', 'Pastilla de freno YBR 125', 'f-frenos', 22000],
  ['banda-de-freno-delantero-eso-delux.jpg', 'Banda de freno delantera Eco Deluxe', 'f-frenos', 22000],
  ['banda-de-freno-discover-125.jpg', 'Banda de freno Discover 125', 'f-frenos', 24000],
  ['banda-de-freno-eco-delux.jpg', 'Banda de freno Eco Deluxe', 'f-frenos', 22000],
  ['bomba-de-freno-delantero-akt-110s.jpg', 'Bomba de freno delantera AKT 110S', 'f-frenos', 68000],
  ['bomba-de-freno-delantero-pulsar-135-ls.jpg', 'Bomba de freno delantera Pulsar 135 LS', 'f-frenos', 85000],
  ['bomba-de-freno-delantero-universal.jpg', 'Bomba de freno delantera universal', 'f-frenos', 62000],
  ['disco-de-freno-trasero-pulsar-200ns.jpg', 'Disco de freno trasero Pulsar 200 NS', 'f-frenos', 135000],
  ['disco-freno-delantero-akt-ttr-125.jpg', 'Disco de freno delantero AKT TTR 125', 'f-frenos', 98000],
  ['disco-freno-delantero-dr-150.jpg', 'Disco de freno delantero DR 150', 'f-frenos', 105000],
  ['disco-freno-delantero-nkd-125.jpg', 'Disco de freno delantero NKD 125', 'f-frenos', 95000],
  ['disco-freno-delantero-xtz-125e.jpg', 'Disco de freno delantero XTZ 125E', 'f-frenos', 110000],
  ['kit-cilindro-cb-110.jpg', 'Kit de cilindro CB 110', 'f-motor', 185000],
  ['kit-cilindro-cb-125f.jpg', 'Kit de cilindro CB 125F', 'f-motor', 210000],
  ['kit-cilindro-eco-delux.jpg', 'Kit de cilindro Eco Deluxe', 'f-motor', 175000],
  ['kit-cilindro-xr-150l.jpg', 'Kit de cilindro XR 150L', 'f-motor', 245000],
  ['kit-cilindro-xtz-125.jpg', 'Kit de cilindro XTZ 125', 'f-motor', 230000],
  ['carburador-akt-100s.jpg', 'Carburador AKT 100S', 'f-motor', 98000],
  ['carburador-akt-nkd.jpg', 'Carburador AKT NKD', 'f-motor', 105000],
  ['carburador-boxer-ct-100.jpg', 'Carburador Boxer CT 100', 'f-motor', 110000],
  ['carburador-eco-delux.jpg', 'Carburador Eco Deluxe', 'f-motor', 102000],
  ['cadenilla-cb100.png', 'Cadenilla CB 100', 'f-motor', 28000],
  ['cadenilla-cb125.png', 'Cadenilla CB 125', 'f-motor', 32000],
  ['kit-cadenilla.png', 'Kit de cadenilla', 'f-motor', 58000],
  ['balineras.png', 'Balineras', 'f-motor', 9000],
  ['disc-cluctch-best.jpg', 'Discos de clutch Best', 'f-clutch', 42000],
  ['disc-cluctch-pulsar135.jpg', 'Discos de clutch Pulsar 135', 'f-clutch', 48000],
  ['disc-clutch-akt11o.jpg', 'Discos de clutch AKT 110', 'f-clutch', 38000],
  ['disc-clutch-boxer.jpg', 'Discos de clutch Boxer', 'f-clutch', 40000],
  ['disc-clutch-cb110.jpg', 'Discos de clutch CB 110', 'f-clutch', 38000],
  ['disc-clutch-fz.jpg', 'Discos de clutch FZ', 'f-clutch', 52000],
  ['disc-clutch-gn.jpg', 'Discos de clutch GN', 'f-clutch', 45000],
  ['prensa-cb110.jpg', 'Prensa de clutch CB 110', 'f-clutch', 55000],
  ['prensa-cb125.jpg', 'Prensa de clutch CB 125', 'f-clutch', 58000],
  ['prensa-cb150.jpg', 'Prensa de clutch CB 150', 'f-clutch', 64000],
  ['prensa-dr.jpg', 'Prensa de clutch DR', 'f-clutch', 62000],
  ['prensa-tvs.jpg', 'Prensa de clutch TVS', 'f-clutch', 56000],
  ['prensa-xtz.jpg', 'Prensa de clutch XTZ', 'f-clutch', 66000],
  ['automatico-completo-agility-125-rs.jpg', 'Automático completo Agility 125 RS', 'f-clutch', 165000],
  ['automatico-completo-bws-125.jpg', 'Automático completo BWS 125', 'f-clutch', 175000],
  ['bobina-alta-cb-110.jpg', 'Bobina de alta CB 110', 'f-electrico', 32000],
  ['bobina-alta-eco-delux.jpg', 'Bobina de alta Eco Deluxe', 'f-electrico', 30000],
  ['plato-bobina.png', 'Plato de bobinas', 'f-electrico', 88000],
  ['cdi.png', 'CDI', 'f-electrico', 45000],
  ['commando-cb110.jpg', 'Comando de luces CB 110', 'f-electrico', 48000],
  ['commando-eco.jpg', 'Comando de luces Eco Deluxe', 'f-electrico', 45000],
  ['commando-nkd.jpg', 'Comando de luces NKD', 'f-electrico', 46000],
  ['commando-r-tvs-100es.jpg', 'Comando derecho TVS 100 ES', 'f-electrico', 52000],
  ['relay-eco.png', 'Relay Eco Deluxe', 'f-electrico', 16000],
  ['relay-universal.png', 'Relay universal', 'f-electrico', 14000],
  ['reg-akt-110.png', 'Regulador AKT 110', 'f-electrico', 38000],
  ['reg-nkd.png', 'Regulador NKD', 'f-electrico', 38000],
  ['flasher.png', 'Flasher', 'f-electrico', 12000],
  ['pito.png', 'Pito', 'f-electrico', 15000],
  ['motoled.jpg', 'Bombillo LED', 'f-electrico', 25000],
  ['sw-cb110.png', 'Suiche de encendido CB 110', 'f-electrico', 42000],
  ['sw-cb125.png', 'Suiche de encendido CB 125', 'f-electrico', 44000],
  ['sw-dr.png', 'Suiche de encendido DR', 'f-electrico', 42000],
  ['sw-eco.png', 'Suiche de encendido Eco Deluxe', 'f-electrico', 38000],
  ['sw-tvs.png', 'Suiche de encendido TVS', 'f-electrico', 40000],
  ['sw-vivar.png', 'Suiche de encendido Viva R', 'f-electrico', 40000],
  ['dire-cb110.png', 'Kit de dirección CB 110', 'f-direccion', 45000],
  ['dire-esplendor.png', 'Kit de dirección Splendor', 'f-direccion', 42000],
  ['dire-nkd.png', 'Kit de dirección NKD', 'f-direccion', 45000],
  ['dire-tvs.png', 'Kit de dirección TVS', 'f-direccion', 44000],
  ['dire-xtz.png', 'Kit de dirección XTZ', 'f-direccion', 52000],
  ['eje-trasero-cb-110.jpg', 'Eje trasero CB 110', 'f-direccion', 22000],
  ['eje-trasero-discover-100.jpg', 'Eje trasero Discover 100', 'f-direccion', 22000],
  ['eje-trasero-dream-neo-100.jpg', 'Eje trasero Dream Neo 100', 'f-direccion', 22000],
  ['eje-trasero-eco-delux.jpg', 'Eje trasero Eco Deluxe', 'f-direccion', 22000],
  ['eje-trasero-xr-150l.jpg', 'Eje trasero XR 150L', 'f-direccion', 26000],
  ['cbl-clutch.png', 'Cable de clutch universal', 'f-cables', 14000],
  ['cbl-dr.png', 'Cable de clutch DR', 'f-cables', 16000],
  ['cbl-xr.png', 'Cable de clutch XR', 'f-cables', 16000],
  ['cbl-biwis.png', 'Cable de freno BWS', 'f-cables', 18000],
  ['espejo-discover.jpg', 'Espejo Discover', 'f-accesorios', 18000],
  ['espejo-eco-delux.jpg', 'Espejo Eco Deluxe', 'f-accesorios', 18000],
  ['espejo-vivar--115.jpg', 'Espejo Viva R 115', 'f-accesorios', 19000],
  ['espejo-xr.jpg', 'Espejo XR', 'f-accesorios', 20000],
  ['espejo-xtz.jpg', 'Espejo XTZ', 'f-accesorios', 22000],
  ['espejp-cb110.png', 'Espejo CB 110', 'f-accesorios', 18000],
  ['tapa-gasolina-akt-nkd.jpg', 'Tapa de gasolina AKT NKD', 'f-accesorios', 45000],
  ['tapa-gasolina-honda-eco-delux.jpg', 'Tapa de gasolina Eco Deluxe', 'f-accesorios', 42000],
  ['mango-azul.png', 'Mango azul', 'f-accesorios', 15000],
  ['mango-morado.png', 'Mango morado', 'f-accesorios', 15000],
  ['mango-plateado.png', 'Mango plateado', 'f-accesorios', 15000],
  ['sillin.png', 'Sillín', 'f-accesorios', 120000],
  ['calapies.png', 'Calapiés', 'f-accesorios', 35000],
  ['capuchon.png', 'Capuchón de bujía', 'f-accesorios', 8000],
];

// Generador pseudoaleatorio con semilla: los datos son los mismos en cada carga.
function generador(semilla) {
  let s = semilla >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const azar = generador(20261106);
const entre = (min, max) => Math.floor(azar() * (max - min + 1)) + min;
const elegir = (lista) => lista[Math.floor(azar() * lista.length)];

export const referencias = CATALOGO.map(([imagen, modelo, familiaId, precio], i) => {
  const familia = familias.find((f) => f.id === familiaId);
  // Unas pocas referencias quedan con stock bajo para que aparezcan alertas.
  const stock = i % 17 === 3 ? entre(1, 3) : entre(5, 28);
  return {
    id: `ref-${String(i + 1).padStart(3, '0')}`,
    modelo,
    familia_id: familiaId,
    familias: familia ? { id: familia.id, nombre: familia.nombre } : null,
    precio_venta: precio,
    precio_costo: Math.round((precio * 0.62) / 100) * 100,
    stock_actual: stock,
    activo: true,
    visible_en_catalogo: i % 9 !== 0,
    imagen_especifica: `/productos/${imagen}`,
  };
});

export const clientes = [
  ['Taller Moto Express', '3104582214', 'Cali', 'Cra 15 # 34-21', 'NIT', '901452338', 5],
  ['Andrés Felipe Ocampo', '3157841230', 'Cali', 'Cl 44 # 8-60', 'CC', '1144032187', 0],
  ['Repuestos La 70', '3013365478', 'Palmira', 'Cl 31 # 27-14', 'NIT', '900874512', 8],
  ['Marcela Quintana', '3206674512', 'Jamundí', 'Cra 10 # 5-33', 'CC', '29874563', 0],
  ['Moto Servicio El Paisa', '3128890145', 'Yumbo', 'Cl 6 # 4-12', 'NIT', '901233478', 5],
  ['Jhon Edwar Mina', '3175523098', 'Cali', 'Cra 39 # 12B-40', 'CC', '1107845123', 0],
  ['Domicilios Rápidos SAS', '3045512367', 'Cali', 'Av 3N # 23-45', 'NIT', '901667854', 10],
  ['Luisa Fernanda Rojas', '3189045621', 'Candelaria', 'Cl 9 # 11-08', 'CC', '1113654789', 0],
  ['Taller Los Mecánicos', '3112234590', 'Palmira', 'Cra 28 # 40-02', 'NIT', '900512348', 5],
  ['Carlos Mario Valencia', '3168872341', 'Cali', 'Cl 72 # 26P-15', 'CC', '16789234', 0],
].map(([nombre, telefono, ciudad, direccion, tipo_documento, documento, descuento_general], i) => ({
  id: `cli-${String(i + 1).padStart(2, '0')}`,
  nombre,
  telefono,
  ciudad,
  direccion,
  tipo_documento,
  documento,
  correo: '',
  descuento_general,
}));

function construirVentas() {
  const ventas = [];
  const abonos = [];
  const ahora = new Date();
  let numero = 1000;

  const crearVenta = (fecha, opciones = {}) => {
    const items = [];
    const cantidadItems = entre(1, 4);
    for (let k = 0; k < cantidadItems; k++) {
      const ref = elegir(referencias);
      if (items.some((it) => it.id === ref.id)) continue;
      const cantidad = entre(1, 3) === 3 ? 2 : 1;
      items.push({
        id: ref.id,
        modelo: ref.modelo,
        familia: ref.familias?.nombre || '',
        precio: ref.precio_venta,
        cantidad,
        stockMaximo: ref.stock_actual,
        descuentoTotal: entre(1, 6) === 6 ? 2000 * cantidad : 0,
      });
    }
    const subtotal = items.reduce((s, it) => s + it.precio * it.cantidad, 0);
    const descuentos = items.reduce((s, it) => s + it.descuentoTotal, 0);
    const cliente = opciones.cliente || (entre(1, 3) === 1 ? null : elegir(clientes));
    const descuentoGlobal = cliente?.descuento_general ? Math.round(((subtotal - descuentos) * cliente.descuento_general) / 100 / 100) * 100 : 0;
    const totalNeto = subtotal - descuentos - descuentoGlobal;
    const tipo = opciones.tipo || 'todo';
    const estado = tipo === 'cotizacion' ? 'cotizacion' : tipo === 'credito' || tipo === 'abono' ? 'pendiente' : 'completada';
    const recibido = tipo === 'cotizacion' ? 0 : tipo === 'credito' ? 0 : tipo === 'abono' ? Math.round(totalNeto * 0.4 / 1000) * 1000 : totalNeto;
    const vencimiento = new Date(fecha);
    vencimiento.setDate(vencimiento.getDate() + 30);

    const venta = {
      id: `ven-${numero}`,
      numero_factura: tipo === 'cotizacion' ? null : ++numero,
      fecha: fecha.toISOString(),
      cliente_nombre: cliente ? cliente.nombre : 'Cliente mostrador',
      cliente_telefono: cliente ? cliente.telefono : '',
      ciudad_cliente: cliente ? cliente.ciudad : '',
      subtotal,
      descuento_global: descuentoGlobal,
      total_neto: totalNeto,
      total: totalNeto,
      monto_recibido: recibido,
      tipo_venta: tipo,
      metodo_pago: tipo === 'cotizacion' ? 'N/A' : elegir(['efectivo', 'efectivo', 'nequi']),
      estado: opciones.estado || estado,
      fecha_vencimiento: tipo === 'credito' || tipo === 'abono' ? vencimiento.toISOString().slice(0, 10) : null,
      snapshot_carrito: items,
    };
    if (tipo === 'cotizacion') venta.id = `cot-${ventas.length + 1}`;
    ventas.push(venta);

    if (recibido > 0 && tipo === 'abono') {
      abonos.push({ id: `abo-${abonos.length + 1}`, venta_id: venta.id, monto: recibido, fecha: venta.fecha, metodo_pago: venta.metodo_pago });
    }
    return venta;
  };

  // Últimos 45 días, de lo más viejo a lo más reciente
  for (let dia = 45; dia >= 1; dia--) {
    const ventasDelDia = entre(1, 4);
    for (let v = 0; v < ventasDelDia; v++) {
      const fecha = new Date(ahora);
      fecha.setDate(fecha.getDate() - dia);
      fecha.setHours(entre(8, 18), entre(0, 59), 0, 0);
      const r = azar();
      const tipo = r < 0.1 ? 'credito' : r < 0.17 ? 'abono' : r < 0.22 ? 'cotizacion' : 'todo';
      const opciones = { tipo };
      if (tipo === 'credito' || tipo === 'abono') opciones.cliente = elegir(clientes.filter((c) => c.tipo_documento === 'NIT'));
      const venta = crearVenta(fecha, opciones);
      // Algunos créditos viejos ya tienen abonos posteriores
      if ((tipo === 'credito' || tipo === 'abono') && dia > 12 && azar() < 0.6) {
        const fechaAbono = new Date(fecha);
        fechaAbono.setDate(fechaAbono.getDate() + entre(5, 10));
        const monto = Math.round((venta.total_neto - venta.monto_recibido) * 0.5 / 1000) * 1000;
        abonos.push({ id: `abo-${abonos.length + 1}`, venta_id: venta.id, monto, fecha: fechaAbono.toISOString(), metodo_pago: 'efectivo' });
        venta.monto_recibido += monto;
      }
    }
  }
  // Una factura anulada para que el historial muestre ese estado
  const anulable = ventas.find((v) => v.estado === 'completada');
  if (anulable) anulable.estado = 'anulada';

  // Ventas de hoy, antes de la hora actual
  const inicioDia = new Date(ahora);
  inicioDia.setHours(0, 0, 0, 0);
  for (let v = 1; v <= 3; v++) {
    const fecha = new Date(ahora.getTime() - v * 47 * 60 * 1000);
    crearVenta(fecha < inicioDia ? new Date(inicioDia.getTime() + v * 60 * 1000) : fecha);
  }

  return { ventas, abonos };
}

const generadas = construirVentas();
export const ventas = generadas.ventas;
export const historial_abonos = generadas.abonos;

export const detalle_ventas = ventas.flatMap((venta) =>
  (venta.snapshot_carrito || []).map((item, i) => ({
    id: `${venta.id}-d${i + 1}`,
    venta_id: venta.id,
    referencia_id: item.id,
    cantidad: item.cantidad,
    precio_unitario: item.precio,
    descuento: item.descuentoTotal,
  })),
);
