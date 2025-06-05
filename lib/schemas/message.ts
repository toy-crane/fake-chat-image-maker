import { z } from 'zod';

export const messageFormSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty').max(500, 'Message is too long'),
  isUserMessage: z.boolean(),
  timestamp: z.string().optional(),
});

export type MessageFormData = z.infer<typeof messageFormSchema>;