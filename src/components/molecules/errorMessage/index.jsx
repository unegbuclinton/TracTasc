import React from 'react';
import styled from 'styled-components';
import { FONTSIZES, FONTWEIGHT } from '../../../constants/fonts';

const ErrorMessage = ({ children }) => {
  return <ErrorMsg>{children}</ErrorMsg>;
};

export default ErrorMessage;

const ErrorMsg = styled.p`
  color: red;
  font-size: ${FONTSIZES.small};
  font-weight: ${FONTWEIGHT.medium};
`;
