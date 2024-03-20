import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

import { addNewUser } from '@/src/entities/user';
import { DatePicker, PhoneInput, Select, Spinner } from '@/src/shared';
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
  closeModal: () => void;
};

export const AddUserForm: FC<IAddUserFormProps> = ({ formId, closeModal }) => {
  const queryClient = useQueryClient();

  const methods = useForm<
    IAddUsersSchemaInitialType,
    unknown,
    IAddUsersSchemaType
  >({
    resolver: zodResolver(AddUsersSchema),
    defaultValues,
    shouldFocusError: false,
  });

  const { handleSubmit, reset } = methods;

  const { mutate: addUser, isPending } = useMutation({
    mutationFn: (data: IUserWithoutId) => addNewUser(data),
    onError: (e) => {
      enqueueSnackbar(e.message || 'Ошибка запроса', {
        preventDuplicate: false,
        variant: 'error',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      enqueueSnackbar('Пользователь успешно создан!', {
        preventDuplicate: false,
        variant: 'success',
      });
      reset();
      closeModal();
    },
  });

  const onSubmit: SubmitHandler<IAddUsersSchemaType> = async (data) => {
    console.info('Prepared Data', data);
    addUser({
      ...data,
      fullName: `${data.lastName} ${data.firstName} ${data.middleName}`,
    });
  };
  return (
    <FormProvider {...methods}>
      <form id={formId} onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection="column" gap="5" position="relative">
          <InputField
            isDisabled={isPending}
            placeholder="Введите имя"
            label="Имя"
            name="firstName"
          />
          <InputField
            isDisabled={isPending}
            placeholder="Введите фамилию"
            label="Фамилия"
            name="lastName"
          />
          <InputField
            isDisabled={isPending}
            placeholder="Введите отчество"
            label="Отчество"
            name="middleName"
          />
          <DatePicker
            disabled={isPending}
            name="birth"
            label="Дата рождения"
            placeholderText="Введите дату рождения"
          />
          <PhoneInput
            isDisabled={isPending}
            label="Номер телефона"
            name="phone"
          />
          <Select
            isDisabled={isPending}
            name="gender"
            label="Пол"
            placeholder="Выберите пол"
          >
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </Select>
          {isPending && <Spinner />}
        </Flex>
      </form>
    </FormProvider>
  );
};
