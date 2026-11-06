// Cliente de base de datos para el modo demo.
// Imita la parte de la API de Supabase que usa el POS, pero responde desde los datos
// de prueba de demo-datos.js. Así la demo no depende de un proyecto de Supabase
// (que en el plan gratuito se pausa por inactividad) y las lecturas son instantáneas.
// Las escrituras (ventas, abonos, ediciones) se aplican solo en memoria: funcionan
// durante la visita y se pierden al recargar la página.

import * as datos from './demo-datos.js';

export const MENSAJE_DEMO = 'Modo demo: puedes recorrer todo el sistema, pero los cambios no se guardan.';

const TABLAS = {
  familias: datos.familias,
  referencias: datos.referencias,
  clientes: datos.clientes,
  ventas: datos.ventas,
  detalle_ventas: datos.detalle_ventas,
  historial_abonos: datos.historial_abonos,
};

const copiar = (valor) => (valor == null ? valor : JSON.parse(JSON.stringify(valor)));

function comparar(a, b) {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b), 'es', { numeric: true });
}

function convertir(valor) {
  if (valor === 'null') return null;
  if (valor === 'true') return true;
  if (valor === 'false') return false;
  if (valor !== '' && !Number.isNaN(Number(valor))) return Number(valor);
  return valor;
}

function patronIlike(patron) {
  const escapado = String(patron).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '.*').replace(/_/g, '.');
  return new RegExp(`^${escapado}$`, 'i');
}

function condicion(columna, operador, valor) {
  switch (operador) {
    case 'eq': return (fila) => fila[columna] == valor;
    case 'neq': return (fila) => fila[columna] != valor;
    case 'gt': return (fila) => comparar(fila[columna], valor) > 0;
    case 'gte': return (fila) => comparar(fila[columna], valor) >= 0;
    case 'lt': return (fila) => comparar(fila[columna], valor) < 0;
    case 'lte': return (fila) => comparar(fila[columna], valor) <= 0;
    case 'in': return (fila) => (valor || []).includes(fila[columna]);
    case 'is': return (fila) => (valor === null ? fila[columna] == null : fila[columna] === valor);
    case 'like':
    case 'ilike': {
      const re = patronIlike(valor);
      return (fila) => re.test(String(fila[columna] ?? ''));
    }
    default: return () => true;
  }
}

// Interpreta filtros tipo PostgREST: 'tipo_venta.eq.credito,estado.eq.pendiente'
function condicionOr(expresion) {
  const partes = String(expresion).split(',').map((p) => p.trim()).filter(Boolean);
  const condiciones = partes.map((parte) => {
    const [columna, operador, ...resto] = parte.split('.');
    const valor = resto.join('.');
    if (operador === 'in') {
      const lista = valor.replace(/^\(|\)$/g, '').split(',').map(convertir);
      return condicion(columna, 'in', lista);
    }
    return condicion(columna, operador, convertir(valor));
  });
  return (fila) => condiciones.some((c) => c(fila));
}

function respuesta(data, extra = {}) {
  return { data, error: null, count: extra.count ?? null, status: 200, statusText: 'OK' };
}

function respuestaDemo() {
  return { data: null, error: { message: MENSAJE_DEMO, code: 'DEMO' }, count: null, status: 403, statusText: 'Demo' };
}

class Consulta {
  constructor(tabla) {
    this.tabla = tabla;
    this.filtros = [];
    this.ordenes = [];
    this.limite = null;
    this.modo = 'lista';
    this.soloConteo = false;
    this.conteo = false;
    this.escritura = null;
  }

  insert(filas) { this.escritura = { tipo: 'insert', filas: [].concat(filas) }; return this; }
  upsert(filas) { this.escritura = { tipo: 'upsert', filas: [].concat(filas) }; return this; }
  update(cambios) { this.escritura = { tipo: 'update', cambios }; return this; }
  delete() { this.escritura = { tipo: 'delete' }; return this; }

  select(_columnas, opciones = {}) {
    if (opciones.head) this.soloConteo = true;
    if (opciones.count) this.conteo = true;
    return this;
  }

