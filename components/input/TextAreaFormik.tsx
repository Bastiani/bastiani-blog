import { Label, Textarea } from '@smooth-ui/core-sc';
import { connect } from 'formik';
import get from 'lodash/get';
import React from 'react';

import { Error, InputContainer } from './styles/input';

interface ITextareaFormik {
  name: string;
  formik?: any;
  label: string;
  placeholder?: string;
}

const TextareaFormik = ({
  name,
  formik,
  label: labelmsg,
  placeholder,
  ...props
}: ITextareaFormik) => {
  const handleChange = (event: any) => {
    const { value } = event.target;

    formik.setFieldValue(name, value);
  };

  const { values, errors, touched, handleBlur } = formik;
  const value = get(values, name, '');
  const wasTouched = get(touched, name);
  const fieldError = wasTouched && get(errors, name, null);

  return (
    <InputContainer>
      <Label name={name}>{labelmsg}</Label>
      <Textarea
        control
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        placeholder={placeholder}
        valid={!fieldError}
        {...props}
      />
      {fieldError && <Error>{fieldError}</Error>}
    </InputContainer>
  );
};

export default connect(TextareaFormik);
