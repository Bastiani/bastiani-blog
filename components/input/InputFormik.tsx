import React, { useState } from 'react';
import get from 'lodash/get';
import { Input, Label } from '@smooth-ui/core-sc';
import { connect } from 'formik';

import { Error, InputContainer } from '../../styles/input/input';

interface IInputFormik {
  name: string;
  formik?: any;
  type?: string;
  checkPassword?: boolean;
  strongerlevel?: (level: number) => void;
  label: string;
  placeholder?: string;
}

const InputFormik = ({
  name,
  formik,
  type,
  checkPassword,
  strongerlevel,
  label: labelmsg,
  placeholder,
  ...props
}: IInputFormik) => {
  const [passwordStronger, setPasswordStronger] = useState(0);

  const handleValidatePassword = (password: string) => {
    const matchedCase = ['[$@$!%*#?&]', '[A-Z]', '[0-9]', '[a-z]'];

    let i;
    let counterMatchedCase = 0;

    if (password.length === 0) {
      setPasswordStronger(0);
      return;
    }

    for (i = 0; i < matchedCase.length; i += 1) {
      if (new RegExp(matchedCase[i]).test(password)) {
        counterMatchedCase += 1;
      }
    }

    switch (counterMatchedCase) {
      case 3:
        setPasswordStronger(50);
        if (strongerlevel) {
          strongerlevel(50);
        }
        break;
      case 4:
        setPasswordStronger(99.9);
        if (strongerlevel) {
          strongerlevel(99.9);
        }
        break;
      default:
        setPasswordStronger(30);
        if (strongerlevel) {
          strongerlevel(30);
        }
        break;
    }
  };

  const handleChange = (event: any) => {
    const { value } = event.target;

    if (type === 'password' && checkPassword) {
      handleValidatePassword(value);
    }

    formik.setFieldValue(name, value);
  };

  const { values, errors, touched, handleBlur } = formik;
  const value = get(values, name, '');
  const wasTouched = get(touched, name);
  const fieldError = wasTouched && get(errors, name, null);

  return (
    <InputContainer>
      <Label name={name}>{labelmsg}</Label>
      <Input
        control
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        type={type || 'text'}
        placeholder={placeholder}
        valid={!fieldError}
        {...props}
      />
      {fieldError && <Error>{fieldError}</Error>}
      {checkPassword && passwordStronger}
    </InputContainer>
  );
};

export default connect(InputFormik);
