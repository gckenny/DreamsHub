-- ============================================================================
-- Migration 003: Entries, Results & Related Tables
-- 報名、成績相關資料表
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 報名訂單 (Registration Orders) - 付款單位
-- ----------------------------------------------------------------------------
CREATE TABLE registration_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competition_id UUID NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
    team_id UUID REFERENCES teams(id) ON DELETE SET NULL,

    -- 訂單資訊
    order_number VARCHAR(20) UNIQUE NOT NULL,

    -- 聯絡人
    contact_name VARCHAR(50) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50),

    -- 金額
    subtotal DECIMAL(10, 2) NOT NULL DEFAULT 0,
    discount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,

    -- 付款狀態
    payment_status_code VARCHAR(20) NOT NULL DEFAULT 'PENDING'
        REFERENCES payment_statuses(code),
    paid_at TIMESTAMPTZ,

    -- 備註
    notes TEXT,

    -- 時間戳記
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 報名項目 (Entries) - 選手報名的項目
-- ----------------------------------------------------------------------------
CREATE TABLE entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competition_id UUID NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    swimmer_id UUID NOT NULL REFERENCES swimmers(id) ON DELETE CASCADE,
    order_id UUID REFERENCES registration_orders(id) ON DELETE SET NULL,

    -- 報名成績
    entry_time_ms INTEGER,                  -- 毫秒
    entry_time_formatted VARCHAR(12),       -- '1:23.45' 格式化顯示

    -- 分組編排 (賽前編排後填入)
    seed_rank INTEGER,                      -- 報名成績排名
    heat_number SMALLINT,                   -- 組別
    lane_number SMALLINT,                   -- 水道

    -- 狀態
    status_code VARCHAR(20) NOT NULL DEFAULT 'PENDING'
        REFERENCES entry_statuses(code),

    -- 檢錄時間
    checked_in_at TIMESTAMPTZ,
    checked_in_by UUID REFERENCES users(id),

    -- 退賽資訊
    scratched_at TIMESTAMPTZ,
    scratch_reason TEXT,

    -- 時間戳記
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- 同一選手不能重複報名同一項目
    UNIQUE(event_id, swimmer_id)
);

-- ----------------------------------------------------------------------------
-- 接力隊伍 (Relay Teams)
-- ----------------------------------------------------------------------------
CREATE TABLE relay_teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competition_id UUID NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    order_id UUID REFERENCES registration_orders(id) ON DELETE SET NULL,

    -- 隊伍名稱 (如果同一隊伍有多隊)
    team_label VARCHAR(10),                 -- 'A', 'B'

    -- 報名成績
    entry_time_ms INTEGER,
    entry_time_formatted VARCHAR(12),

    -- 分組編排
    seed_rank INTEGER,
    heat_number SMALLINT,
    lane_number SMALLINT,

    -- 狀態
    status_code VARCHAR(20) NOT NULL DEFAULT 'PENDING'
        REFERENCES entry_statuses(code),

    -- 時間戳記
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(event_id, team_id, team_label)
);

-- ----------------------------------------------------------------------------
-- 接力隊員 (Relay Team Members)
-- ----------------------------------------------------------------------------
CREATE TABLE relay_team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    relay_team_id UUID NOT NULL REFERENCES relay_teams(id) ON DELETE CASCADE,
    swimmer_id UUID NOT NULL REFERENCES swimmers(id) ON DELETE CASCADE,

    -- 棒次
    leg_order SMALLINT NOT NULL CHECK (leg_order BETWEEN 1 AND 8),

    -- 時間戳記
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(relay_team_id, leg_order),
    UNIQUE(relay_team_id, swimmer_id)
);

-- ----------------------------------------------------------------------------
-- 成績 (Results)
-- ----------------------------------------------------------------------------
CREATE TABLE results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competition_id UUID NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,

    -- 關聯報名 (二選一)
    entry_id UUID REFERENCES entries(id) ON DELETE CASCADE,
    relay_team_id UUID REFERENCES relay_teams(id) ON DELETE CASCADE,

    -- 冗餘欄位 (效能考量，避免 JOIN)
    swimmer_id UUID REFERENCES swimmers(id),
    team_id UUID REFERENCES teams(id),

    -- 分組位置
    heat_number SMALLINT NOT NULL,
    lane_number SMALLINT NOT NULL,

    -- 成績
    time_ms INTEGER,                        -- 毫秒
    time_formatted VARCHAR(12),             -- '1:23.45'

    -- 名次 (該組/該項目)
    heat_rank SMALLINT,                     -- 組內名次
    overall_rank SMALLINT,                  -- 總名次

    -- 狀態
    status_code VARCHAR(10) NOT NULL DEFAULT 'OK'
        REFERENCES result_statuses(code),
    dq_code VARCHAR(10) REFERENCES dq_codes(code),
    dq_notes TEXT,

    -- 積分
    points DECIMAL(5, 2),

    -- 分段成績 (JSON array)
    splits JSONB,                           -- [{distance: 50, time_ms: 28450}, ...]

    -- 審核
    is_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
    confirmed_by UUID REFERENCES users(id),
    confirmed_at TIMESTAMPTZ,

    -- 時間戳記
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- 確保只有一種關聯
    CHECK (
        (entry_id IS NOT NULL AND relay_team_id IS NULL) OR
        (entry_id IS NULL AND relay_team_id IS NOT NULL)
    ),

    UNIQUE(event_id, heat_number, lane_number)
);

