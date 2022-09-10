import React from 'react';
import styled from 'styled-components';
import { DPIconCheck } from '../../../icons/indxe';

const CheckedTask = () => {
  return (
    <Wrapper>
      <DPIconCheck />
    </Wrapper>
  );
};

export default CheckedTask;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  width: 4rem;
  padding: 1.4rem;
  background-color: green;
  border-radius: 50%;
`;
