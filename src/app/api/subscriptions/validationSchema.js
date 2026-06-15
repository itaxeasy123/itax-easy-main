import { z } from 'zod';

export const createOrder = z.object({
  serviceIds: z.array(z.string()).optional(),
  registerServiceIds: z.array(z.number()).optional(),
  registerStartupIds: z.array(z.number()).optional(),
});

export const updateSubs = z.object({
  status: z.string().min(1, 'Status is required'),
  txnid: z.string().min(1, 'Transaction id is required.'),
  pid: z.string().min(1, 'Payment id is required.'),
});
