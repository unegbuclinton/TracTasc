import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/atoms/button';
import InputField from '../components/atoms/input';
import ErrorMessage from '../components/molecules/errorMessage';
import { COLORS } from '../constants/colors';
import { FONTSIZES, FONTWEIGHT } from '../constants/fonts';
import { DPIconLoginLogo } from '../icons/indxe';
import { loginSchema } from '../validation/Schema';

const Login = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const url = 'http://localhost:4000/app/login';

  const logUser = async (data) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return response.json();
    } catch (error) {
      alert(error);
    }
  };

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: loginSchema,

    onSubmit: (values) => {
      const data = {
        email: values.userName,
        password: values.password,
      };

      logUser(data).then((data) => {
        const token = data?.access_token;

        if (!token) {
          navigate('/login');
          setErrorMsg(data.message);
        } else {
          localStorage.setItem('token', JSON.stringify(token));
          navigate('/home');
        }
      });
    },
  });

  return (
    <LoginWrapper>
      <LoginLogoContainer>
        <DPIconLoginLogo width="230" height="230" className="login-logo" />
      </LoginLogoContainer>

      <LoginForm onSubmit={formik.handleSubmit}>
        <LoginHeader>Sign In</LoginHeader>
        <ErrorMsg>{errorMsg}</ErrorMsg>
        <InputField
          placeholder="User name"
          inputClass="login-field"
          id="userName"
          name="userName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userName}
        />
        {formik.touched.userName && formik.errors.userName ? (
          <ErrorMessage>{formik.errors.userName}</ErrorMessage>
        ) : null}
        <InputField
          placeholder="Password"
          inputClass="login-field"
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <ErrorMessage>{formik.errors.password}</ErrorMessage>
        ) : null}
        <Button type="submit" className="login-btn">
          Sign In
        </Button>
        <LoginHint>Forgot Password ? </LoginHint>
        <LoginHint>
          Don't have an account yet?{' '}
          <span onClick={() => navigate('/register')}>Sign up</span>
        </LoginHint>
      </LoginForm>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.div`
  height: 90vh;
  padding: 3.5rem;

  .login-field {
    min-width: 25rem;
    margin-top: 3.5rem;
    border: 1px solid ${COLORS.black};
    border-radius: 0.6rem;
    height: 4rem;
  }

  .login-btn {
    width: 100%;
    padding: 2rem;
    background-color: ${COLORS['persian-indigo']};
    border-radius: 0.6rem;
    margin-top: 2rem;
    color: ${COLORS.white};
    font-weight: ${FONTWEIGHT.bold};
    cursor: pointer;

    &:hover {
      background-color: ${COLORS.almond};
      color: ${COLORS['persian-indigo']};
    }
  }

  @media only screen and (min-width: 785px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7rem 5.5rem 7rem 2.5rem;
  }
`;

const LoginLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5rem;
  margin-bottom: 2.5rem;

  @media only screen and (min-width: 785px) {
    .login-logo {
      width: 520px;
      height: 320px;
    }
  }
`;

const LoginForm = styled.form`
  @media only screen and (min-width: 785px) {
    max-width: 40%;
    flex: 1;
  }
`;

const LoginHeader = styled.h1`
  font-size: ${FONTSIZES.xlagre};
  font-weight: ${FONTWEIGHT.bold};
`;

const LoginHint = styled.p`
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

const ErrorMsg = styled.div`
  font-size: ${FONTSIZES.small};
  margin-top: 1.5rem;
  color: red;
  text-align: center;
`;
