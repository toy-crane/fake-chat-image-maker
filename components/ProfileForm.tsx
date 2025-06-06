"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "@/components/kakao/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

const profileFormSchema = z.object({
  currentUser: z.object({
    name: z.string().min(1, "Name required"),
    avatar: z.string().optional(),
  }),
  otherUser: z.object({
    name: z.string().min(1, "Name required"),
    avatar: z.string().optional(),
  }),
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  currentUser: User;
  otherUser: User;
  onUpdateUsers: (currentUser: User, otherUser: User) => void;
}

export function ProfileForm({ currentUser, otherUser, onUpdateUsers }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      currentUser: {
        name: currentUser.name,
        avatar: currentUser.avatar || "",
      },
      otherUser: {
        name: otherUser.name,
        avatar: otherUser.avatar || "",
      },
    },
  });

  const handleImageUpload = (file: File, userType: 'currentUser' | 'otherUser') => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setValue(`${userType}.avatar`, result, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  };


  const onSubmit = (data: ProfileFormData) => {
    onUpdateUsers(
      { ...currentUser, ...data.currentUser },
      { ...otherUser, ...data.otherUser }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Current User */}
      <div className="space-y-4">
        <h3 className="font-medium">You</h3>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={watch("currentUser.avatar")} />
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Input
              placeholder="Your name"
              {...register("currentUser.name")}
            />
            {errors.currentUser?.name && (
              <p className="text-sm text-red-500">{errors.currentUser.name.message}</p>
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) handleImageUpload(file, 'currentUser');
              };
              input.click();
            }}
          >
            <Upload className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Other User */}
      <div className="space-y-4">
        <h3 className="font-medium">Chat Partner</h3>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={watch("otherUser.avatar")} />
            <AvatarFallback>CP</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Input
              placeholder="Partner name"
              {...register("otherUser.name")}
            />
            {errors.otherUser?.name && (
              <p className="text-sm text-red-500">{errors.otherUser.name.message}</p>
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) handleImageUpload(file, 'otherUser');
              };
              input.click();
            }}
          >
            <Upload className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button type="submit" disabled={!isDirty} className="w-full">
        Update
      </Button>
    </form>
  );
}