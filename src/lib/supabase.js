import { createClient } from '@supabase/supabase-js';
import { protegerModoDemo } from './demo.js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

const cliente = createClient(supabaseUrl, supabaseAnonKey);

export const MODO_DEMO = import.meta.env.PUBLIC_DEMO_MODE === 'true';
export const supabase = MODO_DEMO ? protegerModoDemo(cliente) : cliente;
