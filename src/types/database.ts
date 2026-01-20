// ============================================================================
// Database Types - Auto-generated from Supabase schema
// 遵循正規化設計 (3NF)
// ============================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// ----------------------------------------------------------------------------
// Lookup Table Types (Reference Data)
// ----------------------------------------------------------------------------

export type GenderCode = "M" | "F" | "X";
export type PoolTypeCode = "LCM" | "SCM" | "SCY";
export type StrokeCode = "FR" | "BK" | "BR" | "FL" | "IM";
export type RoundCode = "PRE" | "SEM" | "FIN" | "TIM";
export type AgeGroupTypeCode = "AGE_SINGLE" | "AGE_RANGE" | "SCHOOL" | "OPEN";
export type CompetitionStatusCode =
  | "DRAFT"
  | "PUBLISHED"
  | "REGISTRATION_OPEN"
  | "REGISTRATION_CLOSED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";
export type EntryStatusCode =
  | "PENDING"
  | "CONFIRMED"
  | "CHECKED_IN"
  | "SCRATCHED"
  | "NO_SHOW"
  | "CANCELLED";
export type ResultStatusCode = "OK" | "DQ" | "DNS" | "DNF" | "DSQ";
export type PaymentStatusCode =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "REFUNDED"
  | "CANCELLED";

export interface Gender {
  code: GenderCode;
  name_zh: string;
  name_en: string;
  sort_order: number;
}

export interface PoolType {
  code: PoolTypeCode;
  name_zh: string;
  name_en: string;
  length_meters: number;
  sort_order: number;
}

export interface Stroke {
  id: number;
  code: StrokeCode;
  name_zh: string;
  name_en: string;
  sort_order: number;
}

export interface Distance {
  meters: number;
  name_zh: string;
  sort_order: number;
}

export interface Round {
  code: RoundCode;
  name_zh: string;
  name_en: string;
  sort_order: number;
}

// ----------------------------------------------------------------------------
// Core Table Types
// ----------------------------------------------------------------------------

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  address: string | null;
  custom_domain: string | null;
  subscription_plan: string;
  subscription_expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  auth_id: string | null;
  email: string | null;
  display_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
}

export interface UserTenantRole {
  id: string;
  user_id: string;
  tenant_id: string;
  role: "owner" | "admin" | "staff" | "coach" | "athlete" | "parent";
  created_at: string;
}

export interface AgeGroup {
  id: string;
  tenant_id: string;
  name: string;
  code: string | null;
  type_code: AgeGroupTypeCode;
  min_age: number | null;
  max_age: number | null;
  birth_year_start: number | null;
  birth_year_end: number | null;
  sort_order: number;
  created_at: string;
}

