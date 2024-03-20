import type { InputProps } from '@chakra-ui/react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

type IPhoneMask = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

type TPhoneInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  label: string;
} & InputProps;

export const PhoneMask = forwardRef<HTMLInputElement, IPhoneMask>(
  (props, ref) => {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        overwrite
        definitions={{
          '#': /[0-9]/,
        }}
        inputRef={ref}
        mask="+7 ### ### ####"
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        {...other}
      />
    );
  }
);

PhoneMask.displayName = 'PhoneMask';

export const PhoneInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  ...props
}: TPhoneInput<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
  });

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        id={name}
        placeholder="+7 000 000 0000"
        as={PhoneMask}
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
