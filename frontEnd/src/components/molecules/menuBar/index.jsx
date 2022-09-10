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

const SidebarMenu = () => {
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
    <SidebarWrapper>
      <SidebarInfo>
        <SidebarImg src={img} />
        <SidebarText>Unegbu Clinton</SidebarText>
      </SidebarInfo>
      <SidebarContainer>
        {links?.map(({ text, path, icon }, idx) => (
          <NavLink
            key={idx}
            className={({ isActive }) =>
              isActive ? 'nav-links--selected' : 'nav-links'
            }
            to={path}
          >
            {icon}
            {text}
          </NavLink>
        ))}
      </SidebarContainer>

      <div className="logout-wrapper" onClick={() => logOut()}>
        <DPIconLogout />
        <p>Logout</p>
      </div>
    </SidebarWrapper>
  );
};

export default SidebarMenu;

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5.5rem;

  .logout-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem 0 1.5rem 1.2rem;
    color: ${COLORS.white};
    font-size: ${FONTSIZES.lg};
    cursor: pointer;
  }
`;
const SidebarInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
`;
const SidebarText = styled.p`
  font-size: ${FONTSIZES.xlagre};
  font-weight: ${FONTWEIGHT.bold};
  color: ${COLORS.white};
  text-align: center;
  margin-top: 1.2rem;
`;

const SidebarImg = styled.img`
  width: 10rem;
  height: 10rem;
  object-fit: cover;
  border-radius: 50%;
`;
const SidebarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .nav-links {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    font-size: ${FONTSIZES.lg};
    margin-bottom: 4.5rem;
    color: ${COLORS.seashell};
    padding: 1.5rem 0 1.5rem 1.2rem;

    &--selected {
      display: flex;
      align-items: center;
      gap: 1rem;
      text-decoration: none;
      font-size: ${FONTSIZES.lg};
      margin-bottom: 4.5rem;
      color: ${COLORS.seashell};
      padding: 1.5rem 0 1.5rem 1.2rem;
      background-color: ${COLORS.frosbite};
    }
  }
`;
