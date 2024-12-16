import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';


const SUPABASE_URL = 'https://aliwihhifgdbtgnguzam.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsaXdpaGhpZmdkYnRnbmd1emFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyMDc1MzksImV4cCI6MjA0OTc4MzUzOX0.SUAZMgDiMoXf1xyJNHwWgAj7TR-l6nekzj0Q1TiPUwU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  constructor() { }

}
