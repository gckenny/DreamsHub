-- ============================================================================
-- Migration 002: Core Tables
-- 核心資料表 - Multi-tenant 架構
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 租戶 (Tenants) - 主辦單位
-- ----------------------------------------------------------------------------
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- 基本資訊
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,       -- URL 識別碼 (e.g., 'dreams-cup')

    -- 品牌設定
    logo_url TEXT,
    primary_color VARCHAR(7),               -- Hex color (e.g., '#3B82F6')
    secondary_color VARCHAR(7),

    -- 聯絡資訊
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    address TEXT,

    -- 網域設定
    custom_domain VARCHAR(255) UNIQUE,      -- 自訂網域

    -- 訂閱
    subscription_plan VARCHAR(20) NOT NULL DEFAULT 'free',
    subscription_expires_at TIMESTAMPTZ,

    -- 時間戳記
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 使用者 (Users) - 系統用戶
-- ----------------------------------------------------------------------------
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Supabase Auth 關聯
    auth_id UUID UNIQUE,                    -- Supabase Auth user id

    -- 基本資訊
    email VARCHAR(255) UNIQUE,
    display_name VARCHAR(100),
    avatar_url TEXT,
    phone VARCHAR(50),

    -- 時間戳記
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMPTZ
);

-- ----------------------------------------------------------------------------
-- 用戶角色 (User Roles) - 用戶在租戶中的角色
-- ----------------------------------------------------------------------------
CREATE TABLE user_tenant_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

    -- 角色: 'owner', 'admin', 'staff', 'coach', 'athlete', 'parent'
    role VARCHAR(20) NOT NULL,

    -- 時間戳記
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(user_id, tenant_id, role)
);

-- ----------------------------------------------------------------------------
-- 組別 (Age Groups)
-- ----------------------------------------------------------------------------
CREATE TABLE age_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

    -- 組別資訊
    name VARCHAR(50) NOT NULL,              -- 國小中年級, 30-34歲...
    code VARCHAR(20),                       -- 內部代碼
    type_code VARCHAR(20) NOT NULL REFERENCES age_group_types(code),

    -- 年齡範圍 (依 type 使用)
    min_age SMALLINT,
    max_age SMALLINT,

    -- 出生年範圍 (另一種定義方式)
    birth_year_start SMALLINT,
    birth_year_end SMALLINT,

    -- 排序
    sort_order SMALLINT NOT NULL DEFAULT 0,

    -- 時間戳記
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(tenant_id, name)
);

-- ----------------------------------------------------------------------------
-- 泳隊/俱樂部 (Teams)
-- ----------------------------------------------------------------------------
CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

    -- 基本資訊
    name VARCHAR(100) NOT NULL,
    short_name VARCHAR(20),                 -- 簡稱
    code VARCHAR(20),                       -- 隊伍代碼

    -- 聯絡資訊
    contact_name VARCHAR(50),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    address TEXT,

    -- 狀態
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    -- 時間戳記
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(tenant_id, name)
);

-- ----------------------------------------------------------------------------
-- 選手 (Swimmers)
-- ----------------------------------------------------------------------------
CREATE TABLE swimmers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    team_id UUID REFERENCES teams(id) ON DELETE SET NULL,

    -- 關聯用戶帳號 (可選)
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,

    -- 基本資訊
    name VARCHAR(50) NOT NULL,
    gender_code CHAR(1) NOT NULL REFERENCES genders(code),
    birth_date DATE,

    -- 身份驗證 (加密儲存)
    id_number_hash VARCHAR(64),             -- 身分證字號 hash

    -- 照片 (檢錄用)
    photo_url TEXT,

    -- 聯絡資訊 (如非本人帳號)
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    emergency_contact_name VARCHAR(50),
    emergency_contact_phone VARCHAR(50),

    -- 狀態
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    -- 時間戳記
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- 同一租戶內，選手姓名+生日唯一
    UNIQUE(tenant_id, name, birth_date)
);

