// Modo demo: las lecturas funcionan normal y las escrituras se cortan antes de llegar
// a la base de datos con un mensaje claro. La base además tiene RLS de solo lectura,
// así que aunque alguien se salte esto desde la consola, no puede modificar nada.

export const MENSAJE_DEMO = 'Modo demo: puedes recorrer todo el sistema, pero los cambios no se guardan.';

const ESCRITURAS = new Set(['insert', 'update', 'upsert', 'delete']);

function resultadoDemo() {
  return { data: null, error: { message: MENSAJE_DEMO, code: 'DEMO' }, count: null, status: 403, statusText: 'Demo' };
}

// Devuelve un objeto que acepta cualquier encadenamiento (.eq, .select, .single...)
// y al esperarlo resuelve con el aviso de modo demo.
function consultaBloqueada() {
  const promesa = Promise.resolve(resultadoDemo());
  const proxy = new Proxy(function () {}, {
    get(_, prop) {
      if (prop === 'then') return promesa.then.bind(promesa);
      if (prop === 'catch') return promesa.catch.bind(promesa);
      if (prop === 'finally') return promesa.finally.bind(promesa);
      return () => proxy;
    },
    apply() {
      return proxy;
    },
  });
  return proxy;
}

function protegerTabla(builder) {
  return new Proxy(builder, {
    get(target, prop, receiver) {
      if (ESCRITURAS.has(prop)) return () => consultaBloqueada();
      const valor = Reflect.get(target, prop, receiver);
      return typeof valor === 'function' ? valor.bind(target) : valor;
    },
  });
}

function protegerStorage(storage) {
  return new Proxy(storage, {
    get(target, prop, receiver) {
      if (prop !== 'from') return Reflect.get(target, prop, receiver);
      return (bucket) => {
        const real = target.from(bucket);
        return new Proxy(real, {
          get(t, p, r) {
            if (['upload', 'update', 'remove', 'move', 'copy'].includes(p)) return async () => resultadoDemo();
            const v = Reflect.get(t, p, r);
            return typeof v === 'function' ? v.bind(t) : v;
          },
        });
      };
    },
  });
}

export function protegerModoDemo(cliente) {
  return new Proxy(cliente, {
    get(target, prop, receiver) {
      if (prop === 'from') return (tabla) => protegerTabla(target.from(tabla));
      if (prop === 'storage') return protegerStorage(target.storage);
      if (prop === 'rpc') return () => consultaBloqueada();
      const valor = Reflect.get(target, prop, receiver);
      return typeof valor === 'function' ? valor.bind(target) : valor;
    },
  });
}
