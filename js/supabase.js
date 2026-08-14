import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL =
    "https://vjodwscawdrwaxdubvug.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqb2R3c2Nhd2Ryd2F4ZHVidnVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyNDA2NjAsImV4cCI6MjEwMTgxNjY2MH0.-H8XPObhZQ3dQT_n7jhm1c0Fe990TWtkCacGdjUz5d4"

window.supabaseClient = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);