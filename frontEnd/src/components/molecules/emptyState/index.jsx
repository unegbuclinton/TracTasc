import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants/colors';
import { FONTSIZES, FONTWEIGHT } from '../../../constants/fonts';
import { DPIconTaskIcon } from '../../../icons/indxe';
import Button from '../../atoms/button';

const EmptyState = ({ onClick }) => {
  return (
    <Wrapper>
      <DPIconTaskIcon />
      <Text>No Task For Today Added Yet</Text>
      <Button className="empty-btn" onClick={onClick}>
        Add Task +
      </Button>
    </Wrapper>
  );
};

export default EmptyState;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;

  .empty-btn {
    padding: 1.2rem;
    border-radius: 0.8rem;
    font-size: ${FONTSIZES.base};
    font-weight: ${FONTWEIGHT.bold};
    color: ${COLORS.white};
    background-color: ${COLORS.frosbite};
    cursor: pointer;
  }
`;

const Text = styled.p`
  text-align: center;
  font-size: ${FONTSIZES.base};
  font-weight: ${FONTWEIGHT.bold};
`;
