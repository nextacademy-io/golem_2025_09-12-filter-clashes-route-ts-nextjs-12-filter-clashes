import { z } from 'zod';

export const createClashSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().min(1, 'Location is required'),
  address: z.string().min(1, 'Address is required'),
  date: z.string().min(1, 'Date is required'),
  pictureUrl: z.string().url('Must be a valid URL'),
  participantIds: z.array(z.string()).default([]),
  createdByPeerId: z.string().min(1, 'Valid peer ID required'),
});

export type CreateClashFormData = z.infer<typeof createClashSchema>;
