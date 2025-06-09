"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  messageFormSchema,
  MessageFormData,
  bulkImportSchema,
  BulkImportData,
} from "@/lib/schemas/message";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Send,
  User,
  Users,
  Image as ImageIcon,
  X,
  UserPlus,
  RotateCcw,
  Upload,
  FileText,
  Copy,
  Check,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const JSON_FORMAT_EXAMPLE = `[
  {
    "type": "text",
    "content": "Hello world!",
    "isUserMessage": true,
    "time": "14:30"
  },
  {
    "type": "image", 
    "imageUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
    "imageAlt": "Photo description",
    "isUserMessage": false,
    "time": "14:35"
  }
]`;

const AI_PROMPT_TEXT = `Generate a JSON array of realistic chat messages using this format:

<example>
[
  {
    "content": "Hey! How's your day going?",
    "isUserMessage": true,
    "timestamp": "14:30",
    "hasImage": false
  },
  {
    "content": "Pretty good! Just finished lunch",
    "isUserMessage": false,  
    "timestamp": "14:32",
    "hasImage": false
  },
  {
    "content": "Check out this cool photo I took!",
    "isUserMessage": true,
    "timestamp": "14:35",
    "hasImage": true,
    "imageUrl": "data:image/jpeg;base64,/9j/4AAQ..."
  }
]
</example>

Include natural conversation flow, mix text/image messages, alternate speakers with isUserMessage true/false, and use HH:MM timestamps.`;
interface MessageFormProps {
  onAddMessage: (data: MessageFormData) => void;
  onAddBulkMessages?: (data: BulkImportData) => void;
  currentUserName?: string;
  otherUserName?: string;
  onClearMessages?: () => void;
  messagesCount?: number;
}

