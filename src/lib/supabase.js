import { createClient } from '@supabase/supabase-js';
import { crearClienteDemo } from './demo-db.js';

export const MODO_DEMO = import.meta.env.PUBLIC_DEMO_MODE === 'true';

// En modo demo la app lee de los datos de prueba incluidos en el proyecto
// (src/lib/demo-datos.js) y no se conecta a Supabase. En producción usa la base real.
export const supabase = MODO_DEMO
  ? crearClienteDemo()
  : createClient(import.meta.env.PUBLIC_SUPABASE_URL, import.meta.env.PUBLIC_SUPABASE_ANON_KEY);
