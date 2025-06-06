"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageFormSchema, MessageFormData } from "@/lib/schemas/message";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, User, Users, Image as ImageIcon, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

interface MessageFormProps {
  onAddMessage: (data: MessageFormData) => void;
  currentUserName?: string;
  otherUserName?: string;
}

export function MessageForm({
  onAddMessage,
  currentUserName,
  otherUserName,
}: MessageFormProps) {
  const [isUserMessage, setIsUserMessage] = useState(true);
  const [messageType, setMessageType] = useState<"text" | "image">("text");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getCurrentTime = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    return {
      hour,
      minute,
    };
  };

  const [timeState, setTimeState] = useState(() => getCurrentTime());

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      content: "",
      isUserMessage: true,
      hour: timeState.hour,
      minute: timeState.minute,
      type: "text",
      imageUrl: "",
      imageAlt: "",
    },
  });

  useEffect(() => {
    setValue("isUserMessage", isUserMessage);
  }, [isUserMessage, setValue]);

  useEffect(() => {
    setValue("type", messageType);
  }, [messageType, setValue]);

  useEffect(() => {
    setValue("hour", timeState.hour);
    setValue("minute", timeState.minute);
  }, [timeState, setValue]);

  useEffect(() => {
    // Auto-focus on mount
    if (messageType === "text") {
      setFocus("content");
    }
  }, [setFocus, messageType]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setSelectedImage(dataUrl);
        setValue("imageUrl", dataUrl);
        setValue("imageAlt", file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setValue("imageUrl", "");
    setValue("imageAlt", "");
  };

  const onSubmit = (data: MessageFormData) => {
    const formData = {
      ...data,
      hour: timeState.hour,
      minute: timeState.minute,
      type: messageType,
    };

    onAddMessage(formData);
    reset({
      content: "",
      isUserMessage,
      hour: timeState.hour,
      minute: timeState.minute,
      type: "text",
      imageUrl: "",
      imageAlt: "",
    });
    setMessageType("text");
    setSelectedImage(null);
    setTimeState(getCurrentTime());
    if (messageType === "text") {
      setFocus("content");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Cmd/Ctrl + Enter to submit
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
    // Tab to switch sender
    if (e.key === "Tab") {
      e.preventDefault();
      setIsUserMessage(!isUserMessage);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Add Message</span>
          <div className="flex items-center gap-2 text-sm font-normal">
            <kbd className="px-2 py-1 text-xs bg-muted rounded">Tab</kbd>
            <span className="text-muted-foreground">to switch sender</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Sender Toggle */}
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <Label
                htmlFor="sender"
                className="text-sm font-medium"
              >
                Sender:
              </Label>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm ${
                    !isUserMessage ? "font-semibold" : "text-muted-foreground"
                  }`}
                >
                  {otherUserName}
                </span>
                <Switch
                  id="sender"
                  checked={isUserMessage}
                  onCheckedChange={setIsUserMessage}
                  className="data-[state=checked]:bg-primary"
                />
                <span
                  className={`text-sm ${
                    isUserMessage ? "font-semibold" : "text-muted-foreground"
                  }`}
                >
                  {currentUserName}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isUserMessage ? (
                <User className="w-4 h-4 text-primary" />
              ) : (
                <Users className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          </div>

          {/* Message Content with Tabs */}
          <Tabs
            value={messageType}
            onValueChange={(value) => setMessageType(value as "text" | "image")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text">Text Message</TabsTrigger>
              <TabsTrigger
                value="image"
                className="flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                Image
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="text"
              className="space-y-2 mt-4"
            >
              <Label htmlFor="content">Message</Label>
              <Textarea
                id="content"
                {...register("content")}
                placeholder={`Type a message as ${
                  isUserMessage ? currentUserName! : otherUserName!
                }...`}
                className="min-h-[80px] resize-none"
                onKeyDown={handleKeyDown}
              />
              {errors.content && (
                <p className="text-sm text-destructive">
                  {errors.content.message}
                </p>
              )}
            </TabsContent>

            <TabsContent
              value="image"
              className="space-y-2 mt-4"
            >
              <Label>Image</Label>
              <div className="space-y-3">
                {!selectedImage ? (
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span>{" "}
                          an image
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="relative inline-block">
                    <Image
                      src={selectedImage}
                      alt="Image preview"
                      width={300}
                      height={300}
                      className="max-w-xs rounded-lg border object-cover"
                    />
                    <Button
                      type="button"
                      onClick={removeImage}
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
              {errors.content && (
                <p className="text-sm text-destructive">
                  {errors.content.message}
                </p>
              )}
            </TabsContent>
          </Tabs>

          {/* Time Picker */}
          <div className="space-y-2">
            <Label>Timestamp</Label>
            <div className="flex gap-2 items-center">
              {/* Hour */}
              <Select
                value={timeState.hour.toString().padStart(2, "0")}
                onValueChange={(value) =>
                  setTimeState((prev) => ({ ...prev, hour: parseInt(value) }))
                }
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                    <SelectItem
                      key={hour}
                      value={hour.toString().padStart(2, "0")}
                    >
                      {hour.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <span className="text-muted-foreground">:</span>

              {/* Minute */}
              <Select
                value={timeState.minute.toString().padStart(2, "0")}
                onValueChange={(value) =>
                  setTimeState((prev) => ({ ...prev, minute: parseInt(value) }))
                }
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                    <SelectItem
                      key={minute}
                      value={minute.toString().padStart(2, "0")}
                    >
                      {minute.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Press{" "}
              <kbd className="px-1.5 py-0.5 bg-muted rounded">
                Cmd/Ctrl + Enter
              </kbd>{" "}
              to send
            </div>
            <Button
              type="submit"
              className="flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Add Message
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
