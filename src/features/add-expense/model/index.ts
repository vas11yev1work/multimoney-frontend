import { z } from 'zod';

export const validationSchema = z.object({
  currencyAmount: z
    .number({ required_error: 'Введите сумму', invalid_type_error: 'Введите сумму' })
    .min(0, { message: 'Сумма не может быть отрицательной' }),
  description: z.string().optional(),
  date: z.string({ required_error: 'Выберите дату' }),
  cardId: z.string({ required_error: 'Выберите карту' }),
  categoryId: z.string({ required_error: 'Выберите категорию' }),
});
