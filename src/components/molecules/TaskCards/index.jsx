import dayjs from 'dayjs';
import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants/colors';
import { FONTSIZES, FONTWEIGHT } from '../../../constants/fonts';
import { delFunc, updateTask } from '../../../func';
import { DPIconCancel } from '../../../icons/indxe';
import Modal from '../../../layout/modal';
import CheckedTask from '../../atoms/checked';
import DeleteTask from '../deleteTask';
import DoneTaskModal from '../doneTask';

const TaskCards = ({ data, onClose }) => {
  const [id, setId] = useState('');
  const [doneModal, setDoneModal] = useState(false);
  const [delModal, setDelModal] = useState(false);

  const deleteTask = () => {
    const getToken = localStorage.getItem('token');
    const token = JSON.parse(getToken);
    const url = `http://localhost:4000/app/tasks/${id}`;
    delFunc(token, url).then(() => {
      onClose();
      setDelModal(false);
    });
  };

  const setDel = (id) => {
    setId(id);
    setDelModal(true);
  };

  const doneTask = (id) => {
    setId(id);
    setDoneModal(true);
  };

  const updateTaskFunc = () => {
    const getToken = localStorage.getItem('token');
    const token = JSON.parse(getToken);
    const url = `http://localhost:4000/app/tasks/${id}`;
    const data = {
      status: true,
    };
    updateTask(data, url, token).then(() => {
      onClose();
      setDoneModal(false);
    });
  };

  return (
    <>
      <Modal show={delModal} hide={() => setDelModal(false)}>
        <DeleteTask
          onClose={() => setDelModal(false)}
          onDel={() => deleteTask()}
        />
      </Modal>

      <Modal show={doneModal} hide={() => setDoneModal(false)}>
        <DoneTaskModal
          onClose={() => setDoneModal(false)}
          onDone={() => updateTaskFunc()}
        />
      </Modal>

      {data?.map((data, idx) => (
        <TaskCard key={idx}>
          <div>
            <TaskContainer>
              <TaskText>{data?.task}</TaskText>
              <DPIconCancel
                onClick={() => setDel(data._id)}
                style={{ cursor: 'pointer' }}
              />
            </TaskContainer>
            <TaskSubText>{data?.description}</TaskSubText>
          </div>

          <div className="footer">
            <TaskDate>{dayjs(data.date).format('ddd, MMM D, YYYY')}</TaskDate>
            {data?.status ? (
              <CheckedTask />
            ) : (
              <p className="done" onClick={() => doneTask(data._id)}>
                Not Done
              </p>
            )}
          </div>
        </TaskCard>
      ))}
    </>
  );
};

export default TaskCards;

const TaskCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-height: 20rem;
  background-color: ${COLORS.frosbite};
  border-radius: 1.6rem;
  padding: 1.6rem;
  margin-bottom: 1.2rem;

  .footer {
    .done {
      font-size: ${FONTSIZES.small};
      text-decoration: underline;
      cursor: pointer;
    }
  }

  @media only screen and (min-width: 785px) {
    max-width: 31.5rem;
    padding: 2rem;
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const TaskText = styled.p`
  font-size: ${FONTSIZES.lg};
  font-weight: ${FONTWEIGHT.bold};
  color: ${COLORS.white};
  margin-bottom: 0.8rem;
`;

const TaskSubText = styled.p`
  font-size: ${FONTSIZES.lg};
  font-weight: ${FONTWEIGHT.medium};
  color: ${COLORS.white};
`;

const TaskDate = styled.p`
  font-size: ${FONTSIZES.small};
  margin-top: 1rem;
  color: ${COLORS.seashell};
`;

const TaskContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
