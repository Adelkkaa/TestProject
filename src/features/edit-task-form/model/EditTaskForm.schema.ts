import dayjs from 'dayjs';
import { z } from 'zod';

export const EditTaskSchema = z
  .object({
    name: z
      .string({ required_error: 'Введите название задачи' })
      .min(1, 'Необходимо ввести название задачи'),
    date_start: z
      .date({ required_error: 'Введите дату и время начала задания' })
      .nullable()
      .refine(
        (arg) =>
          arg &&
          dayjs(arg) > dayjs('1930-01-01') &&
          dayjs(arg) <= dayjs('2030-01-01'),
        { message: 'Введите корректную дату и время начала задания' }
      )
      .transform((date) => dayjs(date).format('YYYY-MM-DDTHH:mm')),
    date_end: z
      .date({ required_error: 'Введите дату и время окончания задания' })
      .nullable()
      .refine(
        (arg) =>
          arg &&
          dayjs(arg) > dayjs('1930-01-01') &&
          dayjs(arg) <= dayjs('2030-01-01'),
        { message: 'Введите корректную дату и время окончания задания' }
      )
      .transform((date) => dayjs(date).format('YYYY-MM-DDTHH:mm')),
    user: z
      .string({ required_error: 'Выберите ответственного' })
      .min(1, 'Необходимо выбрать ответственного'),
  })
  .refine(({ date_start, date_end }) => dayjs(date_start) < dayjs(date_end), {
    message: 'Дата окончания должа быть позже даты начала',
    path: ['date_end'],
  });

export type IEditTaskSchemaInitialType = z.input<typeof EditTaskSchema>;
export type IEditTaskSchemaType = z.output<typeof EditTaskSchema>;
