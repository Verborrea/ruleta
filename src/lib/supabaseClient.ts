import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://deyhiqniryfvuudhxgvr.supabase.co'; // Cambia por tu URL de Supabase
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRleWhpcW5pcnlmdnV1ZGh4Z3ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NTEzNzQsImV4cCI6MjA1MjUyNzM3NH0.Z2LhT_ms-W7WuTK0nnpR6qtu_5lIUJJvn8ILev7b9NI'; // Cambia por tu clave anon

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
