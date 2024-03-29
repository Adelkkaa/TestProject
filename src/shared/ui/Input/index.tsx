import type { InputProps } from '@chakra-ui/react';
import {
  Input as BaseInput,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

type TInputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  label: string;
} & InputProps;

export const InputField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  placeholder,
  label,
  ...props
}: TInputField<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
  });

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <BaseInput
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
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
