/**
 * SwimmersPage - 選手管理頁面
 */
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/authStore";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/custom";
import { SwimmerList, SwimmerForm, type Swimmer } from "@/components/swimmers";
import { Users, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// TODO: Get from tenant context
const TEMP_TENANT_ID = "00000000-0000-0000-0000-000000000001";

export default function SwimmersPage() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [editingSwimmer, setEditingSwimmer] = useState<Swimmer | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Use Sheet on mobile, Dialog on desktop
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch swimmers
  const { data: swimmers = [], isLoading: loadingSwimmers } = useQuery({
    queryKey: ["swimmers", TEMP_TENANT_ID],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("swimmers")
        .select(`
          id,
          name,
          gender_code,
          birth_date,
          photo_url,
          contact_email,
          contact_phone,
          is_active,
          team:teams(id, name)
        `)
        .eq("tenant_id", TEMP_TENANT_ID)
        .eq("is_active", true)
        .order("name");

      if (error) throw error;
      return data as Swimmer[];
    },
    enabled: !!user,
  });

  // Fetch teams for dropdown
  const { data: teams = [] } = useQuery({
    queryKey: ["teams", TEMP_TENANT_ID],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("teams")
        .select("id, name")
        .eq("tenant_id", TEMP_TENANT_ID)
        .eq("is_active", true)
        .order("name");

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["swimmers"] });
    setEditingSwimmer(null);
    setIsAdding(false);
  };

  const handleClose = () => {
    setEditingSwimmer(null);
    setIsAdding(false);
  };

  const isOpen = isAdding || !!editingSwimmer;

  // Form component
  const formContent = (
    <SwimmerForm
      initialData={
        editingSwimmer
          ? {
              id: editingSwimmer.id,
              name: editingSwimmer.name,
              gender_code: editingSwimmer.gender_code,
              birth_date: editingSwimmer.birth_date,
              photo_url: editingSwimmer.photo_url,
              team_id: editingSwimmer.team?.id,
              contact_email: editingSwimmer.contact_email ?? undefined,
              contact_phone: editingSwimmer.contact_phone ?? undefined,
            }
          : undefined
      }
      tenantId={TEMP_TENANT_ID}
      teams={teams}
      onSuccess={handleSuccess}
      onCancel={handleClose}
    />
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold">選手管理</h1>
                <p className="text-sm text-muted-foreground">管理選手資料與照片</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        {!user ? (
          <div className="text-center py-16">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">請先登入</h3>
            <p className="text-gray-500">登入後即可管理選手資料</p>
          </div>
        ) : (
          <SwimmerList
            swimmers={swimmers}
            loading={loadingSwimmers}
            teams={teams}
            onAdd={() => setIsAdding(true)}
            onEdit={(swimmer) => setEditingSwimmer(swimmer)}
          />
        )}
      </main>

      {/* Mobile: Sheet */}
      {isMobile ? (
        <Sheet open={isOpen} onOpenChange={(open) => !open && handleClose()}>
          <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
            <SheetHeader className="mb-4">
              <SheetTitle>
                {editingSwimmer ? "編輯選手" : "新增選手"}
              </SheetTitle>
            </SheetHeader>
            {formContent}
          </SheetContent>
        </Sheet>
      ) : (
        /* Desktop: Dialog */
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSwimmer ? "編輯選手" : "新增選手"}
              </DialogTitle>
            </DialogHeader>
            {formContent}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
