import { z } from 'zod';

export const validationSchema = z
  .object({
    currencyAmount: z
      .number({ required_error: 'Введите сумму списания', invalid_type_error: 'Введите сумму списания' })
      .min(0, { message: 'Сумма не может быть отрицательной' }),
    description: z.string().optional(),
    date: z.string({ required_error: 'Выберите дату' }),
    cardId: z.string({ required_error: 'Выберите карту списания' }),
    toCardId: z.string({ required_error: 'Выберите карту зачисления' }),
    toCurrencyAmount: z
      .number({ required_error: 'Введите сумму пополнения', invalid_type_error: 'Введите сумму пополнения' })
      .min(0, { message: 'Сумма не может быть отрицательной' }),
  })
  .refine(({ cardId, toCardId }) => cardId !== toCardId, {
    message: 'Карты списания и зачисления не могут совпадать',
    path: ['cardId', 'toCardId'],
  });
