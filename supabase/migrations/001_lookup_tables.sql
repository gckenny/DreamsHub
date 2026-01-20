-- ============================================================================
-- Migration 001: Lookup Tables (Reference Data)
-- 查詢資料表 - 正規化設計，避免硬編碼
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 性別 (Genders)
-- ----------------------------------------------------------------------------
CREATE TABLE genders (
    code CHAR(1) PRIMARY KEY,           -- 'M', 'F', 'X'
    name_zh VARCHAR(10) NOT NULL,       -- 男, 女, 混合
    name_en VARCHAR(20) NOT NULL,       -- Male, Female, Mixed
    sort_order SMALLINT NOT NULL DEFAULT 0
);

INSERT INTO genders (code, name_zh, name_en, sort_order) VALUES
    ('M', '男', 'Male', 1),
    ('F', '女', 'Female', 2),
    ('X', '混合', 'Mixed', 3);

-- ----------------------------------------------------------------------------
-- 池型 (Pool Types)
-- ----------------------------------------------------------------------------
CREATE TABLE pool_types (
    code VARCHAR(10) PRIMARY KEY,       -- 'LCM', 'SCM', 'SCY'
    name_zh VARCHAR(20) NOT NULL,       -- 長池, 短池
    name_en VARCHAR(30) NOT NULL,       -- Long Course Meters
    length_meters SMALLINT NOT NULL,    -- 50, 25
    sort_order SMALLINT NOT NULL DEFAULT 0
);

INSERT INTO pool_types (code, name_zh, name_en, length_meters, sort_order) VALUES
    ('LCM', '長池(50m)', 'Long Course Meters', 50, 1),
    ('SCM', '短池(25m)', 'Short Course Meters', 25, 2),
    ('SCY', '短池(25碼)', 'Short Course Yards', 23, 3);

-- ----------------------------------------------------------------------------
-- 泳式 (Strokes)
-- ----------------------------------------------------------------------------
CREATE TABLE strokes (
    id SMALLSERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,   -- 'FR', 'BK', 'BR', 'FL', 'IM'
    name_zh VARCHAR(20) NOT NULL,       -- 自由式, 仰式, 蛙式, 蝶式, 混合式
    name_en VARCHAR(30) NOT NULL,       -- Freestyle, Backstroke...
    sort_order SMALLINT NOT NULL DEFAULT 0
);

INSERT INTO strokes (code, name_zh, name_en, sort_order) VALUES
    ('FR', '自由式', 'Freestyle', 1),
    ('BK', '仰式', 'Backstroke', 2),
    ('BR', '蛙式', 'Breaststroke', 3),
    ('FL', '蝶式', 'Butterfly', 4),
    ('IM', '混合式', 'Individual Medley', 5);

-- ----------------------------------------------------------------------------
-- 標準距離 (Distances)
-- ----------------------------------------------------------------------------
CREATE TABLE distances (
    meters SMALLINT PRIMARY KEY,        -- 25, 50, 100, 200, 400, 800, 1500
    name_zh VARCHAR(20) NOT NULL,       -- 25公尺, 50公尺...
    sort_order SMALLINT NOT NULL DEFAULT 0
);

INSERT INTO distances (meters, name_zh, sort_order) VALUES
    (25, '25公尺', 1),
    (50, '50公尺', 2),
    (100, '100公尺', 3),
    (200, '200公尺', 4),
    (400, '400公尺', 5),
    (800, '800公尺', 6),
    (1500, '1500公尺', 7);

-- ----------------------------------------------------------------------------
-- 賽別 (Rounds)
-- ----------------------------------------------------------------------------
CREATE TABLE rounds (
    code VARCHAR(10) PRIMARY KEY,       -- 'PRE', 'SEM', 'FIN', 'TIM'
    name_zh VARCHAR(20) NOT NULL,       -- 預賽, 準決賽, 決賽, 計時決賽
    name_en VARCHAR(30) NOT NULL,       -- Preliminary, Semi-final, Final, Timed Final
    sort_order SMALLINT NOT NULL DEFAULT 0
);

INSERT INTO rounds (code, name_zh, name_en, sort_order) VALUES
    ('PRE', '預賽', 'Preliminary', 1),
    ('SEM', '準決賽', 'Semi-final', 2),
    ('FIN', '決賽', 'Final', 3),
    ('TIM', '計時決賽', 'Timed Final', 4);

-- ----------------------------------------------------------------------------
-- 組別類型 (Age Group Types)
-- ----------------------------------------------------------------------------
CREATE TABLE age_group_types (
    code VARCHAR(20) PRIMARY KEY,       -- 'AGE_SINGLE', 'AGE_RANGE', 'SCHOOL', 'OPEN'
    name_zh VARCHAR(30) NOT NULL,
    name_en VARCHAR(30) NOT NULL
);

INSERT INTO age_group_types (code, name_zh, name_en) VALUES
    ('AGE_SINGLE', '單一年齡', 'Single Age'),
    ('AGE_RANGE', '年齡區間', 'Age Range'),
    ('SCHOOL', '學制', 'School Level'),
    ('OPEN', '公開組', 'Open');

-- ----------------------------------------------------------------------------
-- 比賽狀態 (Competition Statuses)
-- ----------------------------------------------------------------------------
CREATE TABLE competition_statuses (
    code VARCHAR(20) PRIMARY KEY,
    name_zh VARCHAR(30) NOT NULL,
    name_en VARCHAR(30) NOT NULL,
    sort_order SMALLINT NOT NULL DEFAULT 0
);

