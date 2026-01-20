# 夢想盃游泳錦標賽電子化系統調查報告

> 最後更新：2026-01-20

---

## 1. 夢想盃游泳錦標賽現況分析

### 1.1 賽事背景

**主辦單位**：夢想體育學院
- 官網：https://swim4.kcsat.org/
- 獲得教育部、中華奧委會、游泳協會等多個體育組織認可支持

**賽事規模**：
- 第三屆駿斯夢想盃（2024年）吸引 1,600 名泳將參與
- 參賽者年齡從 6 歲到 75 歲，涵蓋全年齡層
- 比賽地點：新北市立新北高級中學游泳池

**近期賽事**：
| 賽事名稱 | 時間 | 地點 |
|----------|------|------|
| 2025 全國夢想盃冬季賽 | 2025/11/29-30 | 新北高中館 |
| 2026 全國夢想盃春季賽 | 2026/04/03-04 | 待公布 |

### 1.2 現有系統功能

根據 swim4.kcsat.org 觀察：

**用戶系統**：
- 泳隊帳號註冊/登入
- 教練帳號註冊/登入
- 選手帳號註冊/登入

**功能模組**：
- 報名比賽系統
- 成績查詢功能
- 花絮相簿
- 最新公告（精神總錦標、成績證明申請、秩序冊、分組資訊等）

### 1.3 報名費用
- 報名費：NT$600/人

---

## 2. 台灣游泳比賽標準流程分析

### 2.1 比賽全流程

