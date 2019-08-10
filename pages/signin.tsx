import { Button, FormGroup } from '@smooth-ui/core-sc';
import { Formik } from 'formik';
import * as yup from 'yup';

import InputFormik from '../components/input/InputFormik';

const validationSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .email('Invalid email!')
      .required('Email required!'),
    password: yup.string().required('Password is required')
  });

const Signin = () => (
  <Formik
    initialValues={{
      email: '',
      password: ''
    }}
    validationSchema={validationSchema()}
    onSubmit={(values, actions) => {
      // createUser({ variables: { input: { ...values } } });
      console.log(values);
      actions.setSubmitting(false);
    }}
    render={({ handleSubmit }) => (
      <>
        <FormGroup>
          <InputFormik label="Email" name="email" placeholder="Email" />
          <InputFormik
            label="Password"
            name="password"
            placeholder="Password"
          />
        </FormGroup>
        <Button variant="success" htmlType="submit" onClick={handleSubmit}>
          Login
        </Button>
      </>
    )}
  />
);

export default Signin;
