import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ListColumn = styled.div`
  flex-basis: 40%;
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

const ListComponent = ({ movies }) => {
  const numMoviesPerColumn = Math.ceil(movies.length / 2);
  return (
    <>
      <ListContainer>
        <ListColumn>
          {movies.slice(0, numMoviesPerColumn).map((movie, index) => (
            <Link to={`/movies/${movie.id}`}>
              <ListItem key={index}>
                <MovieTitle>{movie.title}</MovieTitle>
                {/* <MovieItem>
                  Company:{" "}
                  {movie.companies &&
                    JSON.parse(movie.companies)
                      .slice(0, 1)
                      .map((companies) => companies.name)
                      .join(", ")}
                </MovieItem> */}
                {/* <MovieItem>Year: {movie.year} </MovieItem> */}
              </ListItem>
            </Link>
          ))}
        </ListColumn>
        <ListColumn>
          {movies.slice(numMoviesPerColumn).map((movie, index) => (
            <Link to={`/movies/${movie.id}`}>
              <ListItem key={index}>
                <MovieTitle>{movie.title}</MovieTitle>
                {/* <MovieItem>
                  Company:{" "}
                  {movie.companies &&
                    JSON.parse(movie.companies)
                      .slice(0, 1)
                      .map((companies) => companies.name)
                      .join(", ")}
                </MovieItem> */}
                {/* <MovieItem>Year: {movie.year}</MovieItem> */}
              </ListItem>
            </Link>
          ))}
        </ListColumn>
      </ListContainer>
    </>
  );
};

export default ListComponent;
