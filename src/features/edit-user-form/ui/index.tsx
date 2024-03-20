import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

import { addNewUser } from '@/src/entities/user';
import type { IUserWithoutId } from '@/src/shared/types';

import type {
  IEditUsersSchemaInitialType,
  IEditUsersSchemaType,
} from '../model/EditUserForm.schema';

type IEditUserForm = {
  id: string;
};

export const EditUserForm: FC<IEditUserForm> = ({ id }) => {
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
    IEditUsersSchemaInitialType,
    unknown,
    IEditUsersSchemaType
  >({
    // resolver: zodResolver(EditUsersSchema),
  });

  console.info('hello');

  const {
    handleSubmit,
    formState: {},
  } = methods;

  const onSubmit: SubmitHandler<IEditUsersSchemaType> = async () => {
    console.info('Prepared Data');
    // const handleSubmit = () => {
    //     addUser.mutate({
    //       firstName: '123',
    //       lastName: '123',
    //       middleName: '123',
    //       fullName: '123',
    //       birth: '123',
    //       phone: '123',
    //       gender: '123',
    //     });
    //   };
  };
  return (
    <FormProvider {...methods}>
      <form id={id} onSubmit={handleSubmit(onSubmit)}>
        {id}
      </form>
    </FormProvider>
  );
};
