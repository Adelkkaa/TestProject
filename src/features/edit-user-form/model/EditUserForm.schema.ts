import { z } from 'zod';

export const EditUsersSchema = z.object({
  firstName: z
    .string({ required_error: 'Введите количество' })
    .min(1, 'Необходимо ввести количество'),
  lastName: z
    .string({ required_error: 'Введите количество' })
    .min(1, 'Необходимо ввести количество'),
  middleName: z
    .string({ required_error: 'Введите количество' })
    .min(1, 'Необходимо ввести количество'),
  fullName: z
    .string({ required_error: 'Введите количество' })
    .min(1, 'Необходимо ввести количество'),
  birth: z
    .string({ required_error: 'Введите количество' })
    .min(1, 'Необходимо ввести количество'),
  phone: z
    .string({ required_error: 'Введите количество' })
    .min(1, 'Необходимо ввести количество'),
  gender: z
    .string({ required_error: 'Введите количество' })
    .min(1, 'Необходимо ввести количество'),
});

export type IEditUsersSchemaInitialType = z.input<typeof EditUsersSchema>;
export type IEditUsersSchemaType = z.output<typeof EditUsersSchema>;
