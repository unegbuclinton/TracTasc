import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import AddTask from '../components/molecules/AddForm';
import SidebarMenu from '../components/molecules/menuBar';
import SideBar from '../components/molecules/sideBar';
import { COLORS } from '../constants/colors';
import img from '../icons/img/profile.jpg';
import { DPIconAdd, DPIconBars } from '../icons/indxe';
import Modal from './modal';

const BodyLayout = ({ children, onRefresh }) => {
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (show && ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.body.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.body.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [show]);

  return (
    <BodyWrapper add={add}>
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="mobile-utils">
        <Modal show={add} hide={() => setAdd(false)}>
          <AddTask
            onClose={() => {
              setAdd(false);
              onRefresh();
            }}
          />
        </Modal>

        <BodyContainer>
          <BodyImg src={img} alt="" />
          <DPIconBars onClick={() => setShow((prev) => !prev)} ref={ref} />
        </BodyContainer>
        <SidebarContainer show={show}>
          <SidebarMenu />
        </SidebarContainer>
        <DPIconAdd
          className="add-icon"
          onClick={() => setAdd((prev) => !prev)}
        />
      </div>
      <div className="body-content"> {children}</div>
    </BodyWrapper>
  );
};

export default BodyLayout;

const BodyWrapper = styled.section`
  height: 90vh;
  position: relative;
  padding: 3rem 2.8rem;

  .add-icon {
    position: fixed;
    bottom: 20px;
    right: 20px;
    transform: ${({ add }) => (add ? 'rotate(45deg)' : 'rotate(360deg)')};
    transition: transform 0.4s ease-in-out;
    z-index: 5;
  }
  .sidebar {
    display: none;
  }

  .body-content {
    flex: 1;
  }
  @media only screen and (min-width: 785px) {
    display: flex;
    padding: 0;
    height: 100vh;

    .mobile-utils {
      display: none;
    }

    .sidebar {
      display: block;
    }
  }
`;

const BodyContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5rem;

  @media only screen and (min-width: 785px) {
    transform: translateX(-150%);
    transition: transform 0.2s ease-in-out;
  }
`;

const SidebarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 45%;
  height: 100vh;
  background-color: ${COLORS['persian-indigo']};
  transform: ${({ show }) => (show ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.2s ease-in-out;
  z-index: 2;
`;

const BodyImg = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  object-fit: cover;
  border-radius: 50%;
`;
