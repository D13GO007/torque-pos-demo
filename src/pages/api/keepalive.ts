import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase.js';

// Supabase pausa los proyectos gratuitos tras una semana sin actividad.
// Vercel llama esta ruta una vez al día (ver vercel.json) para mantener viva la base de la demo.
export const GET: APIRoute = async () => {
  const { error } = await supabase.from('referencias').select('id', { head: true, count: 'exact' }).limit(1);
  return new Response(JSON.stringify({ ok: !error }), {
    status: error ? 503 : 200,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
};
