import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import styled from 'styled-components';


const RegisterPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${(props) => props.theme.text};
`;

const RegisterForm = styled.form`
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

const CancelButton = styled(Link)`
  padding: 10px;
  color: #007bff;
  text-decoration: none;
  border-radius: 3px;
  cursor: pointer;
`;

const TestRegister = () => {
  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    mail: Yup.string().email("Invalid email").required("Email is required"),
    birth: Yup.date().required("Birthdate is required"),
    profession: Yup.string().required("Profession is required"),
    country: Yup.string().required("Country is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit(data) {
    console.log(data); // Handle form submission
  }

  return (
    <RegisterPageContainer>
      <RegisterForm onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            name="name"
            type="text"
            {...register("name")}
            className={`${errors.name ? 'is-invalid' : ''}`}
          />
          {errors.name && <div className="invalid-feedback">{errors.name?.message}</div>}
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            name="mail"
            type="text"
            {...register("mail")}
            className={`${errors.mail ? 'is-invalid' : ''}`}
          />
          {errors.mail && <div className="invalid-feedback">{errors.mail?.message}</div>}
        </FormGroup>
        <FormGroup>
          <Label>Birthdate:</Label>
          <Input
            name="birth"
            type="date"
            {...register("birth")}
            className={`${errors.birth ? 'is-invalid' : ''}`}
          />
          {errors.birth && <div className="invalid-feedback">{errors.birth?.message}</div>}
        </FormGroup>
        <FormGroup>
          <Label>Profession:</Label>
          <Input
            name="profession"
            type="text"
            {...register("profession")}
            className={`${errors.profession ? 'is-invalid' : ''}`}
          />
          {errors.profession && <div className="invalid-feedback">{errors.profession?.message}</div>}
        </FormGroup>
        <FormGroup>
          <Label>Country:</Label>
          <Input
            name="country"
            type="text"
            {...register("country")}
            className={`${errors.country ? 'is-invalid' : ''}`}
          />
          {errors.country && <div className="invalid-feedback">{errors.country?.message}</div>}
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            name="password"
            type="password"
            {...register("password")}
            className={`${errors.password ? 'is-invalid' : ''}`}
          />
          {errors.password && <div className="invalid-feedback">{errors.password?.message}</div>}
        </FormGroup>
        <Button disabled={isSubmitting}>
          {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
          Register
        </Button>
        <CancelButton to="../login">Cancel</CancelButton>
      </RegisterForm>
    </RegisterPageContainer>
  );
}
export default TestRegister;

