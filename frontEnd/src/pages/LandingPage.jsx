import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/atoms/button';
import { COLORS } from '../constants/colors';
import { FONTSIZES, FONTWEIGHT } from '../constants/fonts';
import { DPIconTodo } from '../icons/indxe';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <LandingWrapper>
      <LandingLogoContainer>
        <DPIconTodo />
      </LandingLogoContainer>
      <LandingMessage>
        Manage your daily activities with
        <br />
        <span className="focus">Task Manager.</span>
      </LandingMessage>

      <Button className="landing-btn" onClick={() => navigate('login')}>
        Get Started
      </Button>
    </LandingWrapper>
  );
};

export default LandingPage;

const LandingWrapper = styled.div`
  height: 100vh;
  padding: 2rem;

  .landing-btn {
    width: 100%;
    padding: 1.8rem;
    border-radius: 0.8rem;
    margin-top: 3rem;
    font-size: ${FONTSIZES.lg};
    font-weight: ${FONTWEIGHT.bold};
    color: ${COLORS['persian-indigo']};
    cursor: pointer;

    &:hover {
      color: ${COLORS.almond};
      background-color: ${COLORS['persian-indigo']};
    }
  }
`;

const LandingLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10rem;
  margin-bottom: 2.5rem;
`;

const LandingMessage = styled.h1`
  font-size: ${FONTSIZES.xxlarge};
  font-weight: ${FONTWEIGHT.bold};
  color: ${COLORS['persian-indigo']};
  margin-bottom: 2rem;
  padding-left: 2.8rem;

  .focus {
    color: ${COLORS.frosbite};
  }
`;
