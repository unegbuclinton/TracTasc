import { useFormik } from 'formik';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { COLORS } from '../../../constants/colors';
import { addTask, getFetch } from '../../../func';
import { formSchema } from '../../../validation/Schema';
import Button from '../../atoms/button';
import InputField from '../../atoms/input';
import Spinner from '../../atoms/spinner';
import ErrorMessage from '../errorMessage';

const AddTask = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const getToken = localStorage.getItem('token');
  const token = JSON.parse(getToken);

  const formik = useFormik({
    initialValues: {
      task: '',
      desc: '',
      date: '',
    },
    validationSchema: formSchema,

    onSubmit: (values) => {
      setLoading(true);
      const url = 'https://trac-trac.vercel.app/app/task';
      const historyUrl = 'https://trac-trac.vercel.app/app/tasks';
      const data = {
        task: values.task,
        description: values.desc,
        date: values.date,
      };
      addTask(data, url, token).then(() => {
        onClose();
        toast.success('Task added Sucessfully');
        getFetch(token, historyUrl);
      });
    },
  });

  return (
    <TaskWrapper onSubmit={formik.handleSubmit}>
      <TaskHeader>Add New Task</TaskHeader>
      <InputField
        inputClass="add-task__field"
        placeholder="Add Task"
        id="task"
        name="task"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.task}
      />
      <InputField
        inputClass="add-task__field"
        placeholder="Description"
        id="desc"
        name="desc"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.desc}
      />
      <InputField
        className="add-task__field"
        placeholder="Add Task"
        type="date"
        id="date"
        name="date"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.date}
      />
      {formik.touched.date && formik.errors.date ? (
        <ErrorMessage>{formik.errors.date}</ErrorMessage>
      ) : null}
      <Button type="submit" disabled={loading} className="task-btn">
        {loading ? <Spinner /> : ' Add Task'}
      </Button>
    </TaskWrapper>
  );
};

export default AddTask;

const TaskWrapper = styled.form`
  width: 31rem;
  padding: 1.5rem 1.2rem;
  background-color: ${COLORS.white};
  border-radius: 0.8rem;

  .add-task__field {
    border-bottom: 1px solid ${COLORS['grey-200']};
    margin-top: 3.5rem;
  }
  .task-btn {
    width: 100%;
    margin-top: 2rem;
    padding: 1.2rem;
    border-radius: 0.8rem;
    color: ${COLORS.white};
    cursor: pointer;
    background-color: ${COLORS['persian-indigo']};
  }

  @media only screen and (min-width: 785px) {
    width: 55rem;
    padding: 1.8rem 2rem;
  }
`;

const TaskHeader = styled.h1`
  text-align: center;
`;
