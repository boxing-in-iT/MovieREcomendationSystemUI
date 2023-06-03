import styled from "styled-components";
import ListComponent from "../List";
import { useState, useEffect } from "react";
import Button from "../Button";

const Section = styled.section`
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.text};
  color: ${(props) => props.theme.body};

  display: flex;
  justidy-content: center;
  align-items: center;
  position: relative;
`;

const Container = styled.div`
  position: relative;
  width: 75%;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 64em) {
    width: 85%;
  }

  @media (max-width: 64em) {
    width: 100%;
    flex-direction: column;

    & > *:last-child {
      width: 80%;
    }
  }

  @media (max-width: 40em) {
    & > *:last-child {
      width: 90%;
    }
  }
`;

const Box = styled.div`
  width: 50%;
  height: 100%;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 40em) {
    min-height: 50vh;
  }

  @media (max-width: 30em) {
    z-index: 100;

    width: 70%;
  }
`;

const Title = styled.h3`
  font-size: ${(props) => props.theme.fontxxl};
  text-transform: capitalize;
  ${"" /* align-self: flex-start; */}
  width: 80%;
  argin: 0 auto;

  @media (max-width: 64em) {
    width: 100%;
  }

  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontxl};
  }

  @media (max-width: 30em) {
    font-size: ${(props) => props.theme.fontlg};
    margin-top: -35%;
    z-index: 100;
  }
`;

const SubText = styled.p`
  font-size: ${(props) => props.theme.fontlg};
  width: 80%;
  margin: 1rem auto;
  font-weight: 400;
  align-self: flex-start;

  @media (max-width: 64em) {
    width: 100%;
    font-size: ${(props) => props.theme.fontmd};
  }

  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontmd};
  }

  @media (max-width: 30em) {
    font-size: ${(props) => props.theme.fontsm};
  }
`;

const InputContainer = styled.div`
  display: flex;
  width: 80%;
  margin: 1rem auto;
  align-self: flex-start;

  @media (max-width: 64em) {
    width: 100%;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 80%;
  margin: 1rem auto;
  justidy-content: center;
  align-self: flex;

  @media (max-width: 64em) {
    width: 100%;
  }
`;

const Home = () => {
  const [movies, setMovies] = useState([
    {
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
      year: 1994,
    },
    { title: "The Godfather", director: "Francis Ford Coppola", year: 1972 },
    { title: "The Dark Knight", director: "Christopher Nolan", year: 2008 },
    {
      title: "The Godfather: Part II",
      director: "Francis Ford Coppola",
      year: 1974,
    },
    { title: "12 Angry Men", director: "Sidney Lumet", year: 1957 },
    { title: "Schindler's List", director: "Steven Spielberg", year: 1993 },
    {
      title: "The Lord of the Rings: The Return of the King",
      director: "Peter Jackson",
      year: 2003,
    },
    { title: "Pulp Fiction", director: "Quentin Tarantino", year: 1994 },
    {
      title: "The Good, the Bad and the Ugly",
      director: "Sergio Leone",
      year: 1966,
    },
    { title: "Forrest Gump", director: "Robert Zemeckis", year: 1994 },
  ]);
  const [title, setTitle] = useState("");

  const [topMovies, setTopMovies] = useState([]);

  const [recMovies, setRecMovies] = useState([]);

  useEffect(() => {
    try {
      fetch("http://127.0.0.1:5000/top_movies")
        .then((response) => response.json())
        .then((data) => {
          const topMoviesArray = Object.values(data.top_movies);
          setTopMovies(topMoviesArray);
          console.log(topMoviesArray);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:5000/movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data);
        setRecMovies(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const Test = () => {
    console.log(topMovies);
  };
  return (
    <>
      <Section>
        <Container>
          <Box>
            <Title>Welcome on IDBM</Title>
            {/* <InputContainer>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Input>
            </InputContainer> */}
            {/* <ButtonContainer>
              <Button text={"Enter"} type="button" />
            </ButtonContainer> */}
          </Box>
          <Box>
            <ListComponent movies={topMovies} />
          </Box>
        </Container>
      </Section>
    </>
  );
};
export default Home;
