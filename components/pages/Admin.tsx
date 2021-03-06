import { Button, FormGroup } from '@smooth-ui/core-sc';
import { Formik } from 'formik';
import nextCookie from 'next-cookies';
import styled from 'styled-components';
import * as yup from 'yup';

import InputFormik from '../input/InputFormik';
import TextAreaFormik from '../input/TextAreaFormik';
import AuthLayout from './AuthLayout';
import PostAddMutation from './mutations/PostAddMutation';

const validationSchema = () =>
  yup.object().shape({
    slug: yup.string().required('Slug is required!'),
    title: yup.string().required('Title is required!'),
    description: yup.string().required('Description is required!'),
    text: yup.string().required('Text is required!')
  });

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Admin = (ctx: any) => {
  return (
    <AuthLayout>
      <Formik
        initialValues={{
          slug: '',
          title: '',
          description: '',
          text: ''
        }}
        validationSchema={validationSchema()}
        onSubmit={async (values, { setSubmitting }) => {
          const { token } = nextCookie(ctx);

          const newValues = { token, ...values };
          const onCompleted = (res: any) => {
            setSubmitting(false);
            const response = res && res.PostAddMutation;

            if (response && response.error) {
              console.log('Error', 'Error add post');
            }
          };

          const onError = () => {
            setSubmitting(false);
            console.log('Error', 'Error add post');
          };

          PostAddMutation.commit(newValues, onCompleted, onError);
          setSubmitting(false);
        }}
        render={({ handleSubmit }) => (
          <Form>
            <FormGroup>
              <InputFormik label='Slug' name='slug' placeholder='Slug' />
              <InputFormik label='Title' name='title' placeholder='Title' />
              <InputFormik
                label='Description'
                name='description'
                placeholder='Description'
              />
              <TextAreaFormik label='Text' name='text' placeholder='Text' />
            </FormGroup>
            <Button variant='success' onClick={handleSubmit}>
              Add Post
            </Button>
          </Form>
        )}
      />
    </AuthLayout>
  );
};

export default Admin;
