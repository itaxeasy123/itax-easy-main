import regex from '@/utils/regex';
import { z } from 'zod';

export const createStatusWisePanCodeAndItCode = z.object({
  financialYear: z
    .string()
    .regex(regex.financialYearRegex, 'FY should be in format YYYY'),
  docs: z.array(
    z.object({
      status: z.string().min(1, 'Status is required*'),
      incomeTaxCode: z.number().min(1, 'Income tax code is required*'),
      panCode: z.string().min(1, 'Pan code is required*'),
    }),
  ),
});

export const getStatusWisePanITCodeValidation = z.object({
  financialYear: z
    .string()
    .regex(regex.financialYearRegex, 'FY should be in format YYYY'),
});
