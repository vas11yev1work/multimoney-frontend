import { Currency } from '@/shared/lib';

const KZT = 473.96;
const RUB = 98.43;
const USD = 1.08;

export const quotes = {
  KZT,
  RUB,
  USD,
  EUR: 1,
} as Record<Currency, number>;
