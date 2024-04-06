import { Link } from '@chakra-ui/next-js';
import { Button, Flex, Text, useColorMode } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { PasswordField } from '@/src/shared';
import { InputField } from '@/src/shared/ui/Input';

import { defaultValues } from '../model/defaultValues';
import type {
  ILoginSchemaInitialType,
  ILoginSchemaType,
} from '../model/LoginForm.schema';
import { LoginSchema } from '../model/LoginForm.schema';

export const LoginForm = () => {
  const { colorMode } = useColorMode();
  const boxShadow =
    colorMode === 'light'
      ? 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px'
      : 'rgba(255, 255, 255, 0.1) 0px 10px 122px -20px,rgba(255, 255, 255, 0.05) 0px 20px 10px -44px';

  const [showPassword, setShowPassword] = useState(false);

  // const queryClient = useQueryClient();

  const methods = useForm<ILoginSchemaInitialType, unknown, ILoginSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(LoginSchema),
    defaultValues,
    shouldFocusError: false,
  });

  const {
    handleSubmit,
    // formState: {},
  } = methods;

  const onSubmit: SubmitHandler<ILoginSchemaType> = async (data) => {
    console.info('Prepared Data', data);
  };

  const onClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
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
          <Text alignSelf="center">Форма авторизации</Text>
          <InputField name="email" label="Email" />
          <PasswordField
            type={showPassword ? 'text' : 'password'}
            name="password"
            label="Пароль"
            icon={showPassword ? <FaEyeSlash /> : <FaEye />}
            onEyeClick={onClickShowPassword}
          />
          <Flex w="100%" justifyContent="space-between">
            <Link href="/registration">Перейти к регистрации</Link>
            <Button type="submit">Войти</Button>
          </Flex>
        </Flex>
      </form>
    </FormProvider>
  );
};
