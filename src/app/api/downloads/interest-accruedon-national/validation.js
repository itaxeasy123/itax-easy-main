import regex from '@/utils/regex';
import { z } from 'zod';

export const createInterestAcc = z.object({
  listNumber: z.string().min(1, 'List number is required'),
  financeAct: z.string().min(1, 'Finance Act is required'),
  doc: z.array(
    z.object({
      purchaseDuration: z.string().min(1, 'Purchase duration is required'),
      interestRatesAccrued: z.array(
        z.object({
          duration: z.string().min(1, 'Duration is required'),
          rate: z.number().min(0, 'Interest rate is required'),
        }),
      ),
    }),
  ),
});

export const getInterestAcc = z.object({
  listNumber: z.string().max(10, 'List number is required. i.e ixth'),
  year: z.string().regex(regex.YYYY),
});
