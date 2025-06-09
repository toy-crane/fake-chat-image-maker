"use client";

import { User } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, X, RotateCcw } from "lucide-react";

const DEFAULT_CURRENT_USER: User = { id: "me", name: "", avatar: "" };
const DEFAULT_OTHER_USER: User = { id: "other", name: "", avatar: "" };

interface ProfileFormProps {
  currentUser?: User;
  otherUser?: User;
  onUpdateUsers: (currentUser: User, otherUser: User) => void;
}

export function ProfileForm({
  currentUser,
  otherUser,
  onUpdateUsers,
}: ProfileFormProps) {
  const updateCurrentUser = (updates: Partial<User>) => {
    onUpdateUsers(
      { ...currentUser, ...updates, id: "me" },
      { ...otherUser, id: "other" }
    );
  };

  const updateOtherUser = (updates: Partial<User>) => {
    onUpdateUsers(
      { ...currentUser, id: "me" },
      { ...otherUser, ...updates, id: "other" }
    );
  };

  const resetProfiles = () => {
    onUpdateUsers(DEFAULT_CURRENT_USER, DEFAULT_OTHER_USER);
  };

  const handleImageUpload = (
    file: File,
    userType: "currentUser" | "otherUser"
  ) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (userType === "currentUser") {
          updateCurrentUser({ avatar: result });
        } else {
          updateOtherUser({ avatar: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Profiles
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={resetProfiles}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Profiles
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current User */}
          <div className="space-y-4">
            <h3 className="font-medium">You</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar
                  className="h-10 w-10 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) handleImageUpload(file, "currentUser");
                    };
                    input.click();
                  }}
                >
                  <AvatarImage src={currentUser?.avatar || undefined} />
                  <AvatarFallback className="text-sm">
                    {currentUser?.name || "You"}
                  </AvatarFallback>
                </Avatar>
                {currentUser?.avatar && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full"
                    onClick={() => updateCurrentUser({ avatar: "" })}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Your name"
                  value={currentUser?.name || ""}
                  onChange={(e) => updateCurrentUser({ name: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Other User */}
          <div className="space-y-4">
            <h3 className="font-medium">Other User</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar
                  className="h-10 w-10 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) handleImageUpload(file, "otherUser");
                    };
                    input.click();
                  }}
                >
                  <AvatarImage src={otherUser?.avatar || undefined} />
                  <AvatarFallback className="text-sm">
                    {otherUser?.name || "Other"}
                  </AvatarFallback>
                </Avatar>
                {otherUser?.avatar && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full"
                    onClick={() => updateOtherUser({ avatar: "" })}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Partner name"
                  value={otherUser?.name || ""}
                  onChange={(e) => updateOtherUser({ name: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
