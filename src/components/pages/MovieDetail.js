import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Papa from "papaparse"; // A popular CSV parser library
import dataSet from "../../assets/data/tmdb_5000_movies.csv";
import dataSet2 from "../../assets/data/tmdb_5000_credits.csv";
import { Link } from "react-router-dom";
import ListComponent from "../List";
import Button from "components/Button";

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { favoritesActions } from "../../_store";

const MovieDirector = styled.p`
  font-size: 0.9rem;
  margin-bottom: 5px;
`;
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

const Btn = styled.button`
  display: inline-block;
  background-color: transparent;
  color: #d5ff10;
  outline: none;
  border: 1px solid #d5ff10;

  font-size: ${(props) => props.theme.fontsm};
  padding: 0.7rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 900;

  text-align: center;
  letter-spacing: 0.04em;
  text-transform: uppercase;

  &:hover {
    color: #000000;
    transform: scale(0.9);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #d5ff10;
  }
`;

const MovieDetail = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);



  const dispatch = useDispatch();
  const { user: authUser } = useSelector(x => x.auth);
  const { isFavorite } = useSelector(state => state.favs);

  useEffect(() => {
    dispatch(favoritesActions.isFavorite(authUser.id, id));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const [userData, setUserData] = useState({
    userId: "",
    movieId: "",
  });
  
  
 // const authUser = useSelector(x => x.auth.user);
 // const dispatch = useDispatch();

  useEffect(() => {
    Papa.parse(dataSet, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const modifiedResults = results.data.map((row) => {
          const modifiedGenres = row.genres.replace(/'/g, '"');
          const modifiedCompanies = row.production_companies
            ? row.production_companies.replace(/'/g, '"')
            : "";
          return {
            ...row,
            genres: modifiedGenres,
            production_companies: modifiedCompanies,
          };
        });

        setMovie(modifiedResults.find((movie) => movie.id === id));
      },
    });

    setIsLoading(false);

    Papa.parse(dataSet2, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const res = results.data.find((cast) => cast.movie_id === id);
        const dataString = res.cast;
        const dataJson = JSON.parse(dataString);
        setData(dataJson);
      },
    });
  }, [id]);

  useEffect(() => {
    try {
      fetch("http://127.0.0.1:5000/movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: movie.title }),
      })
        .then((response) => response.json())
        .then((data) => {
          const recommendationsArray = Object.values(data.recommendations);
          setRecommendations(recommendationsArray);
          console.log(recommendationsArray);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }, [movie]);

  useEffect(() => {
    dispatch(favoritesActions.isFavorite({ userId: authUser.id, movieId: id }));
  }, [id, authUser.id]);

  async function handleClick(userId, movieId){
    return dispatch(favoritesActions.addToFavorites({userId, movieId}));
  }

  // const handleClick = () => {
  //   console.log(authUser, id)
  // }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }
  return (
    <>
      <Section>
        <Container>
          <Box>
            <Title>{movie.title}</Title>
            <SubText>
              <p>Released: {movie.release_date}</p>
              <p>
                Official website: <a href={movie.homepage}>Toy story</a>
              </p>
              <MovieDirector>
                Genres:{" "}
                {movie.genres &&
                  JSON.parse(movie.genres)
                    .map((genre) => genre.name)
                    .join(", ")}
              </MovieDirector>
              <MovieDirector>
                Company:{" "}
                {movie.production_companies &&
                  JSON.parse(movie.production_companies)
                    .map((production_companies) => production_companies.name)
                    .join(", ")}
              </MovieDirector>
              Cast:{" "}
              {data &&
                data
                  .slice(0, 5)
                  .map((dt) => dt.name)
                  .join(", ")}
              <p>Overview: {movie.overview}</p>
            </SubText>
            {authUser && !isFavorite && (
              <Btn type="button" onClick={() => handleClick(authUser.id, id)}>
                Add to favorites
              </Btn>
            )}
          </Box>
          <Box>
            <ListComponent movies={recommendations} />
          </Box>
        </Container>
      </Section>
    </>
  );
};

export default MovieDetail;
