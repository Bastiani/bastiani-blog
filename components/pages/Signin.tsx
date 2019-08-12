import { Button, FormGroup } from '@smooth-ui/core-sc';
import { Formik } from 'formik';
import * as yup from 'yup';
import Router from 'next/router';

import InputFormik from '../input/InputFormik';
import SigninMutation from './mutations/SigninMutation';
import { setToken } from './security/authentication';

const validationSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .email('Invalid email!')
      .required('Email required!'),
    password: yup.string().required('Password is required!')
  });

const Signin = () => (
  <Formik
    initialValues={{
      email: '',
      password: ''
    }}
    validationSchema={validationSchema()}
    onSubmit={(values, { setSubmitting }) => {
      const onCompleted = (res: any) => {
        setSubmitting(false);
        const response = res && res.UserLoginMutation;

        if (response && response.error) {
          console.log('Erro', 'Erro ao tentar fazer login');
        } else if (response.token) {
          setToken(response.token);
          Router.push('/admin');
        }
      };

      const onError = () => {
        setSubmitting(false);
        console.log('Erro', 'Erro ao tentar fazer login');
      };

      SigninMutation.commit(values, onCompleted, onError);
      setSubmitting(false);
    }}
    render={({ handleSubmit }) => (
      <>
        <FormGroup>
          <InputFormik label="Email" name="email" placeholder="Email" />
          <InputFormik
            type="password"
            label="Password"
            name="password"
            placeholder="Password"
          />
        </FormGroup>
        <Button variant="success" onClick={handleSubmit}>
          Login
        </Button>
      </>
    )}
  />
);

export default Signin;