export interface Team {
  id: string;
  tenant_id: string;
  name: string;
  short_name: string | null;
  code: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  address: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Swimmer {
  id: string;
  tenant_id: string;
  team_id: string | null;
  user_id: string | null;
  name: string;
  gender_code: GenderCode;
  birth_date: string | null;
  id_number_hash: string | null;
  photo_url: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Competition {
  id: string;
  tenant_id: string;
  name: string;
  short_name: string | null;
  description: string | null;
  start_date: string;
  end_date: string;
  location_name: string | null;
  location_address: string | null;
  pool_type_code: PoolTypeCode;
  lane_count: number;
  registration_start_at: string | null;
  registration_end_at: string | null;
  late_registration_end_at: string | null;
  entry_fee: number | null;
  late_entry_fee: number | null;
  status_code: CompetitionStatusCode;
  settings: Json;
  created_at: string;
  updated_at: string;
}

export interface CompetitionSession {
  id: string;
  competition_id: string;
  session_number: number;
  name: string | null;
  session_date: string;
  warmup_start_time: string | null;
  start_time: string;
  created_at: string;
}

export interface Event {
  id: string;
  competition_id: string;
  session_id: string | null;
  event_number: number;
  stroke_id: number;
  distance_meters: number;
  gender_code: GenderCode;
  age_group_id: string | null;
  round_code: RoundCode;
  is_relay: boolean;
  relay_team_size: number | null;
  max_entries: number | null;
  created_at: string;
}

export interface RegistrationOrder {
  id: string;
  competition_id: string;
  team_id: string | null;
  order_number: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  subtotal: number;
  discount: number;
  total_amount: number;
  payment_status_code: PaymentStatusCode;
  paid_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Entry {
  id: string;
  competition_id: string;
  event_id: string;
  swimmer_id: string;
  order_id: string | null;
  entry_time_ms: number | null;
  entry_time_formatted: string | null;
  seed_rank: number | null;
  heat_number: number | null;
  lane_number: number | null;
  status_code: EntryStatusCode;
  checked_in_at: string | null;
  checked_in_by: string | null;
  scratched_at: string | null;
  scratch_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface RelayTeam {
  id: string;
  competition_id: string;
  event_id: string;
  team_id: string;
  order_id: string | null;
  team_label: string | null;
  entry_time_ms: number | null;
  entry_time_formatted: string | null;
  seed_rank: number | null;
  heat_number: number | null;
  lane_number: number | null;
  status_code: EntryStatusCode;
  created_at: string;
  updated_at: string;
}

export interface RelayTeamMember {
  id: string;
  relay_team_id: string;
  swimmer_id: string;
  leg_order: number;
  created_at: string;
}

export interface ResultSplit {
  distance: number;
  time_ms: number;
}

export interface Result {
  id: string;
  competition_id: string;
  event_id: string;
  entry_id: string | null;
  relay_team_id: string | null;
  swimmer_id: string | null;
  team_id: string | null;
  heat_number: number;
  lane_number: number;
  time_ms: number | null;
  time_formatted: string | null;
  heat_rank: number | null;
  overall_rank: number | null;
  status_code: ResultStatusCode;
  dq_code: string | null;
  dq_notes: string | null;
  points: number | null;
  splits: ResultSplit[] | null;
  is_confirmed: boolean;
  confirmed_by: string | null;
  confirmed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TeamScore {
  id: string;
  competition_id: string;
  team_id: string;
  total_points: number;
  individual_points: number;
  relay_points: number;
  gold_count: number;
  silver_count: number;
  bronze_count: number;
  overall_rank: number | null;
  updated_at: string;
}

export interface PaymentTransaction {
  id: string;
  order_id: string;
  transaction_id: string | null;
  payment_method: string | null;
  amount: number;
  status_code: PaymentStatusCode;
  provider_response: Json | null;
  created_at: string;
  updated_at: string;
}

// ----------------------------------------------------------------------------
// Database Schema Interface
// ----------------------------------------------------------------------------

export interface Database {
  public: {
    Tables: {
      genders: {
        Row: Gender;
        Insert: Gender;
        Update: Partial<Gender>;
      };
      pool_types: {
        Row: PoolType;
        Insert: PoolType;
        Update: Partial<PoolType>;
      };
      strokes: {
        Row: Stroke;
        Insert: Omit<Stroke, "id"> & { id?: number };
        Update: Partial<Stroke>;
      };
      distances: {
        Row: Distance;
        Insert: Distance;
        Update: Partial<Distance>;
      };
      rounds: {
        Row: Round;
        Insert: Round;
        Update: Partial<Round>;
      };
      tenants: {
        Row: Tenant;
        Insert: Omit<Tenant, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Tenant, "id" | "created_at">>;
      };
      users: {
        Row: User;
        Insert: Omit<User, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<User, "id" | "created_at">>;
      };
      teams: {
        Row: Team;
        Insert: Omit<Team, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Team, "id" | "created_at">>;
      };
      swimmers: {
        Row: Swimmer;
        Insert: Omit<Swimmer, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Swimmer, "id" | "created_at">>;
      };
      competitions: {
        Row: Competition;
        Insert: Omit<Competition, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Competition, "id" | "created_at">>;
      };
      events: {
        Row: Event;
        Insert: Omit<Event, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<Event, "id" | "created_at">>;
      };
      entries: {
        Row: Entry;
        Insert: Omit<Entry, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Entry, "id" | "created_at">>;
      };
      results: {
        Row: Result;
        Insert: Omit<Result, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Result, "id" | "created_at">>;
      };
      team_scores: {
        Row: TeamScore;
        Insert: Omit<TeamScore, "id" | "updated_at"> & {
          id?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<TeamScore, "id">>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      gender_code: GenderCode;
      pool_type_code: PoolTypeCode;
      stroke_code: StrokeCode;
      round_code: RoundCode;
      competition_status_code: CompetitionStatusCode;
      entry_status_code: EntryStatusCode;
      result_status_code: ResultStatusCode;
      payment_status_code: PaymentStatusCode;
    };
  };
}
