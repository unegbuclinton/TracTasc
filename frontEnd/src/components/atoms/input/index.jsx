import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants/colors';
import { DPIconHide, DPIconUnhide } from '../../../icons/indxe';

const InputField = ({
  placeholder,
  className,
  type,
  inputClass,
  id,
  name,
  defaultChecked,
  value,
  onBlur,
  onChange,
}) => {
  const [show, setShow] = useState(false);
  const toggleShowPassword = () => setShow((prev) => !prev);
  return (
    <Container className={className}>
      <Input
        placeholder={placeholder}
        type={type === 'password' ? (show ? 'text' : 'password') : type}
        className={inputClass}
        id={id}
        name={name}
        defaultChecked={defaultChecked}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />

      {type === 'password' && (
        <InputFieldIcon onClick={toggleShowPassword}>
          {show ? (
            <DPIconHide className="icon" />
          ) : (
            <DPIconUnhide className="icon" />
          )}
        </InputFieldIcon>
      )}
    </Container>
  );
};

export default InputField;

const Container = styled.div`
  position: relative;
`;

const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;
  /* height: 4.4rem; */
  color: ${COLORS.black};
  background-color: transparent;
  border-bottom: 1px solid ${COLORS.white};
  padding-left: 0.8rem;
  margin-bottom: 0.6rem;
  padding-bottom: 0.5rem;
  font-size: 20px;
`;

const InputFieldIcon = styled.div`
  position: absolute;
  bottom: 10px;
  right: 9px;
`;
