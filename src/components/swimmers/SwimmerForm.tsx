/**
 * SwimmerForm - 選手資料表單
 */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  FormField,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
} from "@/components/custom";
import { PhotoUpload } from "@/components/custom/PhotoUpload";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

// Form validation schema
const swimmerSchema = z.object({
  name: z.string().min(2, "姓名至少 2 個字").max(50, "姓名最多 50 個字"),
  gender_code: z.enum(["M", "F"]),
  birth_date: z.string().min(1, "請選擇生日"),
  team_id: z.string().optional(),
  contact_email: z.string().email("請輸入有效的 Email").optional().or(z.literal("")),
  contact_phone: z.string().optional(),
  emergency_contact_name: z.string().optional(),
  emergency_contact_phone: z.string().optional(),
  photo_url: z.string().nullable().optional(),
});

type SwimmerFormData = z.infer<typeof swimmerSchema>;

export interface SwimmerFormProps {
  /** 編輯模式時傳入現有資料 */
  initialData?: Partial<SwimmerFormData> & { id?: string };
  /** 租戶 ID */
  tenantId: string;
  /** 可選的泳隊列表 */
  teams?: Array<{ id: string; name: string }>;
  /** 儲存成功後觸發 */
  onSuccess?: () => void;
  /** 取消時觸發 */
  onCancel?: () => void;
}

export function SwimmerForm({
  initialData,
  tenantId,
  teams = [],
  onSuccess,
  onCancel,
}: SwimmerFormProps) {
  const [saving, setSaving] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(
    initialData?.photo_url ?? null
  );

  const isEditing = !!initialData?.id;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SwimmerFormData>({
    resolver: zodResolver(swimmerSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      gender_code: initialData?.gender_code,
      birth_date: initialData?.birth_date ?? "",
      team_id: initialData?.team_id ?? "",
      contact_email: initialData?.contact_email ?? "",
      contact_phone: initialData?.contact_phone ?? "",
      emergency_contact_name: initialData?.emergency_contact_name ?? "",
      emergency_contact_phone: initialData?.emergency_contact_phone ?? "",
      photo_url: initialData?.photo_url ?? null,
    },
  });

  const onSubmit = async (data: SwimmerFormData) => {
    setSaving(true);

    try {
      const swimmerData = {
        name: data.name,
        gender_code: data.gender_code,
        birth_date: data.birth_date,
        tenant_id: tenantId,
        photo_url: photoUrl,
        team_id: data.team_id || null,
        contact_email: data.contact_email || null,
        contact_phone: data.contact_phone || null,
        emergency_contact_name: data.emergency_contact_name || null,
        emergency_contact_phone: data.emergency_contact_phone || null,
      };

      if (isEditing && initialData?.id) {
        // Update existing swimmer
        const { error } = await supabase
          .from("swimmers")
          .update(swimmerData as never)
          .eq("id", initialData.id);

        if (error) throw error;
        toast.success("選手資料已更新");
      } else {
        // Create new swimmer
        const { error } = await supabase
          .from("swimmers")
          .insert(swimmerData as never);

        if (error) throw error;
        toast.success("選手資料已建立");
      }

      onSuccess?.();
    } catch (error) {
      console.error("Save swimmer error:", error);
      toast.error("儲存失敗，請稍後再試");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Photo Upload */}
      <div className="flex justify-center">
        <PhotoUpload
          value={photoUrl}
          onChange={setPhotoUrl}
          pathPrefix={`${tenantId}/`}
          size="lg"
        />
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="姓名"
          required
          error={errors.name?.message}
          {...register("name")}
        />

        <div className="space-y-2">
          <Label>
            性別 <span className="text-red-500">*</span>
          </Label>
          <Select
            value={watch("gender_code")}
            onValueChange={(value) =>
              setValue("gender_code", value as "M" | "F")
            }
          >
            <SelectTrigger className={errors.gender_code ? "border-red-500" : ""}>
              <SelectValue placeholder="選擇性別" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M">男</SelectItem>
              <SelectItem value="F">女</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender_code && (
            <p className="text-sm text-red-500">{errors.gender_code.message}</p>
          )}
        </div>

        <FormField
          label="生日"
          type="date"
          required
          error={errors.birth_date?.message}
          {...register("birth_date")}
        />

        {teams.length > 0 && (
          <div className="space-y-2">
            <Label>所屬泳隊</Label>
            <Select
              value={watch("team_id") || ""}
              onValueChange={(value) => setValue("team_id", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="選擇泳隊 (可不選)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">無</SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Contact Info */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">聯絡資訊</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Email"
            type="email"
            error={errors.contact_email?.message}
            {...register("contact_email")}
          />
          <FormField
            label="電話"
            type="tel"
            error={errors.contact_phone?.message}
            {...register("contact_phone")}
          />
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">緊急聯絡人</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="姓名"
            error={errors.emergency_contact_name?.message}
            {...register("emergency_contact_name")}
          />
          <FormField
            label="電話"
            type="tel"
            error={errors.emergency_contact_phone?.message}
            {...register("emergency_contact_phone")}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            取消
          </Button>
        )}
        <Button type="submit" loading={saving}>
          {isEditing ? "儲存變更" : "建立選手"}
        </Button>
      </div>
    </form>
  );
}
