import { z } from 'zod';

export const messageFormSchema = z.object({
  content: z.string().optional(),
  isUserMessage: z.boolean(),
  timestamp: z.string().optional(),
  type: z.enum(['text', 'image']),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
}).refine((data) => {
  if (data.type === 'text') {
    return data.content && data.content.trim().length > 0;
  }
  if (data.type === 'image') {
    return data.imageUrl && data.imageUrl.length > 0;
  }
  return false;
}, {
  message: 'Message content or image is required',
  path: ['content'],
});

export type MessageFormData = z.infer<typeof messageFormSchema>;