  eq(c, v) { this.filtros.push(condicion(c, 'eq', v)); return this; }
  neq(c, v) { this.filtros.push(condicion(c, 'neq', v)); return this; }
  gt(c, v) { this.filtros.push(condicion(c, 'gt', v)); return this; }
  gte(c, v) { this.filtros.push(condicion(c, 'gte', v)); return this; }
  lt(c, v) { this.filtros.push(condicion(c, 'lt', v)); return this; }
  lte(c, v) { this.filtros.push(condicion(c, 'lte', v)); return this; }
  in(c, v) { this.filtros.push(condicion(c, 'in', v)); return this; }
  is(c, v) { this.filtros.push(condicion(c, 'is', v)); return this; }
  like(c, v) { this.filtros.push(condicion(c, 'like', v)); return this; }
  ilike(c, v) { this.filtros.push(condicion(c, 'ilike', v)); return this; }
  match(objeto) { Object.entries(objeto || {}).forEach(([c, v]) => this.eq(c, v)); return this; }
  or(expresion) { this.filtros.push(condicionOr(expresion)); return this; }
  not(c, operador, v) {
    const cond = condicion(c, operador, v);
    this.filtros.push((fila) => !cond(fila));
    return this;
  }
  filter(c, operador, v) { this.filtros.push(condicion(c, operador, convertir(String(v)))); return this; }
  contains(c, v) {
    this.filtros.push((fila) => {
      const actual = fila[c];
      if (Array.isArray(actual)) return [].concat(v).every((x) => actual.includes(x));
      return false;
    });
    return this;
  }
  order(c, opciones = {}) { this.ordenes.push({ c, asc: opciones.ascending !== false }); return this; }
  limit(n) { this.limite = n; return this; }
  range(desde, hasta) { this.desde = desde; this.limite = hasta - desde + 1; return this; }
  single() { this.modo = 'uno'; return this; }
  maybeSingle() { this.modo = 'quizas'; return this; }

  aplicarEscritura() {
    const tabla = TABLAS[this.tabla] || (TABLAS[this.tabla] = []);
    const coincide = (fila) => this.filtros.every((f) => f(fila));
    let afectadas = [];
    const { tipo } = this.escritura;

    if (tipo === 'insert' || tipo === 'upsert') {
      for (const nueva of this.escritura.filas) {
        const existente = tipo === 'upsert' && nueva.id != null ? tabla.find((f) => f.id === nueva.id) : null;
        if (existente) {
          Object.assign(existente, copiar(nueva));
          afectadas.push(existente);
          continue;
        }
        const fila = { id: `demo-${Date.now()}-${(contador += 1)}`, ...copiar(nueva) };
        if (this.tabla === 'ventas' || this.tabla === 'historial_abonos') fila.fecha = fila.fecha || new Date().toISOString();
        tabla.push(fila);
        afectadas.push(fila);
      }
    } else if (tipo === 'update') {
      afectadas = tabla.filter(coincide);
      afectadas.forEach((fila) => Object.assign(fila, copiar(this.escritura.cambios)));
    } else if (tipo === 'delete') {
      afectadas = tabla.filter(coincide);
      for (const fila of afectadas) tabla.splice(tabla.indexOf(fila), 1);
    }

    if (this.modo === 'uno' || this.modo === 'quizas') return respuesta(afectadas.length ? copiar(afectadas[0]) : null);
    return respuesta(copiar(afectadas));
  }

  ejecutar() {
    if (this.escritura) return this.aplicarEscritura();

    let filas = (TABLAS[this.tabla] || []).filter((fila) => this.filtros.every((f) => f(fila)));
    const total = filas.length;
    if (this.ordenes.length) {
      filas = [...filas].sort((a, b) => {
        for (const { c, asc } of this.ordenes) {
          const r = comparar(a[c], b[c]);
          if (r !== 0) return asc ? r : -r;
        }
        return 0;
      });
    }
    if (this.desde) filas = filas.slice(this.desde);
    if (this.limite != null) filas = filas.slice(0, this.limite);

    if (this.soloConteo) return respuesta(null, { count: total });
    if (this.modo === 'uno') {
      if (filas.length !== 1) return { data: null, error: { message: 'No se encontró el registro', code: 'PGRST116' }, count: null, status: 406, statusText: 'Not Acceptable' };
      return respuesta(copiar(filas[0]));
    }
    if (this.modo === 'quizas') return respuesta(filas.length ? copiar(filas[0]) : null);
    return respuesta(copiar(filas), { count: this.conteo ? total : null });
  }

  then(resolver, rechazar) {
    return Promise.resolve().then(() => this.ejecutar()).then(resolver, rechazar);
  }
  catch(rechazar) { return this.then(undefined, rechazar); }
  finally(fn) { return this.then((v) => { fn?.(); return v; }, (e) => { fn?.(); throw e; }); }
}

let contador = 0;

function consultaDeTabla(tabla) {
  return new Consulta(tabla);
}

const storage = {
  from() {
    return {
      upload: async () => respuestaDemo(),
      update: async () => respuestaDemo(),
      remove: async () => respuestaDemo(),
      getPublicUrl: (ruta) => ({ data: { publicUrl: ruta ? `/productos/${ruta}` : '' } }),
    };
  },
};

export function crearClienteDemo() {
  return {
    from: (tabla) => consultaDeTabla(tabla),
    rpc: async () => respuestaDemo(),
    storage,
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
    },
  };
}
