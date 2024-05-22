import { createClient } from "@/utils/supabase/client";
import { Biljka } from "@/types/database";
const supabase = createClient();

export const getBiljke = async () => {
    const { data, error } = await supabase.from('biljka').select();
    if (error) {
      console.error('Error fetching biljka data:', error);
      return [];
    }
    return data;
  };

export const getBiljkaById = async (id: number) => {
    const { data, error } = await supabase.from('biljka').select().eq('biljkaid', id).single();
    if (error) {
      console.error('Error fetching biljka data:', error);
      return null;
    }
    return data;
  }

  export const createBiljka = async (formData: {
    naziv: string;
    osuncanje: string;
    phtla: string;
    vrijemebranja: string;
    vrijemesadnje: string;
    vlaznost: string;
    vrtlarid: string;
    image_url: string;
  }) => {
    const { data, error } = await supabase.from('biljka').insert([
      {
        naziv: formData.naziv,
        osuncanje: parseInt(formData.osuncanje),
        phtla: parseInt(formData.phtla),
        vrijemebranja: new Date(formData.vrijemebranja),
        vrijemesadnje: new Date(formData.vrijemesadnje),
        vlaznost: parseInt(formData.vlaznost),
        vrtlarid: parseInt(formData.vrtlarid),
      },
    ]);
    if (error) {
      console.error('Error creating biljka:', error);
      return { data: null, error };
    }
    return { data: data ? data[0] : null, error: null };
  };
  
  // Update an existing biljka
  export const updateBiljka = async (id: number, updatedBiljka: Partial<Biljka>) => {
    const { data, error } = await supabase.from('biljka').update(updatedBiljka).eq('biljkaid', id);
    if (error) {
      console.error('Error updating biljka:', error);
      return { data: null, error };
    }
    return { data: data ? data[0] : null, error: null };
  };
  
  // Delete a biljka
  export const deleteBiljka = async (id: number) => {
    const { data, error } = await supabase.from('biljka').delete().eq('biljkaid', id);
    if (error) {
      console.error('Error deleting biljka:', error);
      return { data: null, error };
    }
    return { data: null, error: null };
  };