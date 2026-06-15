import { z } from 'zod';
import regex from '@/utils/regex';

export const getCountryCodeListSchema = z.object({
  pageNum: z.string().regex(regex.stringNumberRegex).default('1'),
  limit: z.string().regex(regex.stringNumberRegex).default('10'),
  assessYear: z
    .string()
    .regex(
      regex.assessYearRegex,
      'Assess Year is not valid, Required format is like: 2010-2011',
    ),
  search: z.string().max(30, 'Search query is too long!').optional(),
});

export const createCountryCodeListSchema = z.object({
  assessYear: z
    .string()
    .regex(
      regex.assessYearRegex,
      'Assess Year is not valid, Required format is like: 2010-2011',
    ),
  countryCodes: z.array(
    z.object({
      countryCode: z
        .string()
        .regex(regex.stringNumberRegex, 'Code has to be a number.')
        .min(1, 'Country code is required.'),
      countryName: z.string().min(1, 'Country name is required.'),
    }),
  ),
});
