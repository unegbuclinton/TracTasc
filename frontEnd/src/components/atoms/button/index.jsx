import React from 'react';
import styled, { css } from 'styled-components';
import { COLORS } from '../../../constants/colors';

const Button = ({ className, children, onClick, type, disabled }) => {
  return (
    <ButtonTab
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonTab>
  );
};

export default Button;

const ButtonTab = styled.button`
  outline: none;
  border: none;

  ${({ disabled }) => {
    return (
      disabled &&
      css`
        background-color: ${COLORS['grey-200']} !important;
        color: ${COLORS.white};
      `
    );
  }}
`;
