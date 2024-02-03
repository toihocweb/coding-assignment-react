import * as z from 'zod';

export const createTicketSchema = z.object({
  description: z.string(),
});

export const updateTicketSchema = z.object({
  description: z.string().optional(),
  assigneeId: z.string(),
});

export type CreateTicketDto = z.infer<typeof createTicketSchema>;
export type UpdateTicketDto = z.infer<typeof updateTicketSchema>;
