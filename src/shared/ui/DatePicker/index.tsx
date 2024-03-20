import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import type { ReactDatePickerProps } from 'react-datepicker';
import ReactDatePicker from 'react-datepicker';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

type TInputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  label: string;
} & Omit<ReactDatePickerProps, 'onChange'>;

export const DatePicker = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  ...props
}: TInputField<TFieldValues, TName>) => {
  const {
    field: { value, onChange, ...field },
    fieldState: { error },
  } = useController({
    name,
  });

  return (
    <FormControl width="100%" isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <ReactDatePicker
        {...field}
        {...props}
        name={name}
        value={value}
        selected={value}
        onChange={(date) => onChange(date)}
        dateFormat="dd.MM.yyyy"
        className={`custom-datepicker ${error ? 'custom-datepicker__error' : ''}`}
        wrapperClassName="custom-datepicker__wrapper"
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
