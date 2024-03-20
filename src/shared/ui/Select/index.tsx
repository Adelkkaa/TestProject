import type { SelectProps } from '@chakra-ui/react';
import {
  Select as BaseSelect,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';
import type { ReactNode } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

type TSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  label: string;
  children: ReactNode;
} & SelectProps;

export const Select = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  placeholder,
  label,
  children,
  ...props
}: TSelect<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
  });

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>

      <BaseSelect
        id={name}
        placeholder={placeholder}
        {...field}
        {...props}
        isInvalid={!!error}
        errorBorderColor="red.500"
        _focus={{
          borderColor: 'blue.500',
          boxShadow: 'outline',
        }}
      >
        {children}
      </BaseSelect>
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
