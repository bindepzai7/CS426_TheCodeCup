import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { Platform } from 'react-native'

const supabaseUrl = 'https://fbzbfrzbfumbdnrgnnrb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiemJmcnpiZnVtYmRucmdubnJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwODUwNjIsImV4cCI6MjA2NjY2MTA2Mn0.32XFzXms8SNwWmkRtsb4KBZk7C62elMu5Z5NbG3J7YM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: Platform.OS === 'web'? undefined: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})