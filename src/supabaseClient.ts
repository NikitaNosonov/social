import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tvlfyjjmvnxnzxtrdxvb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2bGZ5amptdm54bnp4dHJkeHZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NzI3MzQsImV4cCI6MjA3MTQ0ODczNH0.eLDjvktASs9b9BxCAIyWbLn6s4Ts7mNot9k9qmU1-gc';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;