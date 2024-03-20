import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

import { addNewUser } from '@/src/entities/user';
import { DatePicker } from '@/src/shared';
import type { IUserWithoutId } from '@/src/shared/types';
import { InputField } from '@/src/shared/ui/Input';

import {
  AddUsersSchema,
  type IAddUsersSchemaInitialType,
  type IAddUsersSchemaType,
} from '../model/AddUserForm.schema';
import { defaultValues } from '../model/defaultValues';

type IAddUserFormProps = {
  formId: string;
};

export const AddUserForm: FC<IAddUserFormProps> = ({ formId }) => {
  const queryClient = useQueryClient();

  console.info('hello');

  const addUser = useMutation({
    mutationFn: (data: IUserWithoutId) => addNewUser(data),
    onError: (e) => {
      enqueueSnackbar(e.message || 'Ошибка запроса', {
        preventDuplicate: false,
        variant: 'error',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
  const methods = useForm<
    IAddUsersSchemaInitialType,
    unknown,
    IAddUsersSchemaType
  >({
    resolver: zodResolver(AddUsersSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    // formState: {errors},
  } = methods;

  const onSubmit: SubmitHandler<IAddUsersSchemaType> = async (data) => {
    console.info('Prepared Data', data);
    // const handleSubmit = () => {
    //     addUser.mutate({
    // firstName: '123',
    // lastName: '123',
    // middleName: '123',
    // fullName: '123',
    // birth: '123',
    // phone: '123',
    // gender: '123',
    //     });
    //   };
  };
  return (
    <FormProvider {...methods}>
      <form id={formId} onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection="column" gap="5">
          <InputField
            placeholder="Введите имя пользователя"
            label="Имя пользователя"
            name="firstName"
          />
          <InputField
            placeholder="Введите фамилию пользователя"
            label="Фамилия пользователя"
            name="lastName"
          />
          <InputField
            placeholder="Введите отчество пользователя"
            label="Отчество пользователя"
            name="middleName"
          />
          <DatePicker
            name="birth"
            label="Дата рождения"
            placeholderText="Введите дату рождения"
          />
        </Flex>
      </form>
    </FormProvider>
  );
};
