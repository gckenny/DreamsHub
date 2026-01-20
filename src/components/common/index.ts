// Common reusable components - DRY principle
export { DataTable } from "./DataTable";
export type { Column } from "./DataTable";

export {
  StatusBadge,
  CompetitionStatusBadge,
  EntryStatusBadge,
  ResultStatusBadge,
  PaymentStatusBadge,
} from "./StatusBadge";
export type {
  StatusBadgeProps,
  CompetitionStatusVariant,
  EntryStatusVariant,
  ResultStatusVariant,
  PaymentStatusVariant,
} from "./StatusBadge";

export {
  EmptyState,
  NoDataEmptyState,
  NoSearchResultsEmptyState,
  ErrorEmptyState,
} from "./EmptyState";
