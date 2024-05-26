import { createClient } from "@/utils/supabase/client";
import { Gredica } from "@/types/database";
import { Posadena } from "@/types/database";
const supabase = createClient();

export const getGredice = async () => {
    const { data, error } = await supabase.from('gredica').select();
    if (error) {
      console.error('Error fetching gredica data:', error);
      return [];
    }
    return data;
  };


export const getGredicaById = async (id: number) => {
    const { data, error } = await supabase.from('gredica').select().eq('gredicaid', id).single();
    if (error) {
      console.error('Error fetching gredica data:', error);
      return null;
    }
    return data;
  }

export const updateGredica = async (gredica: Gredica) => {
    const { data, error } = await supabase.from('gredica').upsert(gredica);
    if (error) {
      console.error('Error updating gredica:', error);
      return null;
    }
    return data;
  }


export const getPosadeneForGredica = async (id: number) => {
    const { data, error } = await supabase.from('posadena').select().eq('gredicaid', id);
    if (error) {
      console.error('Error fetching posadena data:', error);
      return [];
    }
    return data;
  }

  // delete posadena biljka for gredica
export const deletePosadena = async (gredicaid: number, biljkaid: number) => {
    const { data, error } = await supabase.from('posadena').delete().eq('gredicaid', gredicaid).eq('biljkaid', biljkaid);
    if (error) {
      console.error('Error deleting posadena:', error);
      return null;
    }
    return data;
  }

  export const updatePosadena = async (posadena: Posadena) => {
    const { data, error } = await supabase.from('posadena').upsert(posadena);
    if (error) {
      console.error('Error updating posadena:', error);
      return null;
    }
    return data;
  }

  export const createPosadena = async (posadena: Posadena) => {
    const { data, error } = await supabase.from('posadena').insert([posadena]);
    if (error) {
      console.error('Error creating posadena:', error);
      return null;
    }
    return data;
  }