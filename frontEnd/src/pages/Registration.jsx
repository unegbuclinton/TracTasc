import { useFormik } from 'formik';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/atoms/button';
import InputField from '../components/atoms/input';
import Spinner from '../components/atoms/spinner';
import ErrorMessage from '../components/molecules/errorMessage';
import { COLORS } from '../constants/colors';
import { FONTSIZES, FONTWEIGHT } from '../constants/fonts';
import { DPIconRegisterLogo } from '../icons/indxe';
import { registrationSchema } from '../validation/Schema';

const Registration = () => {
  const url = 'https://trac-trac.vercel.app/app/signup';

  const [loading, setLoading] = useState(false);

  const createUser = async (data) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response;
  };

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      setLoading(true);
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      };

      createUser(data)
        .then((data) => data.json())
        .then((res) => {
          if (res.message === 'User already exist') {
            toast.error(res.message);
          } else {
            toast.success(res.message);
            navigate('/login');
          }
          setLoading(false);
        });
    },
  });
  return (
    <RegisterWrapper>
      <RegisterLogoWrapper>
        <DPIconRegisterLogo className="reg-logo" width="220" height="220" />
      </RegisterLogoWrapper>
      <RegisterForm onSubmit={formik.handleSubmit}>
        <RegisterHeader>Sign Up</RegisterHeader>
        <InputField
          placeholder="First Name"
          inputClass="register-field"
          id="fistName"
          name="firstName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <ErrorMessage>{formik.errors.firstName}</ErrorMessage>
        ) : null}
        <InputField
          placeholder="Last Name"
          inputClass="register-field"
          id="lastName"
          name="lastName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <ErrorMessage>{formik.errors.lastName}</ErrorMessage>
        ) : null}
        <InputField
          placeholder="Email"
          inputClass="register-field"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <ErrorMessage>{formik.errors.email}</ErrorMessage>
        ) : null}
        <InputField
          placeholder="Passworrd"
          inputClass="register-field"
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <ErrorMessage>{formik.errors.password}</ErrorMessage>
        ) : null}
        <Button type="submit" disabled={loading} className="signUp-btn">
          {loading ? <Spinner /> : 'Sign Up'}
        </Button>
        <RegisterHint>
          Already have an account ?{' '}
          <span onClick={() => navigate('/login')}>Sign In</span>
        </RegisterHint>
      </RegisterForm>
    </RegisterWrapper>
  );
};

export default Registration;

const RegisterWrapper = styled.div`
  padding: 3.5rem;

  .register-field {
    min-width: 25rem;
    margin-top: 3.5rem;
    border: 1px solid ${COLORS.black};
    border-radius: 0.6rem;
    height: 4rem;
  }

  .signUp-btn {
    width: 100%;
    padding: 2rem;
    background-color: ${COLORS['persian-indigo']};
    border-radius: 0.6rem;
    margin-top: 2rem;
    color: ${COLORS.white};
    font-weight: ${FONTWEIGHT.bold};
  }

  @media only screen and (min-width: 785px) {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 5rem;
  }
`;

const RegisterLogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 2.5rem;

  @media only screen and (min-width: 785px) {
    .reg-logo {
      width: 520px;
      height: 320px;
    }
  }
`;

const RegisterForm = styled.form`
  @media only screen and (min-width: 785px) {
    flex: 1;
    max-width: 40%;
  }
`;

const RegisterHeader = styled.h1`
  font-size: ${FONTSIZES.xlagre};
  font-weight: ${FONTWEIGHT.bold};
`;

const RegisterHint = styled.p`
  font-size: ${FONTSIZES.small};
  font-weight: ${FONTWEIGHT.bold};
  text-align: center;
  margin-top: 1.5rem;

  span {
    color: ${COLORS.frosbite};
    cursor: pointer;
    &:hover {
      color: ${COLORS['persian-indigo']};
    }
  }
`;
