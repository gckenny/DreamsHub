# Dreams - 游泳比賽電子化管理系統

> Swimming Competition Management SaaS Platform

[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3fcf8e)](https://supabase.com/)

## 專案簡介

Dreams 是一套為游泳比賽設計的全電子化管理系統，涵蓋：

- **報名** - 線上報名、項目選擇、費用計算、線上付款
- **報到** - QR Code 快速報到、即時出席統計
- **檢錄** - 身份核對、水道確認、退賽處理、接力組隊
- **成績** - 計時系統整合、成績即時公告
- **統計** - 團體總錦標、精神總錦標、報表產出

## 技術棧

| 層級 | 技術 |
|------|------|
| 前端 | React 19 + Vite 7 (SPA) |
| UI | shadcn/ui + Tailwind CSS 4 |
| 路由 | React Router v7 |
| 狀態 | TanStack Query + Zustand |
| 資料庫 | Supabase (PostgreSQL) |
| 部署 | Cloudflare Pages |

## 快速開始

### 1. 安裝依賴

```bash
pnpm install
```

### 2. 環境變數設定

```bash
cp .env.example .env
```

填入 Supabase 專案資訊：
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 3. 啟動開發伺服器

```bash
pnpm dev
```

### 4. 建置

```bash
pnpm build
```

## 專案結構

```
dreams/
├── src/
│   ├── routes/          # 頁面路由元件
│   ├── components/      # React 元件
│   │   └── ui/          # shadcn/ui 基礎元件
│   ├── lib/             # 工具函式庫
│   ├── hooks/           # React Hooks
│   ├── stores/          # Zustand Stores
│   └── types/           # TypeScript 型別定義
├── CLAUDE.md            # Claude Code 專案設定
└── RESEARCH-REPORT.md   # 調查報告與系統規劃
```

## 開發指令

```bash
pnpm dev      # 開發伺服器
pnpm build    # 建置
pnpm preview  # 預覽建置結果
pnpm lint     # ESLint 檢查
```

## 授權

Private

---

Built with Claude Code
