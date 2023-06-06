import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import { authActions } from '_store';
import styled from "styled-components";
import { Link } from "react-router-dom";

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
`;

const AuthButton = styled.button`
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.buttonText};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AuthorButton = () => {
    const authUser = useSelector(x => x.auth.user);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());

    // only show nav when logged in
    if (!authUser){
        return(
            <AuthButtons>
            <AuthButton><Link to={"/login"}>Login</Link></AuthButton>
            <AuthButton><Link to={"/registration"}>Register</Link></AuthButton>
          </AuthButtons>
        )
    }


    return(
        <AuthButtons>
                <button onClick={logout} className="btn btn-link nav-item nav-link">Logout</button>
        </AuthButtons>
    )
}

export default AuthorButton;