export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          clerk_id: string
          name: string
          company: string
          profile_image_url: string | null
          coins: number
          created_at: string
        }
        Insert: {
          id?: string
          clerk_id: string
          name: string
          company: string
          profile_image_url?: string | null
          coins?: number
          created_at?: string
        }
        Update: {
          id?: string
          clerk_id?: string
          name?: string
          company?: string
          profile_image_url?: string | null
          coins?: number
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
          image_url: string | null
          coin_value: number
          qr_code_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description?: string | null
          image_url?: string | null
          coin_value: number
          qr_code_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string | null
          image_url?: string | null
          coin_value?: number
          qr_code_url?: string | null
        }
      }
      cart_items: {
        Row: {
          id: string
          created_at: string
          user_id: string
          product_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          product_id: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          product_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 