```
┌─────────────────────────────────────────────────────────────────┐
│                        賽前準備階段                              │
├─────────────────────────────────────────────────────────────────┤
│  1. 競賽規程公告                                                 │
│  2. 網路報名開放（泳隊/教練/選手註冊）                           │
│  3. 上傳選手照片（檢錄認證用）                                   │
│  4. 繳交報名費                                                   │
│  5. 報名截止 → 編排秩序冊                                        │
│  6. 公布秩序冊與分組資訊                                         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        比賽日流程                                │
├─────────────────────────────────────────────────────────────────┤
│  1. 領隊/教練會議（比賽前30分鐘）                                │
│  2. 選手報到                                                     │
│  3. 檢錄（比賽前15分鐘開始）                                     │
│     - 核對選手身份（照片比對）                                   │
│     - 確認水道分配                                               │
│     - 退賽處理                                                   │
│  4. 比賽進行                                                     │
│     - 預賽/計時決賽                                              │
│     - 成績即時記錄                                               │
│  5. 成績公告                                                     │
│  6. 抗議處理（30分鐘內提出）                                     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        賽後階段                                  │
├─────────────────────────────────────────────────────────────────┤
│  1. 成績總表公告                                                 │
│  2. 團體總錦標計算                                               │
│  3. 精神總錦標評定                                               │
│  4. 成績證明申請                                                 │
│  5. 成績歸檔                                                     │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 水道分配規則

根據中華民國游泳協會規則：

**基本原則**：
- 成績最快者編配於泳池中央水道
- 6 道泳池：最快者於第 3 水道
- 8 道泳池：最快者於第 4 水道
- 依成績順序一右一左交互編排
- 成績相同時以抽籤決定

**預賽分組**：
- 1 組：以決賽方式編配
- 2 組：最快者第二組，次快者第一組
- 3 組以上：最快者最後一組，依序向前編排

### 2.3 成績計算與排名

**計時決賽**：
- 直接以成績判定名次
- 成績記錄至百分之一秒

**團體總錦標計算**：
- 依個人項目第 1 名數量判定
- 相等時依第 2 名數量，依此類推
- 接力賽金銀銅牌比照個人單項目計分

**積分制（參考）**：
| 名次 | 積分 |
|------|------|
| 第 1 名 | 9 分 |
| 第 2 名 | 7 分 |
| 第 3 名 | 6 分 |
| 第 4 名 | 5 分 |

---

## 3. 競品分析

### 3.1 國際主流系統

#### HY-TEK Meet Manager
**市場地位**：全球最廣泛使用的游泳比賽管理軟體
- 超過 100 個國家使用
- USA Swimming 官方合作夥伴
- 多次用於奧運選拔賽

**核心功能**：
| 模組 | 功能 |
|------|------|
| 賽前 | 賽事設定、報名匯入、自動分組、水道編配 |
| 比賽中 | 16 種計時系統整合、即時成績、計分板連接 |
| 賽後 | 報表產出、成績匯出、獎項標籤 |

**缺點**：
- 傳統桌面軟體
- 需要本地安裝
- 中文支援有限

#### Swimify
**定位**：現代化雲端比賽管理系統
- 2018 年推出
- 8 個國家、600+ 俱樂部使用

**無紙化功能**：
| App | 功能 |
|-----|------|
| Coach App | 教練輸入退賽、接力隊組成 |
| Referee App | 裁判輸入 DQ、確認組別 |
| LiveTiming App | 即時成績推播 |

**技術特點**：
- 雲端即時同步
- 支援 Quantum/Ares、Colorado、Alge 計時系統
- 自訂品牌 Logo 與贊助商

#### SwimTopia / Meet Maestro
**定位**：美國夏季游泳隊管理
- #1 夏季游泳隊軟體

**功能**：
- 線上報名 + 信用卡付款
- 志工管理
- 比賽編排
- 無線計時系統整合

#### Club Assistant
**定位**：線上報名專家
- 世界領先的年齡分組比賽報名系統

**特點**：
- 線上信用卡付款
- SDIF 格式匯出（相容 HY-TEK）
- 附加商品銷售（T-shirt 等）
- 慈善捐款整合

### 3.2 台灣現有系統

#### UTK 系統（中華民國游泳協會）
- 網址：https://ctsa.utk.com.tw/
- 功能：報名、成績查詢、單位成績查詢
- 限制：主要服務游泳協會官方賽事

#### BeClass
- 通用活動報名系統
- 非游泳專用
- 功能有限

---

## 4. 系統需求分析

### 4.1 核心功能模組

```
┌─────────────────────────────────────────────────────────────────┐
│                     夢想盃電子化系統架構                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   報名模組   │  │   報到模組   │  │   檢錄模組   │          │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤          │
│  │ • 泳隊註冊   │  │ • QR Code    │  │ • 身份核對   │          │
│  │ • 選手報名   │  │ • 快速報到   │  │ • 水道確認   │          │
│  │ • 項目選擇   │  │ • 報到統計   │  │ • 退賽處理   │          │
│  │ • 費用計算   │  │ • 出席名單   │  │ • 接力組隊   │          │
│  │ • 線上付款   │  │              │  │              │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   成績模組   │  │   統計模組   │  │   管理模組   │          │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤          │
│  │ • 計時整合   │  │ • 團體總錦標 │  │ • 賽事設定   │          │
│  │ • 成績輸入   │  │ • 精神總錦標 │  │ • 項目管理   │          │
│  │ • 即時公告   │  │ • 成績統計   │  │ • 組別管理   │          │
│  │ • 成績查詢   │  │ • 報表產出   │  │ • 用戶管理   │          │
│  │ • 成績證明   │  │ • 排名分析   │  │ • 權限控制   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 用戶角色

| 角色 | 權限範圍 |
|------|----------|
| 系統管理員 | 全系統設定、租戶管理 |
| 賽事主辦 | 賽事設定、報名管理、成績管理 |
| 泳隊/俱樂部 | 團體報名、選手管理 |
| 教練 | 選手管理、退賽、接力組隊 |
| 選手/家長 | 個人報名、成績查詢 |
| 檢錄員 | 檢錄作業 |
| 裁判 | 成績確認、DQ 輸入 |
| 計時員 | 成績輸入 |

### 4.3 多租戶架構需求

