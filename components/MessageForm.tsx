'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { messageFormSchema, MessageFormData } from '@/lib/schemas/message';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, User, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MessageFormProps {
  onAddMessage: (data: MessageFormData) => void;
  currentUserName: string;
  otherUserName: string;
}

export function MessageForm({ onAddMessage, currentUserName, otherUserName }: MessageFormProps) {
  const [isUserMessage, setIsUserMessage] = useState(true);
  
  const getCurrentTime = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    return {
      hour,
      minute
    };
  };

  const getCurrentTimeString = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const [timeState, setTimeState] = useState(() => getCurrentTime());

  const formatTimeFromState = () => {
    const { hour, minute } = timeState;
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
    return `${formattedHour}:${formattedMinute}`;
  };

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
      content: '',
      isUserMessage: true,
      timestamp: getCurrentTimeString(),
    },
  });

  useEffect(() => {
    setValue('isUserMessage', isUserMessage);
  }, [isUserMessage, setValue]);

  useEffect(() => {
    // Auto-focus on mount
    setFocus('content');
  }, [setFocus]);

  const onSubmit = (data: MessageFormData) => {
    const formData = {
      ...data,
      timestamp: formatTimeFromState(),
    };
    
    onAddMessage(formData);
    reset({ 
      content: '', 
      isUserMessage 
    });
    setTimeState(getCurrentTime());
    setFocus('content');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Cmd/Ctrl + Enter to submit
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
    // Tab to switch sender
    if (e.key === 'Tab') {
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Sender Toggle */}
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <Label htmlFor="sender" className="text-sm font-medium">
                Sender:
              </Label>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${!isUserMessage ? 'font-semibold' : 'text-muted-foreground'}`}>
                  {otherUserName}
                </span>
                <Switch
                  id="sender"
                  checked={isUserMessage}
                  onCheckedChange={setIsUserMessage}
                  className="data-[state=checked]:bg-primary"
                />
                <span className={`text-sm ${isUserMessage ? 'font-semibold' : 'text-muted-foreground'}`}>
                  {currentUserName} (You)
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

          {/* Message Input */}
          <div className="space-y-2">
            <Label htmlFor="content">Message</Label>
            <Textarea
              id="content"
              {...register('content')}
              placeholder={`Type a message as ${isUserMessage ? currentUserName : otherUserName}...`}
              className="min-h-[80px] resize-none"
              onKeyDown={handleKeyDown}
            />
            {errors.content && (
              <p className="text-sm text-destructive">{errors.content.message}</p>
            )}
          </div>

          {/* Time Picker */}
          <div className="space-y-2">
            <Label>Timestamp</Label>
            <div className="flex gap-2 items-center">
              {/* Hour */}
              <Select 
                value={timeState.hour.toString().padStart(2, '0')} 
                onValueChange={(value) => setTimeState(prev => ({ ...prev, hour: parseInt(value) }))}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                    <SelectItem key={hour} value={hour.toString().padStart(2, '0')}>
                      {hour.toString().padStart(2, '0')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <span className="text-muted-foreground">:</span>
              
              {/* Minute */}
              <Select 
                value={timeState.minute.toString().padStart(2, '0')} 
                onValueChange={(value) => setTimeState(prev => ({ ...prev, minute: parseInt(value) }))}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                    <SelectItem key={minute} value={minute.toString().padStart(2, '0')}>
                      {minute.toString().padStart(2, '0')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Press <kbd className="px-1.5 py-0.5 bg-muted rounded">Cmd/Ctrl + Enter</kbd> to send
            </div>
            <Button type="submit" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Add Message
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}