import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../_store';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f1f1f1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  background: #f1f1f1;
  border-radius: 5px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 3px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const Error = styled.div`
  color: red;
  margin-top: 10px;
`;

const TestRegister = () => {
  const dispatch = useDispatch();
  const registrationError = useSelector(state => state.alert.error); // Получаем ошибку из состояния Redux

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const mail = event.target.mail.value;
    const birth = event.target.birth.value;
    const profession = event.target.profession.value;
    const country = event.target.country.value;
    const password = event.target.password.value;

    const user = {
      name,
      mail,
      birth,
      profession,
      country,
      password,
      favorites: [],
    };

    try {
      await dispatch(userActions.register(user));
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Registration</h2>
        {registrationError && <Error>{registrationError}</Error>} {/* Выводим ошибку, если она есть */}
        <FormGroup>
          <Label>Name:</Label>
          <Input type="text" name="name" />
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input type="email" name="mail" />
        </FormGroup>
        <FormGroup>
          <Label>Birthdate:</Label>
          <Input type="date" name="birth" />
        </FormGroup>
        <FormGroup>
          <Label>Profession:</Label>
          <Input type="text" name="profession" />
        </FormGroup>
        <FormGroup>
          <Label>Country:</Label>
          <Input type="text" name="country" />
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input type="password" name="password" />
        </FormGroup>
        <Button type="submit">Register</Button>
      </Form>
    </Container>
  );
};

export default TestRegister;

