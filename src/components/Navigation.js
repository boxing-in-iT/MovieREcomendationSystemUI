import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Section = styled.div`
  width: 100vw;
  background-color: ${(props) => props.theme.body};
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 85%;
  height: ${(props) => props.theme.navHeight};
  margin: 0 auto;
`;

const Menu = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
`;
const MenuItem = styled.li`
  margin: 0 1rem;
  color: ${(props) => props.theme.text};
  cursor: pointer;

  &::after {
    content: " ";
    display: block;
    width: 0%;
    height: 2px;
    background: ${(props) => props.theme.text};
    transition: width 0.3s ease;
  }
  &:hover::after {
    width: 100%;
  }
`;

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

const Navigation = () => {
  return (
    <>
      <Section>
        <NavBar>
          <Logo />
          <Menu>
            <MenuItem>
              <Link to={"/"}>Home</Link>
            </MenuItem>
            <MenuItem>
              <Link to={"/movieLibrary"}>Movie Library</Link>
            </MenuItem>
            <MenuItem>
              <Link to={"/myRecs"}>My Recommendations</Link>
            </MenuItem>
            <MenuItem>
              <Link to={"/about"}>About project</Link>
            </MenuItem>
          </Menu>
          <AuthButtons>
            <AuthButton><Link to={"/login"}>Login</Link></AuthButton>
            <AuthButton><Link to={"/registration"}>Register</Link></AuthButton>
          </AuthButtons>
        </NavBar>
      </Section>
    </>
  );
};
export default Navigation;
