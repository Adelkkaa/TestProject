import { z } from 'zod';

export const AddUsersSchema = z.object({
  firstName: z
    .string({ required_error: 'Введите количество' })
    .min(1, 'Необходимо ввести количество'),
  lastName: z
    .string({ required_error: 'Введите количество' })
    .min(1, 'Необходимо ввести количество'),
  middleName: z
    .string({ required_error: 'Введите количество' })
    .min(1, 'Необходимо ввести количество'),
  // birth: z
  //   .string({ required_error: 'Введите количество' })
  //   .min(1, 'Необходимо ввести количество'),
  // phone: z
  //   .string({ required_error: 'Введите количество' })
  //   .min(1, 'Необходимо ввести количество'),
  // gender: z
  //   .string({ required_error: 'Введите количество' })
  //   .min(1, 'Необходимо ввести количество'),
});

export type IAddUsersSchemaInitialType = z.input<typeof AddUsersSchema>;
export type IAddUsersSchemaType = z.output<typeof AddUsersSchema>;
