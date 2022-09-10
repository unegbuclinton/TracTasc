import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants/colors';

const Modal = ({ children, show, hide }) => {
  if (!show) {
    return null;
  }
  return (
    <ModalWrapper onClick={hide}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;

const ModalWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 2;

  .cancel-btn {
    position: absolute;
    color: ${COLORS.white};
    top: 20px;
    right: 20px;
  }
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
`;
