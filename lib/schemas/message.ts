import { z } from 'zod';

export const messageFormSchema = z.object({
  content: z.string().optional(),
  isUserMessage: z.boolean(),
  hour: z.number().min(0).max(23),
  minute: z.number().min(0).max(59),
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

export const bulkImportSchema = z.array(messageFormSchema).min(1, {
  message: 'At least one message is required',
});

export type BulkImportData = z.infer<typeof bulkImportSchema>;