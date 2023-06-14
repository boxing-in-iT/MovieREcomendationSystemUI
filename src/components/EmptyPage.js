import styled from "styled-components";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";

const EmptyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${(props) => props.theme.text};
  color: ${(props) => props.theme.body};
  text-align: center;
  font-size: 3rem;
  padding: 2rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    padding: 1rem 0.5rem;
  }
`;

const TextContainer = styled.div`
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div``;

// const Button = styled.button`
//   background-color: #333;
//   color: #fff;
//   font-size: 1.5rem;
//   padding: 1rem 2rem;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: background-color 0.2s ease-in-out;

//   &:hover {
//     background-color: #222;
//   }
// `;
const EmptyPage = () => {

  const dispatch = useDispatch();
  const {user: authUser} = useSelector(x => x.auth);

  return (
    <>
      <EmptyPageContainer>
        <TextContainer>
          <p>
            Sorry, {authUser?.name} we do not have recommendations specifically for you, since
            you have not previously marked films that you liked.
          </p>
          <p>Please go to the movie library and select the movies you like.</p>
        </TextContainer>
        <ButtonContainer>
          <Button text={"Go to the movie library"} type="button" />
        </ButtonContainer>
      </EmptyPageContainer>
    </>
  );
};

export default EmptyPage;
