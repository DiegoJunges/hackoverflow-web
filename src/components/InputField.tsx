import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage, Textarea } from '@chakra-ui/core';

type InpuFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
}

const InpuField: React.FC<InpuFieldProps> = ({
    label,
    textarea,
    size: _,
    ...props
  }) => {
  let InputOrTextarea = Input;
  if (textarea) {
    InputOrTextarea = Textarea;
  }
  const [field, {error}] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextarea
        {...field}
        {...props}
        id={field.name}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
}

export default InpuField;
