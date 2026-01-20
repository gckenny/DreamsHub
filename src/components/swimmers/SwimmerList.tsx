/**
 * SwimmerList - 選手列表元件
 * 支援搜尋、篩選、RWD 顯示
 */
import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  SearchInput,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Skeleton,
} from "@/components/custom";
import { Plus, Edit2 } from "lucide-react";
import { format } from "date-fns";

export interface Swimmer {
  id: string;
  name: string;
  gender_code: "M" | "F";
  birth_date: string;
  photo_url: string | null;
  team?: { id: string; name: string } | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  is_active: boolean;
}

export interface SwimmerListProps {
  swimmers: Swimmer[];
  loading?: boolean;
  teams?: Array<{ id: string; name: string }>;
  onAdd?: () => void;
  onEdit?: (swimmer: Swimmer) => void;
}

export function SwimmerList({
  swimmers,
  loading = false,
  teams = [],
  onAdd,
  onEdit,
}: SwimmerListProps) {
  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState<string>("all");
  const [genderFilter, setGenderFilter] = useState<string>("all");

  // Filter swimmers
  const filteredSwimmers = swimmers.filter((swimmer) => {
    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      if (
        !swimmer.name.toLowerCase().includes(searchLower) &&
        !swimmer.team?.name.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }

    // Team filter
    if (teamFilter !== "all") {
      if (teamFilter === "none" && swimmer.team) return false;
      if (teamFilter !== "none" && swimmer.team?.id !== teamFilter) return false;
    }

    // Gender filter
    if (genderFilter !== "all" && swimmer.gender_code !== genderFilter) {
      return false;
    }

    return true;
  });

  const getInitials = (name: string) => {
    return name.slice(0, 1);
  };

  const formatBirthDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "yyyy/MM/dd");
    } catch {
      return dateStr;
    }
  };

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return <SwimmerListSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <SearchInput
            placeholder="搜尋選手姓名或泳隊..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
            className="w-full sm:w-64"
          />

          <div className="flex gap-2">
            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="性別" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="M">男</SelectItem>
                <SelectItem value="F">女</SelectItem>
              </SelectContent>
            </Select>

            {teams.length > 0 && (
              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="泳隊" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部泳隊</SelectItem>
                  <SelectItem value="none">無泳隊</SelectItem>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {onAdd && (
          <Button onClick={onAdd}>
            <Plus className="h-4 w-4 mr-2" />
            新增選手
          </Button>
        )}
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        共 {filteredSwimmers.length} 位選手
        {search && ` (搜尋: "${search}")`}
      </p>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>姓名</TableHead>
                <TableHead>性別</TableHead>
                <TableHead>生日</TableHead>
                <TableHead>年齡</TableHead>
                <TableHead>泳隊</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSwimmers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    {search ? "沒有符合的選手" : "尚無選手資料"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredSwimmers.map((swimmer) => (
                  <TableRow
                    key={swimmer.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onEdit?.(swimmer)}
                  >
                    <TableCell>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={swimmer.photo_url ?? undefined} />
                        <AvatarFallback>{getInitials(swimmer.name)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{swimmer.name}</TableCell>
                    <TableCell>{swimmer.gender_code === "M" ? "男" : "女"}</TableCell>
                    <TableCell>{formatBirthDate(swimmer.birth_date)}</TableCell>
                    <TableCell>{calculateAge(swimmer.birth_date)} 歲</TableCell>
                    <TableCell>{swimmer.team?.name ?? "-"}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit?.(swimmer);
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-3 md:hidden">
        {filteredSwimmers.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              {search ? "沒有符合的選手" : "尚無選手資料"}
            </CardContent>
          </Card>
        ) : (
          filteredSwimmers.map((swimmer) => (
            <Card
              key={swimmer.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onEdit?.(swimmer)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={swimmer.photo_url ?? undefined} />
                    <AvatarFallback className="text-lg">
                      {getInitials(swimmer.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium truncate">{swimmer.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        {swimmer.gender_code === "M" ? "男" : "女"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatBirthDate(swimmer.birth_date)} ({calculateAge(swimmer.birth_date)} 歲)
                    </p>
                    {swimmer.team && (
                      <p className="text-sm text-muted-foreground truncate">
                        {swimmer.team.name}
                      </p>
                    )}
                  </div>
                  <Button variant="ghost" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

function SwimmerListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-14 w-14 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
