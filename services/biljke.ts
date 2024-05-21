import { createClient } from "@/utils/supabase/server";
const supabase = createClient();

export const getBiljke = async () => {
    const { data, error } = await supabase.from('biljka').select();
    if (error) {
      console.error('Error fetching biljka data:', error);
      return [];
    }
    return data;
  };