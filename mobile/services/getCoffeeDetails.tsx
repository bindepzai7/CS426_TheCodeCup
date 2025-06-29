import { supabase } from '../lib/supabase';

type Coffee = {
  id: number;
  created_at: string;
  name: string;
  price: number;
  image_url: string;
};

export async function getCoffeeDetails(coffeeId: string): Promise<Coffee> {
  try {
    const { data, error } = await supabase
      .from('coffees')
      .select('*')
      .eq('id', coffeeId)
      .single();

    if (error) throw error;

    return data as Coffee;
  } catch (error) {
    console.error('Error fetching coffee details:', error);
    throw new Error('Could not fetch coffee details');
  }
}
