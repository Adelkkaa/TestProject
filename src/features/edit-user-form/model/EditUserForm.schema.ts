import dayjs from 'dayjs';
import { z } from 'zod';

export const EditUsersSchema = z.object({
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
    .refine(
      (arg) => arg && dayjs(arg) > dayjs('1930-01-01') && dayjs(arg) <= dayjs(),
      { message: 'Введите корректную дату рождения' }
    )
    .transform((date) => dayjs(date).format('YYYY-MM-DD')),
  phone: z
    .string({ required_error: 'Введите номер телефона пользователя' })
    .min(15, 'Необходимо ввести номер телефона пользователя'),
  gender: z
    .string({ required_error: 'Выберите пол пользователя' })
    .min(1, 'Необходимо выбрать пол пользователя'),
});

export type IEditUsersSchemaInitialType = z.input<typeof EditUsersSchema>;
export type IEditUsersSchemaType = z.output<typeof EditUsersSchema>;
