import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants/colors';
import { FONTSIZES } from '../../../constants/fonts';
import Button from '../../atoms/button';

const DoneTaskModal = ({ onDone, onClose }) => {
  return (
    <Wrapper>
      <DoneTaskHeader>Done Task</DoneTaskHeader>
      <DoneTaskText>Are you done with this task ?</DoneTaskText>
      <DoneTaskContainer>
        <Button className="del-btn" onClick={onDone}>
          Done
        </Button>
        <Button className="can-btn" onClick={onClose}>
          Not yet
        </Button>
      </DoneTaskContainer>
    </Wrapper>
  );
};

export default DoneTaskModal;

const Wrapper = styled.div`
  width: 31rem;
  padding: 1.5rem 1.2rem;
  background-color: ${COLORS.white};
  border-radius: 0.8rem;
`;

const DoneTaskHeader = styled.h1`
  text-align: center;
  margin-bottom: 0.8rem;
`;

const DoneTaskText = styled.p`
  font-size: ${FONTSIZES.small};
  text-align: center;
`;

const DoneTaskContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;

  .del-btn {
    background-color: red;
    color: ${COLORS.white};
    padding: 1.5rem;
    border-radius: 0.8rem;
    cursor: pointer;
  }

  .can-btn {
    background-color: ${COLORS.alabaster};
    padding: 1.5rem;
    border-radius: 0.8rem;
    cursor: pointer;
  }
`;
