import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fiimxzpfqcvnlfgkxcpx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpaW14enBmcWN2bmxmZ2t4Y3B4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE5Mzc4NDQsImV4cCI6MjAwNzUxMzg0NH0.A4Ert78s4oLYyVZOxTCBQ5I6x5lmI0RVrc1bTtU1geE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
