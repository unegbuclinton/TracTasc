import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../../../constants/colors';
import { FONTSIZES, FONTWEIGHT } from '../../../constants/fonts';
import img from '../../../icons/img/profile.jpg';
import {
  DPIconCompleted,
  DPIconHistory,
  DPIconHome,
  DPIconLogout,
} from '../../../icons/indxe';

const SideBar = () => {
  const navigate = useNavigate();
  const links = [
    { text: 'Home', path: '/Home', icon: <DPIconHome /> },
    { text: 'Done Tasks', path: '/done', icon: <DPIconCompleted /> },
    { text: 'Task History', path: '/history', icon: <DPIconHistory /> },
  ];

  const logOut = () => {
    window.localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <>
      <SideBarContainer>
        <SideBarInfo>
          <SideBarImg src={img} />
          <SideBarProfileText>Unegbu Clinton</SideBarProfileText>
        </SideBarInfo>
        {links?.map(({ text, path, icon }, idx) => (
          <NavLink
            key={idx}
            className={({ isActive }) =>
              isActive ? 'nav-links--selected' : 'nav-links'
            }
            to={path}
          >
            {icon} {text}
          </NavLink>
        ))}

        <div className="logout-wrapper" onClick={() => logOut()}>
          <DPIconLogout />
          <p>Logout</p>
        </div>
      </SideBarContainer>
    </>
  );
};

export default SideBar;

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  height: 100%;
  background-color: ${COLORS['persian-indigo']};

  .nav-links {
    display: flex;
    align-items: center;
    gap: 2.5rem;
    text-decoration: none;
    font-size: ${FONTSIZES.lg};
    margin-bottom: 3rem;
    color: ${COLORS.white};
    padding: 1.5rem 0 1.5rem 1.2rem;

    &--selected {
      display: flex;
      align-items: center;
      gap: 2.5rem;
      text-decoration: none;
      font-size: ${FONTSIZES.lg};
      margin-bottom: 4.5rem;
      color: ${COLORS.seashell};
      font-weight: ${FONTWEIGHT.bold};
      padding: 1.5rem 0 1.5rem 1.2rem;

      background-color: ${COLORS.frosbite};
      color: ${COLORS.white};
    }

    &:hover {
      background-color: ${COLORS.frosbite};
      color: ${COLORS.white};
    }
  }

  .logout-wrapper {
    display: flex;
    align-items: center;
    gap: 2.5rem;
    padding: 1.5rem 0 1.5rem 1.2rem;
    color: ${COLORS.white};
    font-size: ${FONTSIZES.lg};
    cursor: pointer;
  }
`;

const SideBarInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  margin: 2rem 0;
`;

const SideBarProfileText = styled.p`
  color: ${COLORS.white};
  font-size: ${FONTSIZES.xlagre};
  font-weight: ${FONTWEIGHT.bold};
`;

const SideBarImg = styled.img`
  height: 12rem;
  width: 12rem;
  object-fit: cover;
  border-radius: 50%;
`;
