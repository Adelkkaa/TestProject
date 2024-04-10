
import { z } from 'zod';

export const LoginSchema = z
  .object({
    email: z
      .string({ required_error: 'Введите email' })
      .min(1, 'Необходимо ввести email')
      .email('Введите корректный email'),
    password: z
    .string({ required_error: 'Введите пароль' })
    .min(7, 'Минимальная длина пароля - 8 символов'),
  })

export type ILoginSchemaInitialType = z.input<typeof LoginSchema>;
export type ILoginSchemaType = z.output<typeof LoginSchema>;
