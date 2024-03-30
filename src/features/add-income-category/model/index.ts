import { z } from 'zod';

export const validationSchema = z.object({
  name: z
    .string({ required_error: 'Введите название категории' })
    .min(1, { message: 'Введите название категории' })
    .max(50, { message: 'Максимальная длина названия категории 50 символов' }),
  icon: z.string(),
});
