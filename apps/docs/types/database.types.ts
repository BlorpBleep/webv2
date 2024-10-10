export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          account_number: string | null
          apple_api_response: string | null
          apple_receipt: string | null
          can_add_devices: string | null
          can_add_ports: string | null
          created_at: string
          cryptotoken: string | null
          expiry: string | null
          id: string
          marked_inactive_by_user: string | null
          max_devices: string | null
          max_ports: string | null
          referral_code: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          account_number?: string | null
          apple_api_response?: string | null
          apple_receipt?: string | null
          can_add_devices?: string | null
          can_add_ports?: string | null
          created_at?: string
          cryptotoken?: string | null
          expiry?: string | null
          id?: string
          marked_inactive_by_user?: string | null
          max_devices?: string | null
          max_ports?: string | null
          referral_code?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          account_number?: string | null
          apple_api_response?: string | null
          apple_receipt?: string | null
          can_add_devices?: string | null
          can_add_ports?: string | null
          created_at?: string
          cryptotoken?: string | null
          expiry?: string | null
          id?: string
          marked_inactive_by_user?: string | null
          max_devices?: string | null
          max_ports?: string | null
          referral_code?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      brands: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      channels: {
        Row: {
          category: string | null
          created_at: string
          custom_metadata: Json | null
          description: string | null
          external_id: string | null
          id: string
          is_active: boolean
          logo_url: string | null
          name: string
          owner_id: string | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          custom_metadata?: Json | null
          description?: string | null
          external_id?: string | null
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name: string
          owner_id?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          custom_metadata?: Json | null
          description?: string | null
          external_id?: string | null
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name?: string
          owner_id?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "channels_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      charges: {
        Row: {
          amount: number
          amount_refunded: number
          billing_details: Json | null
          created_at: string | null
          currency: string
          customer_id: string | null
          id: string
          payment_intent_id: string | null
          receipt_email: string | null
          status: string
          stripe_charge_id: string
        }
        Insert: {
          amount: number
          amount_refunded?: number
          billing_details?: Json | null
          created_at?: string | null
          currency: string
          customer_id?: string | null
          id?: string
          payment_intent_id?: string | null
          receipt_email?: string | null
          status: string
          stripe_charge_id: string
        }
        Update: {
          amount?: number
          amount_refunded?: number
          billing_details?: Json | null
          created_at?: string | null
          currency?: string
          customer_id?: string | null
          id?: string
          payment_intent_id?: string | null
          receipt_email?: string | null
          status?: string
          stripe_charge_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "charges_payment_intent_id_fkey"
            columns: ["payment_intent_id"]
            isOneToOne: false
            referencedRelation: "payment_intents"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      devices: {
        Row: {
          account_number: string | null
          event_type: string | null
          hijack_dns: string | null
          id: string
          ipv4_address: string | null
          ipv6_address: string | null
          last_active: string | null
          name: string | null
          pubkey: string | null
        }
        Insert: {
          account_number?: string | null
          event_type?: string | null
          hijack_dns?: string | null
          id?: string
          ipv4_address?: string | null
          ipv6_address?: string | null
          last_active?: string | null
          name?: string | null
          pubkey?: string | null
        }
        Update: {
          account_number?: string | null
          event_type?: string | null
          hijack_dns?: string | null
          id?: string
          ipv4_address?: string | null
          ipv6_address?: string | null
          last_active?: string | null
          name?: string | null
          pubkey?: string | null
        }
        Relationships: []
      }
      payment_intents: {
        Row: {
          amount: number
          created_at: string | null
          currency: string
          customer_id: string | null
          id: string
          receipt_email: string | null
          status: string
          stripe_payment_intent_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency: string
          customer_id?: string | null
          id?: string
          receipt_email?: string | null
          status: string
          stripe_payment_intent_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string
          customer_id?: string | null
          id?: string
          receipt_email?: string | null
          status?: string
          stripe_payment_intent_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_intents_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          created_at: string | null
          customer_id: string | null
          exp_month: number | null
          exp_year: number | null
          id: string
          last_four: string | null
          stripe_payment_method_id: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          exp_month?: number | null
          exp_year?: number | null
          id?: string
          last_four?: string | null
          stripe_payment_method_id: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          exp_month?: number | null
          exp_year?: number | null
          id?: string
          last_four?: string | null
          stripe_payment_method_id?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_methods_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      processed_events: {
        Row: {
          id: string
        }
        Insert: {
          id: string
        }
        Update: {
          id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          EAN: string | null
          id: string
          image: string | null
          ltr_order: number | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          EAN?: string | null
          id: string
          image?: string | null
          ltr_order?: number | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          EAN?: string | null
          id?: string
          image?: string | null
          ltr_order?: number | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string | null
          friend_email: string
          id: string
          referral_code: string
          referrer_account_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          friend_email: string
          id?: string
          referral_code: string
          referrer_account_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          friend_email?: string
          id?: string
          referral_code?: string
          referrer_account_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referrer_account_id_fkey"
            columns: ["referrer_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      relays: {
        Row: {
          relay_data: Json | null
        }
        Insert: {
          relay_data?: Json | null
        }
        Update: {
          relay_data?: Json | null
        }
        Relationships: []
      }
      releases: {
        Row: {
          latest: string | null
          latest_beta: string | null
          latest_stable: string | null
          platform: string
          supported: boolean
          version: string
        }
        Insert: {
          latest?: string | null
          latest_beta?: string | null
          latest_stable?: string | null
          platform: string
          supported: boolean
          version: string
        }
        Update: {
          latest?: string | null
          latest_beta?: string | null
          latest_stable?: string | null
          platform?: string
          supported?: boolean
          version?: string
        }
        Relationships: []
      }
      sse_updates: {
        Row: {
          account: string | null
          event_type: string | null
          hijack_dns: string | null
          id: string
          ipv4_address: string | null
          ipv6_address: string | null
          max_devices: string | null
          name: string | null
          pubkey: string | null
          status: string | null
          timestamp: string | null
        }
        Insert: {
          account?: string | null
          event_type?: string | null
          hijack_dns?: string | null
          id?: string
          ipv4_address?: string | null
          ipv6_address?: string | null
          max_devices?: string | null
          name?: string | null
          pubkey?: string | null
          status?: string | null
          timestamp?: string | null
        }
        Update: {
          account?: string | null
          event_type?: string | null
          hijack_dns?: string | null
          id?: string
          ipv4_address?: string | null
          ipv6_address?: string | null
          max_devices?: string | null
          name?: string | null
          pubkey?: string | null
          status?: string | null
          timestamp?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount: number | null
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          currency: string | null
          current_period_end: string | null
          current_period_start: string
          description: string | null
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          stripe_subscription_id: string | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          amount?: number | null
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string
          description?: string | null
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          amount?: number | null
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string
          description?: string | null
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          email: string | null
          full_name: string | null
          id: string
          payment_method: Json | null
          type: string | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: Json | null
          email?: string | null
          full_name?: string | null
          id: string
          payment_method?: Json | null
          type?: string | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: Json | null
          email?: string | null
          full_name?: string | null
          id?: string
          payment_method?: Json | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      vouchers: {
        Row: {
          associated_account: string | null
          channel_id: string | null
          code: string
          created_at: string
          duration_months: number
          id: string
          is_used: boolean
          payment_intent_id: string | null
          status: string | null
          subscription_id: string | null
          updated_at: string
          updated_by: string | null
          used_at: string | null
        }
        Insert: {
          associated_account?: string | null
          channel_id?: string | null
          code: string
          created_at?: string
          duration_months?: number
          id?: string
          is_used?: boolean
          payment_intent_id?: string | null
          status?: string | null
          subscription_id?: string | null
          updated_at?: string
          updated_by?: string | null
          used_at?: string | null
        }
        Update: {
          associated_account?: string | null
          channel_id?: string | null
          code?: string
          created_at?: string
          duration_months?: number
          id?: string
          is_used?: boolean
          payment_intent_id?: string | null
          status?: string | null
          subscription_id?: string | null
          updated_at?: string
          updated_by?: string | null
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vouchers_associated_account_fkey"
            columns: ["associated_account"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["account_number"]
          },
          {
            foreignKeyName: "vouchers_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vouchers_payment_intent_id_fkey"
            columns: ["payment_intent_id"]
            isOneToOne: false
            referencedRelation: "payment_intents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vouchers_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      updates: {
        Row: {
          account: string | null
          hijack_dns: string | null
          pubkey: string | null
          status: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      generate_and_insert_voucher_codes: {
        Args: {
          num_codes: number
          duration_months_param: number
          channel_name: string
        }
        Returns: {
          inserted_code: string
          duration_months: number
          channel_id: string
        }[]
      }
      generate_random_alphanumeric: {
        Args: {
          length: number
        }
        Returns: string
      }
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused"
        | "one_time_purchase"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
