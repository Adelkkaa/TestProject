import { z } from 'zod';

export const RegistrationSchema = z
  .object({
    email: z
      .string({ required_error: 'Введите email' })
      .min(1, 'Необходимо ввести email')
      .email('Введите корректный email'),
    username: z
      .string({ required_error: 'Введите имя пользователя' })
      .min(1, 'Необходимо ввести имя пользователя'),
    password: z
      .string({ required_error: 'Введите пароль' })
      .min(7, 'Минимальная длина пароля - 8 символов'),
    passwordRepeat: z
      .string({ required_error: 'Введите пароль' })
      .min(7, 'Минимальная длина пароля - 8 символов'),
  })
  .refine(({ password, passwordRepeat }) => password === passwordRepeat, {
    message: 'Пароли не совпадают',
    path: ['passwordRepeat'],
  });

export type IRegistrationSchemaInitialType = z.input<typeof RegistrationSchema>;
export type IRegistrationSchemaType = z.output<typeof RegistrationSchema>;
