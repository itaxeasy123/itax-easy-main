import regex from '@/utils/regex';
import { z } from 'zod';

export const createInflationIndex = z.object({
  financeAct: z.string().regex(regex.financialYearRegex),
  listName: z.string().min(1, 'List name is required*'),
  costInflationIndex: z.array(
    z.object({
      financialYear: z
        .string()
        .regex(regex.assessYearRegex)
        .min(1, 'FY is required*'),
      costInflationIndex: z.number().min(1, 'Index should be at least 1'),
    }),
  ),
});

export const getInflationList = z.object({
  listName: z.string().min(1, 'List name is required*').optional(),
  financialAct: z.string().regex(regex.financialYearRegex).optional(),
});
