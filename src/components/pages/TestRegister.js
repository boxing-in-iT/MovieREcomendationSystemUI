import React from 'react';
import { useDispatch } from 'react-redux';
import { userActions, alertActions } from '../../_store';


// Register component
const TestRegister = () => {
    const dispatch = useDispatch();
  
    const handleSubmit = (event) => {
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
  
      dispatch(userActions.register(user));
    };
  
    return (
      <div>
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" name="name" />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="mail" />
          </div>
          <div>
            <label>Birthdate:</label>
            <input type="date" name="birth" />
          </div>
          <div>
            <label>Profession:</label>
            <input type="text" name="profession" />
          </div>
          <div>
            <label>Country:</label>
            <input type="text" name="country" />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  };

  export default TestRegister;