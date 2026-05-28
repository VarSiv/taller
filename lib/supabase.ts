import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Cliente para componentes cliente y server actions
export const supabase = createBrowserClient(url, key);

export type Publicacion = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  category_slug: string;
  zone: string;
  urgency: string;
  photo: string | null;
  photos: string[];
  posted_by: string;
  status: string;
};
