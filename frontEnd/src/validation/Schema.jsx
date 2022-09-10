import * as Yup from 'yup';

export const registrationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('First Name Required'),
  lastName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Last Name Required'),
  email: Yup.string().email('invalid Mail').required('Email is Required'),
  password: Yup.string().required('Please Enter your password'),
  // .matches(
  //   '^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$',
  //   'Minimum eight characters, at least one letter and one number'
  // ),
});

export const loginSchema = Yup.object({
  userName: Yup.string().email('Invalid Email').required('Email is Required'),
  password: Yup.string().required('Password is Required'),
});

export const formSchema = Yup.object({
  date: Yup.string().required('Date is Required'),
});
