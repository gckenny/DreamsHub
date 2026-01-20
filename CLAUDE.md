# Claude Code 專案設定

## 語言偏好

- **回應使用者時必須使用繁體中文（Traditional Chinese）**
- 程式碼註解必須使用英文
- Commit 訊息、PR 描述必須使用英文

## Git 規範

- **Commit 訊息必須使用英文**
- 遵循 conventional commits 格式：`type: description`
- 常用 type: `feat`, `fix`, `perf`, `refactor`, `docs`, `style`, `test`, `chore`

## 專案概述

Dreams 是一個游泳比賽電子化管理系統（SaaS），目標是取代傳統紙本作業：
- 報名 → 報到 → 檢錄 → 成績 → 統計

### 技術棧

- **前端框架**: React 19 + Vite（純 SPA，不走 SSR）
- **UI 框架**: shadcn/ui + Tailwind CSS
- **路由**: React Router v7
- **狀態管理**: TanStack Query + Zustand
- **資料庫**: Supabase (PostgreSQL)
- **認證**: Supabase Auth
- **部署**: Cloudflare Pages
- **套件管理**: pnpm

### Multi-tenant 架構

系統設計為多租戶架構，透過 Supabase RLS 實現租戶隔離：
- 夢想盃為首要租戶
- 其他公司行號可獨立使用，擁有自訂品牌

## 設計原則

### 1. 資料庫正規化 (Database Normalization)

- **必須遵循第三正規化 (3NF)**
- 消除重複資料，使用外鍵關聯
- 查詢資料表 (Lookup Tables) 獨立管理：泳式、組別、比賽狀態等
- 避免在單一欄位儲存多值（如逗號分隔）
- 適當使用 ENUM 或查詢表

### 2. UI 設計 - DRY 原則 (Don't Repeat Yourself)

- **元件必須可重用**，避免複製貼上相似程式碼
- 使用 Composition Pattern 組合小元件成大元件
- 共用邏輯抽取為 Custom Hooks
- 表單欄位、表格、列表等使用泛型元件
- 樣式使用 Tailwind variants 或 cva() 管理

### 3. RWD 響應式設計 (Responsive Web Design)

- **Mobile First** 設計策略
- 斷點定義（遵循 Tailwind 預設）：
  - `sm`: 640px  (手機橫向)
  - `md`: 768px  (平板)
  - `lg`: 1024px (桌機)
  - `xl`: 1280px (大螢幕)
- 觸控友善：按鈕最小 44x44px
- 表格在手機上轉為卡片式呈現
- 導航列在手機上使用漢堡選單

## 重要目錄

- `src/routes/` - 頁面路由元件
- `src/components/` - React 元件
- `src/components/ui/` - shadcn/ui 基礎元件 (**勿直接修改**)
- `src/components/custom/` - 客製化包裝元件 (**在此客製化**)
- `src/components/common/` - 共用業務元件
- `src/components/layout/` - 版面配置元件
- `src/lib/` - 工具函式庫
- `src/hooks/` - React Hooks
- `src/stores/` - Zustand Stores
- `src/types/` - TypeScript 型別定義

## shadcn/ui 元件管理

### 原則：Wrapper 模式

- **`src/components/ui/`** - shadcn 原始元件，**禁止直接修改**
- **`src/components/custom/`** - 包裝元件，所有客製化在此進行

### 使用方式

```tsx
// 正確：從 custom 匯入
import { Button, StatusBadge, FormField } from "@/components/custom";

// 避免：直接從 ui 匯入（除非確定不需客製化）
import { Button } from "@/components/ui/button";
```

### 升級 shadcn/ui

```bash
# 1. 查看有哪些元件可更新
npx shadcn@latest diff

# 2. 更新特定元件（會覆蓋 ui/ 內的檔案）
npx shadcn@latest add button --overwrite

# 3. custom/ 內的包裝不受影響，無需改動
```

### 新增元件

```bash
# 1. 安裝 shadcn 元件
npx shadcn@latest add [component-name]

# 2. 如需客製化，在 custom/ 建立 wrapper
# 3. 更新 custom/index.ts 匯出
```

## 開發指令

```bash
pnpm dev      # 開發伺服器
pnpm build    # 建置
pnpm preview  # 預覽建置結果
pnpm lint     # ESLint 檢查
```

## 環境變數

複製 `.env.example` 為 `.env` 並填入：
- `VITE_SUPABASE_URL` - Supabase 專案 URL
- `VITE_SUPABASE_ANON_KEY` - Supabase 匿名金鑰

## 核心功能模組

1. **報名模組** - 線上報名、付款整合
2. **報到模組** - QR Code 快速報到
3. **檢錄模組** - 身份核對、退賽處理、接力組隊
4. **成績模組** - 計時整合、即時公告
5. **統計模組** - 團體總錦標、報表產出
