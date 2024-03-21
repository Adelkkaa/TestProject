import type { FieldValues } from 'react-hook-form';

export const getChangedFormFields = <T extends FieldValues>(
  allFields: T,
  dirtyFields: Partial<Record<keyof T, boolean>>
): Partial<T> =>
  Object.keys(dirtyFields).reduce(
    (acc, currentField) => ({
      ...acc,
      [currentField]: allFields[currentField],
    }),
    {} as Partial<T>
  );

export const getChangedFormFieldsDeep = <T extends FieldValues>(
  allFields: T,
  dirtyFields: Partial<Record<keyof T, boolean | Record<string, boolean>>>
): Partial<T> =>
  Object.keys(dirtyFields).reduce((acc, currentField) => {
    if (typeof dirtyFields[currentField] === 'boolean') {
      return {
        ...acc,
        [currentField]: allFields[currentField],
      };
    } else {
      return {
        ...acc,
        [currentField]: getChangedFormFields(
          allFields[currentField],
          dirtyFields[currentField] as Partial<FieldValues>
        ),
      };
    }
  }, {} as Partial<T>);
