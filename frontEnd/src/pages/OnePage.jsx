import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/atoms/button';
import CircularProgressBar from '../components/atoms/circularProgressbar';
import Spinner from '../components/atoms/spinner';
import AddTask from '../components/molecules/AddForm';
import EmptyState from '../components/molecules/emptyState';
import { COLORS } from '../constants/colors';
import { FONTSIZES, FONTWEIGHT } from '../constants/fonts';
import { getFetch } from '../func';
import { DPIconStats } from '../icons/indxe';
import BodyLayout from '../layout/bodyLayout';
import Modal from '../layout/modal';

const TaskCards = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import('../components/molecules/TaskCards')),
      1000
    );
  });
});

const OnePage = () => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState();
  const [doneTasks, setDoneTasks] = useState();
  const [open, setOpen] = useState(false);

  const url = 'https://trac-trac.vercel.app/app/dayTasks';
  const donrUrl = ' https://trac-trac.vercel.app/app/dayDoneTasks';
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const getToken = localStorage.getItem('token');
    const token = JSON.parse(getToken);

    getFetch(token, donrUrl).then((data) => {
      setDoneTasks(data.result);
    });

    getFetch(token, url).then((data) => {
      if (data.message === 'Token Expired') {
        navigate('/login');
      }
      setTasks(data.result);
      setLoading(false);
    });
  }, [navigate]);

  const reFetch = () => {
    const getToken = localStorage.getItem('token');
    const token = JSON.parse(getToken);

    getFetch(token, url).then((data) => {
      if (data.message === 'Token Expired') {
        navigate('/login');
      }
      setTasks(data.result);
    });

    getFetch(token, donrUrl).then((data) => {
      if (data.message === 'Token Expired') {
        navigate('/login');
      }
      setDoneTasks(data.result);
    });
  };

  const analytics = (doneTasks?.length / tasks?.length) * 100;
  return (
    <BodyLayout onRefresh={() => reFetch()}>
      <OnePageWrapper>
        <OnePageHeader>Task Manager</OnePageHeader>
        <Modal show={open} hide={() => setOpen(false)}>
          <AddTask
            onClose={() => {
              setOpen(false);
              reFetch();
            }}
          />
        </Modal>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="top-tier">
              <OnePageSubHeader>{`You have ${tasks?.length} tasks today`}</OnePageSubHeader>
              <Button onClick={() => setOpen(true)} className="task-btn">
                Add New Task +
              </Button>
            </div>
            {tasks?.length === 0 ? (
              <EmptyState onClick={() => setOpen(true)} />
            ) : (
              <OnePageContainer>
                <OnePageMetrics>
                  <div className="metric-text">
                    <CircularProgressBar
                      percentage={analytics}
                      colour={COLORS['persian-indigo']}
                    />
                    <OnePageText>Task Progress</OnePageText>
                    <OnePageSubText>
                      {doneTasks?.length}/{tasks?.length}
                      <span className="sub_text"> tasks done</span>
                    </OnePageSubText>
                  </div>
                  <DPIconStats className="stats-icon" />
                </OnePageMetrics>
                <Suspense fallback={<Spinner />}>
                  <TaskCards data={tasks} onClose={() => reFetch()} />
                </Suspense>
              </OnePageContainer>
            )}
          </>
        )}
      </OnePageWrapper>
    </BodyLayout>
  );
};

export default OnePage;

const OnePageWrapper = styled.div`
  max-width: 122rem;
  margin: 0 auto;

  .top-tier {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2.5rem;

    .task-btn {
      display: none;
    }
  }

  @media only screen and (min-width: 785px) {
    .top-tier {
      padding: 2.5rem;

      .task-btn {
        display: block;
      }
    }
    .task-btn {
      padding: 1.2rem;
      border-radius: 0.8rem;
      font-size: ${FONTSIZES.base};
      font-weight: ${FONTWEIGHT.bold};
      cursor: pointer;
      background-color: ${COLORS.frosbite};
      color: ${COLORS.white};

      &:hover {
        background-color: ${COLORS.white};
        color: ${COLORS.frosbite};
      }
    }
  }
`;

const OnePageHeader = styled.h1`
  font-size: ${FONTSIZES.xlagre};
  margin-bottom: 4.5rem;

  @media only screen and (min-width: 785px) {
    font-size: ${FONTSIZES.xxlagre};
    font-weight: ${FONTWEIGHT.bold};
    padding-top: 2rem;
    padding-left: 3rem;
    margin-bottom: 4.5rem;
  }
`;
const OnePageSubHeader = styled.h1`
  font-size: ${FONTSIZES.lg};

  @media only screen and (min-width: 785px) {
    padding-left: 3rem;
  }
`;

const OnePageContainer = styled.div`
  overflow: scroll;
  height: calc(100vh - 22rem);

  @media only screen and (min-width: 785px) {
    display: flex;
    justify-content: center;
    gap: 2.5rem;
    flex-wrap: wrap;
    height: calc(100vh - 21rem);
  }
`;
const OnePageMetrics = styled.div`
  position: relative;
  display: flex;
  gap: 2.7rem;
  justify-content: center;
  width: 100%;
  background-color: transparent;
  border: 0.5px solid ${COLORS['grey-200']};
  border-radius: 1.6rem;
  padding: 1.6rem;
  margin-bottom: 2.5rem;
  z-index: 1;

  .metric-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stats-icon {
    position: absolute;
    right: 15px;
    top: 15px;
  }

  @media only screen and (min-width: 785px) {
    border: none;
  }
`;

const OnePageText = styled.p`
  font-size: ${FONTSIZES.lg};
  font-weight: ${FONTWEIGHT.bold};
  margin-bottom: 0.8rem;
`;

const OnePageSubText = styled.p`
  font-size: ${FONTSIZES.base};
  font-weight: ${FONTWEIGHT.bold};
  color: ${COLORS['persian-indigo']};
  .sub_text {
    color: ${COLORS['grey-200']};
    font-size: ${FONTSIZES.small};
  }
`;
