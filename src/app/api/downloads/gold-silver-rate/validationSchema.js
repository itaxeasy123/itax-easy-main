import { z } from 'zod';
import regex from '@/utils/regex';

export const createGoldAndSilverSchema = z.object({
  assessmentYear: z.string().regex(regex.DDMMYYYY),
  stGoldRateFor10Gram: z.string().regex(regex.stringNumberRegex),
  stSilverRateFor1kg: z.string().regex(regex.stringNumberRegex),
});

export const updateGoldAndSilverSchema = z.array(
  z.object({
    assessmentYear: z.string().regex(regex.DDMMYYYY),
    stGoldRateFor10Gram: z.string().regex(regex.stringNumberRegex),
    stSilverRateFor1kg: z.string().regex(regex.stringNumberRegex),
  }),
);
