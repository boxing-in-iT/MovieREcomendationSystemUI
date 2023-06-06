// import React, { useState } from 'react';
// import styled from 'styled-components';

// import { useDispatch } from 'react-redux';
// import { userActions } from "../../_store";

// const RegistrationPageContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background-color: ${(props) => props.theme.text};
// `;

// const RegistrationForm = styled.form`
//   display: flex;
//   flex-direction: column;
//   width: 300px;
//   padding: 20px;
//   background: #f1f1f1;
//   border-radius: 5px;
// `;

// const FormGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 15px;
// `;

// const Label = styled.label`
//   margin-bottom: 5px;
//   font-weight: bold;
// `;

// const Input = styled.input`
//   padding: 10px;
//   border-radius: 3px;
//   border: 1px solid #ccc;
// `;

// const Select = styled.select`
//   padding: 10px;
//   border-radius: 3px;
//   border: 1px solid #ccc;
// `;

// const Option = styled.option``;

// const Button = styled.button`
//   padding: 10px;
//   background: #007bff;
//   color: #fff;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
// `;

// const Registration = () => {
//   const dispatch = useDispatch();

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [birthdate, setBirthdate] = useState('');
//   const [profession, setProfession] = useState('');
//   const [country, setCountry] = useState('');
//   const [genres, setGenres] = useState([]);
//   const [password, setPassword] = useState('');
  

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handleBirthdateChange = (event) => {
//     setBirthdate(event.target.value);
//   };

//   const handleProfessionChange = (event) => {
//     setProfession(event.target.value);
//   };

//   const handleCountryChange = (event) => {
//     setCountry(event.target.value);
//   };

//   const handleGenresChange = (event) => {
//     const selectedGenres = Array.from(event.target.selectedOptions, (option) => option.value);
//     setGenres(selectedGenres);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   async function onSubmit(data) {
//         await dispatch(userActions.register(data)).unwrap();
// }

//   return (
//     <RegistrationPageContainer>
//       <RegistrationForm onSubmit={handleSubmit}>
//         <FormGroup>
//           <Label>Name</Label>
//           <Input type="text" value={name} onChange={handleNameChange} />
//         </FormGroup>
//         <FormGroup>
//           <Label>Email</Label>
//           <Input type="email" value={email} onChange={handleEmailChange} />
//         </FormGroup>
//         <FormGroup>
//           <Label>Birthdate</Label>
//           <Input type="date" value={birthdate} onChange={handleBirthdateChange} />
//         </FormGroup>
//         <FormGroup>
//           <Label>Profession</Label>
//           <Select value={profession} onChange={handleProfessionChange}>
//             <Option value="">Select profession</Option>
//             <Option value="developer">Developer</Option>
//             <Option value="designer">Designer</Option>
//             <Option value="writer">Writer</Option>
//             {/* Add more options as needed */}
//           </Select>
//         </FormGroup>
//         <FormGroup>
//           <Label>Country</Label>
//           <Select value={country} onChange={handleCountryChange}>
//             <Option value="">Select country</Option>
//             <Option value="usa">USA</Option>
//             <Option value="uk">UK</Option>
//             <Option value="canada">Canada</Option>
//             {/* Add more options as needed */}
//           </Select>
//         </FormGroup>
//         <FormGroup>
//           <Label>Password</Label>
//           <Input type="password" value={password} onChange={handlePasswordChange} />
//         </FormGroup>
//         <Button type="submit">Register</Button>
//       </RegistrationForm>
//     </RegistrationPageContainer>
//   );
// };

// export default Registration;