為支援「其他公司行號獨自舉辦游泳賽事」的目標：

```
┌─────────────────────────────────────────────────────────────────┐
│                        SaaS 平台層                              │
├─────────────────────────────────────────────────────────────────┤
│  • 租戶管理                                                      │
│  • 白標品牌設定（Logo、色彩、域名）                              │
│  • 訂閱計費                                                      │
│  • 共用基礎設施                                                  │
└─────────────────────────────────────────────────────────────────┘
           │                    │                    │
           ▼                    ▼                    ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│   夢想盃      │   │   XXX 盃     │   │   YYY 盃     │
│   Tenant A    │   │   Tenant B    │   │   Tenant C    │
├───────────────┤   ├───────────────┤   ├───────────────┤
│ • 自訂品牌    │   │ • 自訂品牌    │   │ • 自訂品牌    │
│ • 獨立資料    │   │ • 獨立資料    │   │ • 獨立資料    │
│ • 獨立設定    │   │ • 獨立設定    │   │ • 獨立設定    │
└───────────────┘   └───────────────┘   └───────────────┘
```

---

## 5. 技術架構規劃

### 5.1 技術棧選型

參考 SwimInsights 架構，針對「純 SaaS、不走 SSR」調整：

| 層級 | 技術選擇 | 說明 |
|------|----------|------|
| 前端框架 | React 18 + Vite | 純 SPA，不用 Next.js SSR |
| UI 框架 | shadcn/ui + Tailwind CSS | 延續 SwimInsights 設計系統 |
| 路由 | React Router v6 | SPA 路由 |
| 狀態管理 | TanStack Query + Zustand | 伺服器狀態 + 客戶端狀態 |
| 資料庫 | Supabase (PostgreSQL) | RLS 多租戶隔離 |
| 認證 | Supabase Auth | 支援多種 OAuth |
| 付款 | LINE Pay / 藍新金流 | 台灣在地支付 |
| 部署 | Cloudflare Pages | 靜態站點部署 |
| API | Supabase Edge Functions | 無伺服器 API |
| 版本控制 | GitHub | CI/CD 整合 |

### 5.2 系統架構圖

```
┌─────────────────────────────────────────────────────────────────┐
│                     Client (SPA - React)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  報名模組   │  │  檢錄模組   │  │  成績/統計模組          │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                    Cloudflare Pages (Static)
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Supabase Edge Functions                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Auth      │  │   Results   │  │   Payment Webhook       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Supabase      │  │   Supabase      │  │   Payment       │
│   PostgreSQL    │  │   Auth          │  │   Gateway       │
│   (Multi-tenant)│  │   (OAuth)       │  │   (LINE Pay)    │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### 5.3 資料庫設計（多租戶）

#### 核心資料表

```sql
-- 租戶（主辦單位）
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,  -- URL 識別碼
    logo_url TEXT,
    primary_color VARCHAR(7),
    custom_domain VARCHAR(255),
    subscription_plan VARCHAR(50) DEFAULT 'basic',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 賽事
CREATE TABLE competitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id),
    name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    location VARCHAR(255),
    registration_start TIMESTAMPTZ,
    registration_end TIMESTAMPTZ,
    entry_fee DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'draft',
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 泳隊/俱樂部
CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id),
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(50),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 選手
CREATE TABLE swimmers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id),
    team_id UUID REFERENCES teams(id),
    name VARCHAR(100) NOT NULL,
    gender CHAR(1) CHECK (gender IN ('M', 'F')),
    birth_date DATE,
    id_number VARCHAR(20),  -- 身分證字號（加密）
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 報名項目
CREATE TABLE entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competition_id UUID REFERENCES competitions(id),
    swimmer_id UUID REFERENCES swimmers(id),
    event_id UUID REFERENCES events(id),
    entry_time VARCHAR(20),  -- 報名成績
    entry_time_ms INTEGER,
    seed_heat INTEGER,      -- 分組
    seed_lane INTEGER,      -- 水道
    status VARCHAR(50) DEFAULT 'registered',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(competition_id, swimmer_id, event_id)
);

