import type { InputProps } from '@chakra-ui/react';
import { Input as BaseInput } from '@chakra-ui/react';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

type TInputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
} & InputProps;

export const InputField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  ...props
}: TInputField<TFieldValues, TName>) => {
  const { field } = useController({
    name,
  });

  return <BaseInput {...field} {...props} />;
};
