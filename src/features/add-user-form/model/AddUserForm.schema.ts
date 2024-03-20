import dayjs from 'dayjs';
import { z } from 'zod';

export const AddUsersSchema = z.object({
  firstName: z
    .string({ required_error: 'Введите имя пользователя' })
    .min(1, 'Необходимо ввести имя пользователя'),
  lastName: z
    .string({ required_error: 'Введите фамилию пользователя' })
    .min(1, 'Необходимо ввести фамилию пользователя'),
  middleName: z
    .string({ required_error: 'Введите отчество пользователя' })
    .min(1, 'Необходимо ввести отчество пользователя'),
  birth: z
    .date({ required_error: 'Введите дату рождения' })
    .nullable()
    .refine((arg) => arg, { message: 'Введите дату рождения' })
    .transform((date) => dayjs(date).format('YYYY-MM-DD')),
  // phone: z
  //   .string({ required_error: 'Введите имя пользователя' })
  //   .min(1, 'Необходимо имя пользователя'),
  // gender: z
  //   .string({ required_error: 'Введите имя пользователя' })
  //   .min(1, 'Необходимо имя пользователя'),
});

export type IAddUsersSchemaInitialType = z.input<typeof AddUsersSchema>;
export type IAddUsersSchemaType = z.output<typeof AddUsersSchema>;