export function MessageForm({
  onAddMessage,
  onAddBulkMessages,
  currentUserName,
  otherUserName,
  onClearMessages,
  messagesCount = 0,
}: MessageFormProps) {
  const [isUserMessage, setIsUserMessage] = useState(true);
  const [messageType, setMessageType] = useState<"text" | "image">("text");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getCurrentTime = () => {
    const now = new Date();
    const hour = now.getHours().toString().padStart(2, "0");
    const minute = now.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`;
  };

  const [timeValue, setTimeValue] = useState(() => getCurrentTime());

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
      time: timeValue,
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
    setValue("time", timeValue);
  }, [timeValue, setValue]);

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

  const processJsonFile = async (file: File) => {
    setImportError(null);

    // Check file type
    if (!file.type.includes('json') && !file.name.endsWith('.json')) {
      setImportError('Please select a valid JSON file.');
      return;
    }

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);

      // Validate the JSON structure
      const validatedData = bulkImportSchema.parse(jsonData);

      // Call the bulk import function if available
      if (onAddBulkMessages) {
        onAddBulkMessages(validatedData);
        setShowImportDialog(false);
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        setImportError(
          "Invalid JSON format. Please check your file and try again."
        );
      } else if (error instanceof Error) {
        setImportError(`Validation errors: ${error.message}`);
      } else {
        setImportError(
          "An unexpected error occurred while processing the file."
        );
      }
    }
  };

  const handleJsonFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    await processJsonFile(file);

    // Reset the file input
    event.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const jsonFile = files.find(file => 
      file.type.includes('json') || file.name.endsWith('.json')
    );

    if (!jsonFile) {
      setImportError('Please drop a valid JSON file.');
      return;
    }

    await processJsonFile(jsonFile);
  };

  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(AI_PROMPT_TEXT);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const onSubmit = (data: MessageFormData) => {
    const formData = {
      ...data,
      time: timeValue,
      type: messageType,
    };

    onAddMessage(formData);
    reset({
      content: "",
      isUserMessage,
      time: timeValue,
      type: "text",
      imageUrl: "",
      imageAlt: "",
    });
    setMessageType("text");
    setSelectedImage(null);
    setTimeValue(getCurrentTime());
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

  // Show empty state if profiles aren't set up
  if (!currentUserName || !otherUserName) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Add Message</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <div className="rounded-full bg-muted p-4">
              <UserPlus className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Set up profiles first</h3>
              <p className="text-muted-foreground max-w-sm">
                You need to create user profiles before you can start adding
                messages. Switch to the Profiles tab to add your name and your
                chat partner&apos;s name.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Add Message</span>
          <div className="flex items-center gap-2">
            {onAddBulkMessages && (
              <Dialog
                open={showImportDialog}
                onOpenChange={setShowImportDialog}
              >
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Import JSON
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                  <DialogHeader>
                    <DialogTitle>Import Messages from JSON</DialogTitle>
                    <DialogDescription>
                      Upload a JSON file containing an array of messages to bulk
                      import them.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 overflow-y-auto flex-1">
                    {/* File Upload - Moved to top */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Upload JSON File</h4>
                      <div 
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                          isDragOver 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50 hover:bg-muted/50'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={handleDropZoneClick}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".json,application/json"
                          onChange={handleJsonFileUpload}
                          className="hidden"
                          id="json-upload"
                        />
                        <div className="flex flex-col items-center gap-2">
                          <Upload className={`w-8 h-8 transition-colors ${
                            isDragOver ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                          <span className="text-sm font-medium">
                            {isDragOver ? 'Drop JSON file here' : 'Choose or drag JSON file'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            .json files only
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Error Display */}
                    {importError && (
                      <Alert variant="destructive">
                        <X className="h-4 w-4" />
                        <div>
                          <strong>Import Failed</strong>
                          <p className="text-sm mt-1">{importError}</p>
                          <p className="text-xs mt-2 text-muted-foreground">
                            Please check the JSON format and try again.
                          </p>
                        </div>
                      </Alert>
                    )}

                    {/* Accordion for JSON Format and AI Prompt */}
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="json-format">
                        <AccordionTrigger>JSON Format Documentation</AccordionTrigger>
                        <AccordionContent>
                          <div className="bg-muted p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-2">
                              Array of message objects with the following structure:
                            </p>
                            <pre className="text-xs overflow-x-auto">
                              {JSON_FORMAT_EXAMPLE}
                            </pre>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="ai-prompt">
                        <AccordionTrigger>AI Prompt Template</AccordionTrigger>
                        <AccordionContent>
                          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm text-blue-700">
                                <FileText className="w-4 h-4 inline mr-1" />
                                Copy this prompt to your AI assistant:
                              </p>
                              <Button
                                type="button"
                                onClick={handleCopyPrompt}
                                variant="outline"
                                size="sm"
                                className="h-8 px-3 text-xs"
                              >
                                {isCopied ? (
                                  <>
                                    <Check className="w-3 h-3 mr-1" />
                                    Copied!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3 mr-1" />
                                    Copy
                                  </>
                                )}
                              </Button>
                            </div>
                            <div className="bg-white p-3 rounded border text-xs font-mono">
                              <p className="mb-3">Generate a JSON array of realistic chat messages using this format:</p>
                              
                              <div className="bg-gray-50 p-3 rounded mb-3 overflow-x-auto">
                                <pre className="whitespace-pre-wrap text-xs">
{`<example>
[
  {
    "content": "Hey! How's your day going?",
    "isUserMessage": true,
    "timestamp": "14:30",
    "hasImage": false
  },
  {
    "content": "Pretty good! Just finished lunch",
    "isUserMessage": false,  
    "timestamp": "14:32",
    "hasImage": false
  },
  {
    "content": "Check out this cool photo I took!",
    "isUserMessage": true,
    "timestamp": "14:35",
    "hasImage": true,
    "imageUrl": "data:image/jpeg;base64,/9j/4AAQ..."
  }
]
</example>`}
                                </pre>
                              </div>
                              
                              <p className="text-xs">Include natural conversation flow, mix text/image messages, alternate speakers with isUserMessage true/false, and use HH:MM timestamps.</p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            {onClearMessages && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onClearMessages}
                disabled={messagesCount === 0}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset Messages
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Tab to switch sender */}
          <div className="flex items-center justify-end gap-1 text-sm font-normal">
            <kbd className="px-2 py-1 text-xs bg-muted rounded">Tab</kbd>
            <span className="text-muted-foreground">to switch sender</span>
          </div>
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
            <Label htmlFor="time">Timestamp</Label>
            <Input
              id="time"
              type="time"
              value={timeValue}
              onChange={(e) => setTimeValue(e.target.value)}
            />
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
