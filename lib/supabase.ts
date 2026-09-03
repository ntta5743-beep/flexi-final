import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://puqvjdrqefzhqavhryso.supabase.co';
const supabaseAnonKey = 'sb_publishable_WHA1Rx2KQStqfIfy0j5vtw__0ra0pl_';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
