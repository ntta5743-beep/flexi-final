import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'رابط_السูปابيس_الخاص_بك'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'مفتاح_الـ_anon_الخاص_بك'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
