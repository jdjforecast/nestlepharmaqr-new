export interface Product {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  qr_code_url: string | null;
  coin_value: number;
  created_at: string;
  updated_at: string;
} 