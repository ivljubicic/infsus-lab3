import { createClient } from "@/utils/supabase/client";
import { Lokacija } from "@/types/database";
const supabase = createClient();

export const getLokacije = async () => {
    const { data, error } = await supabase.from('lokacija').select();
    if (error) {
      console.error('Error fetching lokacija data:', error);
      return [];
    }
    return data;
  }