-- 比賽項目
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id),
    competition_id UUID REFERENCES competitions(id),
    event_number INTEGER,   -- 項次
    stroke VARCHAR(50),     -- 泳式
    distance INTEGER,       -- 距離
    gender CHAR(1),
    age_group_id UUID REFERENCES age_groups(id),
    round VARCHAR(20),      -- preliminary/final/timed
    session INTEGER,        -- 場次
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 成績
CREATE TABLE results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entry_id UUID REFERENCES entries(id),
    competition_id UUID REFERENCES competitions(id),
    swimmer_id UUID REFERENCES swimmers(id),
    event_id UUID REFERENCES events(id),
    heat INTEGER,
    lane INTEGER,
    time VARCHAR(20),
    time_ms INTEGER,
    rank INTEGER,
    points DECIMAL(5,2),
    status VARCHAR(50),     -- OK/DQ/DNS/DNF
    dq_code VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 檢錄記錄
CREATE TABLE check_ins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entry_id UUID REFERENCES entries(id),
    checked_in_at TIMESTAMPTZ DEFAULT NOW(),
    checked_in_by UUID,
    method VARCHAR(50),     -- qr_code/manual/photo
    notes TEXT
);

-- 團體積分
CREATE TABLE team_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competition_id UUID REFERENCES competitions(id),
    team_id UUID REFERENCES teams(id),
    total_points DECIMAL(10,2) DEFAULT 0,
    gold_count INTEGER DEFAULT 0,
    silver_count INTEGER DEFAULT 0,
    bronze_count INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Row Level Security (RLS)

```sql
-- 租戶隔離
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON competitions
    USING (tenant_id = current_setting('app.tenant_id')::UUID);

-- 類似 policy 套用到所有租戶相關資料表
```

---

## 6. 功能規格詳細

### 6.1 報名模組

#### 6.1.1 泳隊註冊
- 泳隊基本資料（名稱、聯絡人、聯絡方式）
- 泳隊帳號管理
- 子帳號（教練）邀請

#### 6.1.2 選手報名
```
報名流程：
1. 選擇賽事 → 2. 新增/選擇選手 → 3. 選擇項目
→ 4. 填寫報名成績 → 5. 確認報名費 → 6. 線上付款
```

**資料驗證**：
- 選手年齡與組別對應檢查
- 報名成績格式驗證
- 項目限制（每人最多 X 項）
- 重複報名檢查

#### 6.1.3 付款整合
- LINE Pay（台灣市場）
- 藍新金流（信用卡、ATM）
- 付款狀態追蹤
- 退款處理

### 6.2 報到模組

#### 6.2.1 QR Code 報到
```
報到流程：
1. 選手/教練掃描 QR Code
2. 系統自動辨識身份
3. 顯示當日比賽項目
4. 確認報到
5. 更新出席狀態
```

#### 6.2.2 報到統計
- 即時報到率統計
- 未報到選手名單
- 報到時間追蹤

### 6.3 檢錄模組

#### 6.3.1 檢錄作業
```
檢錄流程：
1. 呼叫該組選手至檢錄區
2. 核對選手身份（照片比對）
3. 確認水道分配
4. 處理退賽
5. 接力隊伍確認
6. 放行至出發台
```

#### 6.3.2 退賽處理
- 臨時退賽登記
- 自動重新分組
- 通知相關人員

#### 6.3.3 接力組隊
- 四人接力棒次安排
- 教練 App 即時修改
- 檢錄時確認最終名單

### 6.4 成績模組

#### 6.4.1 計時系統整合
支援格式：
- 手動輸入
- SDIF 格式匯入
- 計時系統 API（未來擴充）

