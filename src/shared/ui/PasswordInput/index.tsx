import type { InputProps } from '@chakra-ui/react';
import {
 Input as BaseInput,
 FormControl,
 FormErrorMessage,
 FormLabel,
 InputGroup,
 InputRightElement,
} from '@chakra-ui/react';
import type { ReactNode } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';



type TPasswordField<
 TFieldValues extends FieldValues = FieldValues,
 TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
 name: TName;
 label: string;
 icon: ReactNode;
 onEyeClick: () => void
} & InputProps;

export const PasswordField = <
 TFieldValues extends FieldValues = FieldValues,
 TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
 name,
 placeholder,
 label,
 icon,
 onEyeClick,
 ...props
}: TPasswordField<TFieldValues, TName>) => {
 const {
    field,
    fieldState: { error },
 } = useController({
    name,
 });

 return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup>
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
        <InputRightElement onClick={onEyeClick} cursor='pointer'>
          {icon}
        </InputRightElement>
      </InputGroup>
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
 );
};
