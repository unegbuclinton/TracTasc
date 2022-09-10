import React from 'react';
import styled from 'styled-components';
import { DPIconSpinner } from '../../../icons/indxe';

const Spinner = () => {
  return (
    <SpinnerContainer>
      <DPIconSpinner className="spinner" />
    </SpinnerContainer>
  );
};

export default Spinner;

const SpinnerContainer = styled.span`
  .spinner {
    animation: rotate 1s linear infinite;
  }
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;
