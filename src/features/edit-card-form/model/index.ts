import { z } from 'zod';
import { CardColor } from '@/shared/api';

export const validationSchema = z.object({
  name: z
    .string({
      required_error: 'Введите название карты',
    })
    .min(1, { message: 'Введите название карты' })
    .max(50, { message: 'Максимальная длина названия карты 50 символов' }),
  label: z
    .string()
    .regex(/^(|\d{4})$/, { message: 'Введите 4 цифры' })
    .optional(),
  initialBalance: z
    .number({ required_error: 'Введите начальный баланс', invalid_type_error: 'Введите начальный баланс' })
    .min(0, { message: 'Начальный баланс не может быть отрицательным' }),
  color: z.nativeEnum(CardColor),
  currency: z.string({ required_error: 'Выберите валюту' }),
});