INSERT INTO competition_statuses (code, name_zh, name_en, sort_order) VALUES
    ('DRAFT', '草稿', 'Draft', 1),
    ('PUBLISHED', '已發布', 'Published', 2),
    ('REGISTRATION_OPEN', '報名中', 'Registration Open', 3),
    ('REGISTRATION_CLOSED', '報名截止', 'Registration Closed', 4),
    ('IN_PROGRESS', '進行中', 'In Progress', 5),
    ('COMPLETED', '已結束', 'Completed', 6),
    ('CANCELLED', '已取消', 'Cancelled', 7);

-- ----------------------------------------------------------------------------
-- 報名狀態 (Entry Statuses)
-- ----------------------------------------------------------------------------
CREATE TABLE entry_statuses (
    code VARCHAR(20) PRIMARY KEY,
    name_zh VARCHAR(30) NOT NULL,
    name_en VARCHAR(30) NOT NULL,
    sort_order SMALLINT NOT NULL DEFAULT 0
);

INSERT INTO entry_statuses (code, name_zh, name_en, sort_order) VALUES
    ('PENDING', '待付款', 'Pending Payment', 1),
    ('CONFIRMED', '已確認', 'Confirmed', 2),
    ('CHECKED_IN', '已報到', 'Checked In', 3),
    ('SCRATCHED', '已退賽', 'Scratched', 4),
    ('NO_SHOW', '未出席', 'No Show', 5),
    ('CANCELLED', '已取消', 'Cancelled', 6);

-- ----------------------------------------------------------------------------
-- 成績狀態 (Result Statuses)
-- ----------------------------------------------------------------------------
CREATE TABLE result_statuses (
    code VARCHAR(10) PRIMARY KEY,
    name_zh VARCHAR(30) NOT NULL,
    name_en VARCHAR(30) NOT NULL,
    is_valid BOOLEAN NOT NULL DEFAULT TRUE,  -- 是否為有效成績
    sort_order SMALLINT NOT NULL DEFAULT 0
);

INSERT INTO result_statuses (code, name_zh, name_en, is_valid, sort_order) VALUES
    ('OK', '完成', 'Finished', TRUE, 1),
    ('DQ', '犯規', 'Disqualified', FALSE, 2),
    ('DNS', '未出發', 'Did Not Start', FALSE, 3),
    ('DNF', '未完成', 'Did Not Finish', FALSE, 4),
    ('DSQ', '取消資格', 'Disqualified', FALSE, 5);

-- ----------------------------------------------------------------------------
-- DQ 代碼 (Disqualification Codes)
-- ----------------------------------------------------------------------------
CREATE TABLE dq_codes (
    code VARCHAR(10) PRIMARY KEY,
    stroke_id SMALLINT REFERENCES strokes(id),  -- NULL = 通用
    name_zh VARCHAR(50) NOT NULL,
    name_en VARCHAR(50) NOT NULL
);

INSERT INTO dq_codes (code, stroke_id, name_zh, name_en) VALUES
    ('SA', NULL, '提前出發', 'Start - False Start'),
    ('IF', NULL, '違規入水', 'Start - Illegal Form'),
    ('IM', NULL, '混合式順序錯誤', 'IM - Wrong Stroke Order'),
    ('FT', NULL, '轉身觸牆違規', 'Turn - Touch Fault'),
    ('RE', NULL, '接力違規', 'Relay - Exchange Fault'),
    ('FR-K', 1, '自由式踢腿違規', 'Freestyle - Kick Violation'),
    ('BK-T', 2, '仰式轉身違規', 'Backstroke - Turn Violation'),
    ('BK-F', 2, '仰式抵達違規', 'Backstroke - Finish Violation'),
    ('BR-K', 3, '蛙式踢腿違規', 'Breaststroke - Kick Violation'),
    ('BR-P', 3, '蛙式划手違規', 'Breaststroke - Pull Violation'),
    ('FL-K', 4, '蝶式踢腿違規', 'Butterfly - Kick Violation'),
    ('FL-T', 4, '蝶式觸牆違規', 'Butterfly - Touch Violation');

-- ----------------------------------------------------------------------------
-- 付款狀態 (Payment Statuses)
-- ----------------------------------------------------------------------------
CREATE TABLE payment_statuses (
    code VARCHAR(20) PRIMARY KEY,
    name_zh VARCHAR(30) NOT NULL,
    name_en VARCHAR(30) NOT NULL,
    sort_order SMALLINT NOT NULL DEFAULT 0
);

INSERT INTO payment_statuses (code, name_zh, name_en, sort_order) VALUES
    ('PENDING', '待付款', 'Pending', 1),
    ('PROCESSING', '處理中', 'Processing', 2),
    ('COMPLETED', '已完成', 'Completed', 3),
    ('FAILED', '失敗', 'Failed', 4),
    ('REFUNDED', '已退款', 'Refunded', 5),
    ('CANCELLED', '已取消', 'Cancelled', 6);

-- ----------------------------------------------------------------------------
-- Indexes for lookup tables
-- ----------------------------------------------------------------------------
CREATE INDEX idx_strokes_code ON strokes(code);
CREATE INDEX idx_dq_codes_stroke ON dq_codes(stroke_id);
