import React from 'react';
import styled from 'styled-components';

const Button = ({ className, children, onClick, type }) => {
  return (
    <ButtonTab type={type} className={className} onClick={onClick}>
      {children}
    </ButtonTab>
  );
};

export default Button;

const ButtonTab = styled.button`
  outline: none;
  border: none;
`;
