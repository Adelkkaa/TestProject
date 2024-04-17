import { Link } from '@chakra-ui/next-js';
import { Button, Flex, Text, useColorMode } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { registration } from '@/src/entities/auth';
import { PasswordField, Spinner } from '@/src/shared';
import type { IRegistration, IReturn } from '@/src/shared/types';
import { InputField } from '@/src/shared/ui/Input';

import { defaultValues } from '../model/defaultValues';
import type {
  IRegistrationSchemaInitialType,
  IRegistrationSchemaType,
} from '../model/RegistrationForm.schema';
import { RegistrationSchema } from '../model/RegistrationForm.schema';

export const RegistrationForm = () => {
  const { colorMode } = useColorMode();
  const boxShadow =
    colorMode === 'light'
      ? 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px'
      : 'rgba(255, 255, 255, 0.1) 0px 10px 122px -20px,rgba(255, 255, 255, 0.05) 0px 20px 10px -44px';

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  const router = useRouter();

  const { mutate: registrationMutation, isPending } = useMutation({
    mutationFn: (data: IRegistration) => registration(data),
    onError: (e: AxiosError<IReturn<null>>) => {
      console.info(e);
      enqueueSnackbar(e?.response?.data?.error || 'Ошибка запроса', {
        preventDuplicate: false,
        variant: 'error',
      });
    },
    onSuccess: () => {
      enqueueSnackbar('Вы успешно зарегестрированы', {
        preventDuplicate: false,
        variant: 'success',
      });
      router.push('/login');
    },
  });

  const methods = useForm<
    IRegistrationSchemaInitialType,
    unknown,
    IRegistrationSchemaType
  >({
    mode: 'onSubmit',
    resolver: zodResolver(RegistrationSchema),
    defaultValues,
    shouldFocusError: false,
  });

  const {
    handleSubmit,
    control,
    trigger,
    clearErrors,
    formState: { isSubmitted },
  } = methods;

  const { password, passwordRepeat } = useWatch({ control });

  useEffect(() => {
    if (isSubmitted && passwordRepeat) {
      if (password === passwordRepeat) {
        clearErrors('passwordRepeat');
      } else {
        trigger('passwordRepeat');
      }
    }
  }, [password, passwordRepeat, clearErrors, trigger, isSubmitted]);

  const onSubmit: SubmitHandler<IRegistrationSchemaType> = async (data) => {
    const { password, email, username } = data;
    console.info('Prepared Data', { password, email, username });
    registrationMutation({ password, email, username });
  };

  const onClickShowPassword = (isRepeatPassword: boolean) =>
    isRepeatPassword
      ? setShowPasswordRepeat((prev) => !prev)
      : setShowPassword((prev) => !prev);

  return (
    <FormProvider {...methods}>
      <form
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex
          w="500px"
          direction="column"
          gap="16px"
          boxShadow={boxShadow}
          padding="30px"
          borderRadius="20px"
        >
          <Text alignSelf="center">Форма регистрации</Text>
          <InputField
            isDisabled={isPending}
            name="username"
            label="Имя пользователя"
          />
          <InputField isDisabled={isPending} name="email" label="Email" />
          <PasswordField
            isDisabled={isPending}
            type={showPassword ? 'text' : 'password'}
            name="password"
            label="Пароль"
            icon={showPassword ? <FaEyeSlash /> : <FaEye />}
            onEyeClick={() => onClickShowPassword(false)}
          />
          <PasswordField
            isDisabled={isPending}
            type={showPasswordRepeat ? 'text' : 'password'}
            name="passwordRepeat"
            label="Повторите пароль"
            icon={showPasswordRepeat ? <FaEyeSlash /> : <FaEye />}
            onEyeClick={() => onClickShowPassword(true)}
          />
          <Flex w="100%" justifyContent="space-between">
            <Link href="/login">Перейти к авторизации</Link>
            <Button isDisabled={isPending} type="submit">
              Регистрация
            </Button>
          </Flex>
          {isPending && <Spinner />}
        </Flex>
      </form>
    </FormProvider>
  );
};