-- ----------------------------------------------------------------------------
-- 比賽 (Competitions)
-- ----------------------------------------------------------------------------
CREATE TABLE competitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

    -- 基本資訊
    name VARCHAR(100) NOT NULL,
    short_name VARCHAR(50),
    description TEXT,

    -- 日期與地點
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    location_name VARCHAR(100),
    location_address TEXT,

    -- 池型
    pool_type_code VARCHAR(10) NOT NULL REFERENCES pool_types(code),
    lane_count SMALLINT NOT NULL DEFAULT 8,

    -- 報名設定
    registration_start_at TIMESTAMPTZ,
    registration_end_at TIMESTAMPTZ,
    late_registration_end_at TIMESTAMPTZ,

    -- 費用
    entry_fee DECIMAL(10, 2),
    late_entry_fee DECIMAL(10, 2),

    -- 狀態
    status_code VARCHAR(20) NOT NULL DEFAULT 'DRAFT'
        REFERENCES competition_statuses(code),

    -- 額外設定 (JSON)
    settings JSONB NOT NULL DEFAULT '{}',

    -- 時間戳記
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(tenant_id, name, start_date)
);

-- ----------------------------------------------------------------------------
-- 比賽場次 (Competition Sessions)
-- ----------------------------------------------------------------------------
CREATE TABLE competition_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competition_id UUID NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,

    -- 場次資訊
    session_number SMALLINT NOT NULL,
    name VARCHAR(50),                       -- '上午場', '下午場'

    -- 時間
    session_date DATE NOT NULL,
    warmup_start_time TIME,
    start_time TIME NOT NULL,

    -- 時間戳記
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(competition_id, session_number)
);

-- ----------------------------------------------------------------------------
-- 比賽項目 (Events)
-- ----------------------------------------------------------------------------
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competition_id UUID NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
    session_id UUID REFERENCES competition_sessions(id) ON DELETE SET NULL,

    -- 項目編號
    event_number SMALLINT NOT NULL,

    -- 項目定義 (正規化關聯)
    stroke_id SMALLINT NOT NULL REFERENCES strokes(id),
    distance_meters SMALLINT NOT NULL REFERENCES distances(meters),
    gender_code CHAR(1) NOT NULL REFERENCES genders(code),
    age_group_id UUID REFERENCES age_groups(id) ON DELETE SET NULL,

    -- 賽別
    round_code VARCHAR(10) NOT NULL DEFAULT 'TIM' REFERENCES rounds(code),

    -- 是否為接力
    is_relay BOOLEAN NOT NULL DEFAULT FALSE,
    relay_team_size SMALLINT,               -- 4 for 4x100

    -- 最大人數限制
    max_entries SMALLINT,

    -- 時間戳記
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(competition_id, event_number)
);

-- ----------------------------------------------------------------------------
-- Indexes
-- ----------------------------------------------------------------------------
CREATE INDEX idx_tenants_slug ON tenants(slug);
CREATE INDEX idx_tenants_custom_domain ON tenants(custom_domain) WHERE custom_domain IS NOT NULL;

CREATE INDEX idx_users_auth_id ON users(auth_id) WHERE auth_id IS NOT NULL;
CREATE INDEX idx_users_email ON users(email) WHERE email IS NOT NULL;

CREATE INDEX idx_user_tenant_roles_user ON user_tenant_roles(user_id);
CREATE INDEX idx_user_tenant_roles_tenant ON user_tenant_roles(tenant_id);

CREATE INDEX idx_age_groups_tenant ON age_groups(tenant_id);

CREATE INDEX idx_teams_tenant ON teams(tenant_id);
CREATE INDEX idx_teams_active ON teams(tenant_id) WHERE is_active = TRUE;

CREATE INDEX idx_swimmers_tenant ON swimmers(tenant_id);
CREATE INDEX idx_swimmers_team ON swimmers(team_id) WHERE team_id IS NOT NULL;
CREATE INDEX idx_swimmers_user ON swimmers(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_swimmers_name ON swimmers(tenant_id, name);

CREATE INDEX idx_competitions_tenant ON competitions(tenant_id);
CREATE INDEX idx_competitions_status ON competitions(status_code);
CREATE INDEX idx_competitions_dates ON competitions(start_date, end_date);

CREATE INDEX idx_competition_sessions_competition ON competition_sessions(competition_id);

CREATE INDEX idx_events_competition ON events(competition_id);
CREATE INDEX idx_events_session ON events(session_id) WHERE session_id IS NOT NULL;
CREATE INDEX idx_events_stroke ON events(stroke_id);
CREATE INDEX idx_events_age_group ON events(age_group_id) WHERE age_group_id IS NOT NULL;
