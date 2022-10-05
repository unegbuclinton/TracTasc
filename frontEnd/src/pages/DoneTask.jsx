import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/atoms/button';
import Spinner from '../components/atoms/spinner';
import AddTask from '../components/molecules/AddForm';
import EmptyState from '../components/molecules/emptyState';
import { COLORS } from '../constants/colors';
import { FONTSIZES, FONTWEIGHT } from '../constants/fonts';
import { getFetch } from '../func';
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

const DoneTask = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState();
  const [open, setOpen] = useState(false);

  const url = 'https://trac-trac.vercel.app/app/doneTasks';

  useEffect(() => {
    setLoading(true);
    const getToken = localStorage.getItem('token');
    const token = JSON.parse(getToken);

    getFetch(token, url).then((data) => {
      if (data.message === 'Token Expired') {
        navigate('/login');
      }
      setLoading(false);
      setTasks(data.result);
    });
  }, [navigate]);

  const reFetch = () => {
    const getToken = localStorage.getItem('token');
    const token = JSON.parse(getToken);

    getFetch(token, url)
      .then((data) => {
        if (data.message === 'Token Expired') {
          navigate('/login');
        }
        setTasks(data.result);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <BodyLayout onRefresh={() => reFetch()}>
      <Modal show={open} hide={() => setOpen(false)}>
        <AddTask
          onClose={() => {
            setOpen(false);
            reFetch();
          }}
        />
      </Modal>
      <HistoryWrapper>
        <HistoryHeader>Done Task</HistoryHeader>

        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="top-tier">
              <HistorySubHeader>{`You have ${tasks?.length} Done tasks`}</HistorySubHeader>
              <Button onClick={() => setOpen(true)} className="task-btn">
                Add New Task +
              </Button>
            </div>

            {tasks?.length === 0 ? (
              <EmptyState onClick={() => setOpen(true)} />
            ) : (
              <HistoryContainer>
                <Suspense fallback={<Spinner />}>
                  <TaskCards data={tasks} onClose={() => reFetch()} />
                </Suspense>
              </HistoryContainer>
            )}
          </>
        )}
      </HistoryWrapper>
    </BodyLayout>
  );
};

export default DoneTask;

const HistoryWrapper = styled.div`
  width: 100%;
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

const HistoryHeader = styled.p`
  font-size: ${FONTSIZES.xlagre};
  margin-bottom: 4.5rem;

  @media only screen and (min-width: 785px) {
    font-size: ${FONTSIZES.xxlarge};
    font-weight: ${FONTWEIGHT.bold};
    padding-top: 2rem;
    padding-left: 3rem;
    margin-bottom: 4.5rem;
  }
`;

const HistorySubHeader = styled.h1`
  font-size: ${FONTSIZES.base};

  @media only screen and (min-width: 785px) {
    font-size: ${FONTSIZES.xlarge};
    font-weight: ${FONTWEIGHT.bold};
    padding-left: 3rem;
  }
`;

const HistoryContainer = styled.div`
  overflow: scroll;
  height: calc(100vh - 24rem);

  @media only screen and (min-width: 785px) {
    display: flex;
    justify-content: center;
    gap: 2.5rem;
    flex-wrap: wrap;
    height: calc(100vh - 22rem);
  }
`;
