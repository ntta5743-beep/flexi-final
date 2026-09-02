import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://puqvjdrqefzhqavhryso.supabase.co'
const SUPABASE_KEY = 'sb_publishable_WHA1Rx2KQStqfIfy0j5vtw__0ra0pl_'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)