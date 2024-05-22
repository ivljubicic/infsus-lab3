import { createClient } from "@/utils/supabase/client";
import { Vrtlar } from "@/types/database";
const supabase = createClient();

export const getVrtlarById = async (id: number) => {
    const { data, error } = await supabase.from('vrtlar').select().eq('vrtlarid', id).single();
    if (error) {
      console.error('Error fetching vrtlar data:', error);
      return [];
    }
    return data;
  };