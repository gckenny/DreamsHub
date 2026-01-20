/**
 * PhotoUpload - 照片上傳元件
 * 用於選手照片上傳，支援預覽、裁切提示
 */
import * as React from "react";
import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { Button } from "@/components/custom/Button";
import { Camera, Upload, X, Loader2, User } from "lucide-react";

export interface PhotoUploadProps {
  /** 目前照片 URL */
  value?: string | null;
  /** 照片變更時觸發 */
  onChange?: (url: string | null) => void;
  /** Storage bucket 名稱 */
  bucket?: string;
  /** 檔案路徑前綴 */
  pathPrefix?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 尺寸 */
  size?: "sm" | "md" | "lg";
  /** 額外 className */
  className?: string;
}

const sizeConfig = {
  sm: { container: "w-20 h-20", icon: "h-6 w-6" },
  md: { container: "w-32 h-32", icon: "h-8 w-8" },
  lg: { container: "w-40 h-40", icon: "h-10 w-10" },
};

export function PhotoUpload({
  value,
  onChange,
  bucket = "swimmer-photos",
  pathPrefix = "",
  disabled = false,
  size = "md",
  className,
}: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sizeClass = sizeConfig[size];

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("請選擇圖片檔案");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("檔案大小不能超過 5MB");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${pathPrefix}${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      onChange?.(urlData.publicUrl);
    } catch (err) {
      console.error("Upload error:", err);
      setError("上傳失敗，請稍後再試");
    } finally {
      setUploading(false);
      // Reset input
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleRemove = async () => {
    if (!value) return;

    // Extract filename from URL
    try {
      const url = new URL(value);
      const pathParts = url.pathname.split("/");
      const fileName = pathParts[pathParts.length - 1];

      // Delete from storage
      await supabase.storage.from(bucket).remove([fileName]);
    } catch (err) {
      console.error("Delete error:", err);
    }

    onChange?.(null);
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {/* Photo Preview */}
      <div
        className={cn(
          "relative rounded-full overflow-hidden bg-muted border-2 border-dashed border-muted-foreground/25",
          sizeClass.container,
          !disabled && "cursor-pointer hover:border-primary/50 transition-colors"
        )}
        onClick={() => !disabled && !uploading && inputRef.current?.click()}
      >
        {value ? (
          <img
            src={value}
            alt="選手照片"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <User className={sizeClass.icon} />
          </div>
        )}

        {/* Overlay */}
        {!disabled && (
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            {uploading ? (
              <Loader2 className="h-6 w-6 text-white animate-spin" />
            ) : (
              <Camera className="h-6 w-6 text-white" />
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-1" />
          ) : (
            <Upload className="h-4 w-4 mr-1" />
          )}
          {value ? "更換照片" : "上傳照片"}
        </Button>

        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={disabled || uploading}
            onClick={handleRemove}
          >
            <X className="h-4 w-4 mr-1" />
            移除
          </Button>
        )}
      </div>

      {/* Error */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Hint */}
      <p className="text-xs text-muted-foreground text-center">
        建議使用正面大頭照
        <br />
        支援 JPG、PNG，最大 5MB
      </p>

      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileSelect}
        disabled={disabled || uploading}
      />
    </div>
  );
}
