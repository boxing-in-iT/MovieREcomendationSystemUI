import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ListColumn = styled.div`
  flex-basis: 33.33%;
  padding: 1rem;

  @media screen and (max-width: 768px) {
    flex-basis: 100%;
  }
`;

const ListItem = styled.div`
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 5px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 5px 5px 10px #ccc;
    cursor: pointer;
  }
`;

const MovieTitle = styled.h3`
  margin-top: 0;
`;
const MovieItem = styled.p`
  margin-bottom: 0.5rem;
`;

const ListForRe = ({ movies }) => {
  return (
    <Container>
      <ListContainer>
        {movies.map((movie, index) => (
          <Link to={`/movies/${movie.id}`} key={index}>
            <ListColumn>
              <ListItem>
                <MovieTitle>{movie.title}</MovieTitle>
              </ListItem>
            </ListColumn>
          </Link>
        ))}
      </ListContainer>
    </Container>
  );
};

export default ListForRe;

