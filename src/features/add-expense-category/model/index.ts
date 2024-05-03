import { z } from 'zod';

export const validationSchema = z.object({
  name: z
    .string({ required_error: 'Введите название категории' })
    .min(1, { message: 'Введите название категории' })
    .max(50, { message: 'Максимальная длина названия категории 50 символов' }),
  limit: z.number().min(0, { message: 'Лимит не может быть меньше нуля' }).optional(),
  icon: z.string(),
});