-- ----------------------------------------------------------------------------
-- 團隊積分 (Team Scores)
-- ----------------------------------------------------------------------------
CREATE TABLE team_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competition_id UUID NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,

    -- 積分統計
    total_points DECIMAL(10, 2) NOT NULL DEFAULT 0,
    individual_points DECIMAL(10, 2) NOT NULL DEFAULT 0,
    relay_points DECIMAL(10, 2) NOT NULL DEFAULT 0,

    -- 獎牌統計
    gold_count SMALLINT NOT NULL DEFAULT 0,
    silver_count SMALLINT NOT NULL DEFAULT 0,
    bronze_count SMALLINT NOT NULL DEFAULT 0,

    -- 排名
    overall_rank SMALLINT,

    -- 時間戳記
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(competition_id, team_id)
);

-- ----------------------------------------------------------------------------
-- 付款記錄 (Payment Transactions)
-- ----------------------------------------------------------------------------
CREATE TABLE payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES registration_orders(id) ON DELETE CASCADE,

    -- 交易資訊
    transaction_id VARCHAR(100),            -- 第三方交易編號
    payment_method VARCHAR(50),             -- 'line_pay', 'credit_card', 'bank_transfer'
    amount DECIMAL(10, 2) NOT NULL,

    -- 狀態
    status_code VARCHAR(20) NOT NULL REFERENCES payment_statuses(code),

    -- 第三方回應
    provider_response JSONB,

    -- 時間戳記
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- Indexes
-- ----------------------------------------------------------------------------
CREATE INDEX idx_registration_orders_competition ON registration_orders(competition_id);
CREATE INDEX idx_registration_orders_team ON registration_orders(team_id) WHERE team_id IS NOT NULL;
CREATE INDEX idx_registration_orders_status ON registration_orders(payment_status_code);
CREATE INDEX idx_registration_orders_number ON registration_orders(order_number);

CREATE INDEX idx_entries_competition ON entries(competition_id);
CREATE INDEX idx_entries_event ON entries(event_id);
CREATE INDEX idx_entries_swimmer ON entries(swimmer_id);
CREATE INDEX idx_entries_order ON entries(order_id) WHERE order_id IS NOT NULL;
CREATE INDEX idx_entries_status ON entries(status_code);
CREATE INDEX idx_entries_heat_lane ON entries(event_id, heat_number, lane_number)
    WHERE heat_number IS NOT NULL;

CREATE INDEX idx_relay_teams_competition ON relay_teams(competition_id);
CREATE INDEX idx_relay_teams_event ON relay_teams(event_id);
CREATE INDEX idx_relay_teams_team ON relay_teams(team_id);

CREATE INDEX idx_relay_team_members_relay ON relay_team_members(relay_team_id);
CREATE INDEX idx_relay_team_members_swimmer ON relay_team_members(swimmer_id);

CREATE INDEX idx_results_competition ON results(competition_id);
CREATE INDEX idx_results_event ON results(event_id);
CREATE INDEX idx_results_entry ON results(entry_id) WHERE entry_id IS NOT NULL;
CREATE INDEX idx_results_relay ON results(relay_team_id) WHERE relay_team_id IS NOT NULL;
CREATE INDEX idx_results_swimmer ON results(swimmer_id) WHERE swimmer_id IS NOT NULL;
CREATE INDEX idx_results_team ON results(team_id) WHERE team_id IS NOT NULL;
CREATE INDEX idx_results_status ON results(status_code);
CREATE INDEX idx_results_ranking ON results(event_id, overall_rank) WHERE overall_rank IS NOT NULL;

CREATE INDEX idx_team_scores_competition ON team_scores(competition_id);
CREATE INDEX idx_team_scores_ranking ON team_scores(competition_id, overall_rank);

CREATE INDEX idx_payment_transactions_order ON payment_transactions(order_id);
CREATE INDEX idx_payment_transactions_status ON payment_transactions(status_code);