#### 6.4.2 成績處理
```
成績流程：
1. 計時員輸入/匯入成績
2. 裁判確認（DQ 處理）
3. 成績審核
4. 即時公告
5. 積分計算
```

#### 6.4.3 成績公告
- 即時大螢幕顯示
- 手機 App 推播
- 網頁即時更新

### 6.5 統計模組

#### 6.5.1 團體總錦標
- 自動積分計算
- 即時排名更新
- 並列處理

#### 6.5.2 精神總錦標
- 評分項目設定
- 評審評分介面
- 綜合成績計算

#### 6.5.3 報表產出
- 成績總表（PDF/Excel）
- 團體成績（PDF/Excel）
- 個人成績證明
- 大會紀錄公告

---

## 7. 開發階段規劃

### Phase 1：基礎架構
- [ ] 專案初始化（Vite + React）
- [ ] Supabase 設定與資料庫 Schema
- [ ] 認證系統（Supabase Auth）
- [ ] 多租戶基礎架構
- [ ] UI 元件庫建立

### Phase 2：報名模組
- [ ] 泳隊/教練/選手註冊
- [ ] 賽事列表與詳情
- [ ] 報名流程
- [ ] 付款整合

### Phase 3：比賽日模組
- [ ] QR Code 報到
- [ ] 檢錄系統
- [ ] 退賽處理
- [ ] 接力組隊

### Phase 4：成績模組
- [ ] 成績輸入介面
- [ ] 即時成績公告
- [ ] 積分計算
- [ ] 成績查詢

### Phase 5：統計與報表
- [ ] 團體總錦標
- [ ] 報表產出
- [ ] 成績證明

### Phase 6：進階功能
- [ ] 白標設定
- [ ] 計時系統整合
- [ ] 行動 App（PWA）
- [ ] API 開放

---

## 8. 參考資料

### 官方網站
- [夢想體育學院](https://swim4.kcsat.org/)
- [中華民國游泳協會](https://ctsa.utk.com.tw/)
- [臺北市體育總會游泳協會](https://www.tpesa.org.tw/new/)

### 競品系統
- [HY-TEK Meet Manager](https://hytek.active.com/swim-meet-software.html)
- [Swimify](https://www.swimify.com/)
- [SwimTopia](https://www.swimtopia.com/)
- [Club Assistant](https://www.clubassistant.com/online_meet_entry.cfm)
- [Commit Swimming](https://www.commitswimming.com/)

### 技術資源
- [Supabase Multi-tenant Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [Cloudflare Pages](https://pages.cloudflare.com/)

---

## 9. 附錄

### 9.1 游泳項目清單

| 泳式 | 距離 |
|------|------|
| 自由式 | 25m, 50m, 100m, 200m, 400m, 800m, 1500m |
| 仰式 | 25m, 50m, 100m, 200m |
| 蛙式 | 25m, 50m, 100m, 200m |
| 蝶式 | 25m, 50m, 100m, 200m |
| 混合式 | 100m, 200m, 400m |
| 接力 | 4x50m, 4x100m, 4x200m |

### 9.2 年齡組別（參考）

| 組別 | 年齡範圍 |
|------|----------|
| 幼童組 | 6 歲以下 |
| 國小低年級 | 1-2 年級 |
| 國小中年級 | 3-4 年級 |
| 國小高年級 | 5-6 年級 |
| 國中組 | 國中 1-3 年級 |
| 高中組 | 高中 1-3 年級 |
| 大專組 | 大學/研究所 |
| 社會組 | 成年 |
| 長青組 | 30+, 40+, 50+... |

### 9.3 DQ 代碼（參考 FINA）

| 代碼 | 說明 |
|------|------|
| SA | 提前出發 |
| IF | 違規入水 |
| IM | 混合式順序錯誤 |
| FR | 自由式轉身違規 |
| BR | 蛙式違規 |
| BK | 仰式違規 |
| FL | 蝶式違規 |
| RE | 接力違規 |
