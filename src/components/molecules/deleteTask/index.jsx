import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants/colors';
import { FONTSIZES } from '../../../constants/fonts';
import Button from '../../atoms/button';

const DeleteTask = ({ onClose, onDel }) => {
  return (
    <Wrapper>
      <DelTaskHeader>Delete Task</DelTaskHeader>
      <DelTaskText>Are you sure you want to delete this task ?</DelTaskText>
      <DelTaskContainer>
        <Button className="del-btn" onClick={onDel}>
          Delete
        </Button>
        <Button className="can-btn" onClick={onClose}>
          Cancel
        </Button>
      </DelTaskContainer>
    </Wrapper>
  );
};

export default DeleteTask;

const Wrapper = styled.div`
  width: 31rem;
  padding: 1.5rem 1.2rem;
  background-color: ${COLORS.white};
  border-radius: 0.8rem;
`;

const DelTaskHeader = styled.h1`
  text-align: center;
  margin-bottom: 0.8rem;
`;

const DelTaskText = styled.p`
  font-size: ${FONTSIZES.small};
  text-align: center;
`;

const DelTaskContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;

  .del-btn {
    background-color: red;
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
