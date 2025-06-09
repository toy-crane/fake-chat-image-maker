import { z } from 'zod';

const TIME_REGEX = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
const TIME_ERROR_MESSAGE = "Invalid time format. Use HH:MM";
const CONTENT_REQUIRED_MESSAGE = 'Message content or image is required';
const MIN_MESSAGES_ERROR = 'At least one message is required';

export const messageFormSchema = z.object({
  content: z.string().optional(),
  isUserMessage: z.boolean(),
  time: z.string().regex(TIME_REGEX, TIME_ERROR_MESSAGE),
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
  message: CONTENT_REQUIRED_MESSAGE,
  path: ['content'],
});

export type MessageFormData = z.infer<typeof messageFormSchema>;

export const bulkImportSchema = z.array(messageFormSchema).min(1, {
  message: MIN_MESSAGES_ERROR,
});

export type BulkImportData = z.infer<typeof bulkImportSchema>;