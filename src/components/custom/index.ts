/**
 * Custom Components
 *
 * 這裡匯出所有客製化的元件，包裝自 shadcn/ui
 * 使用方式：import { Button, Card, ... } from "@/components/custom";
 *
 * 升級 shadcn/ui 時：
 * 1. npx shadcn@latest diff  # 查看變更
 * 2. npx shadcn@latest add [component] --overwrite  # 更新元件
 * 3. 這裡的 wrapper 不需要改動
 */

// Button
export {
  Button,
  ButtonLink,
  buttonVariants,
  type ButtonProps,
  type ButtonLinkProps,
} from "./Button";

// Card
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  ClickableCard,
  type ClickableCardProps,
} from "./Card";

// Badge
export {
  Badge,
  badgeVariants,
  StatusBadge,
  PoolTypeBadge,
  type StatusType,
  type StatusBadgeProps,
  type PoolTypeBadgeProps,
} from "./Badge";

// Input
export {
  Input,
  FormField,
  SearchInput,
  TimeInput,
  type FormFieldProps,
  type SearchInputProps,
  type TimeInputProps,
} from "./Input";

// Re-export other shadcn components (未客製化，直接使用)
export { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
export { Checkbox } from "@/components/ui/checkbox";
export { Label } from "@/components/ui/label";
export { Separator } from "@/components/ui/separator";
export { Skeleton } from "@/components/ui/skeleton";
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
export { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
export { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
export { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
export { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Custom components
export { PhotoUpload, type PhotoUploadProps } from "./PhotoUpload";
