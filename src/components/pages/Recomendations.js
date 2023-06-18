import { useState, useEffect } from "react";
import styled from "styled-components";
import EmptyPage from "../EmptyPage";
import { useSelector, useDispatch } from 'react-redux';

import Papa from "papaparse"; // A popular CSV parser library
import dataSet from "../../../src/assets/data/tmdb_5000_movies.csv";

import { favoritesActions, userActions } from '../../_store';

import { Link } from "react-router-dom";
import MovieTable from "components/MovieTable";
import ListComponent from "components/List";
import ListForRec from "components/ListForRec";

const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  min-height: 100vh;
  width: 100%;
  padding-top: 2%;

  ${'' /* background-color: ${(props) => props.theme.text}; */}
`;

const Recommendations = () => {

  const dispatch = useDispatch();
    const { user: authUser } = useSelector(x => x.auth);
    const { users } = useSelector(x => x.users);
    const {favs} = useSelector(state => state.favs);
    const [recMoviesId, setRecMoviesId] = useState([]);
    const [recMovies, setRecMovies] = useState([]);
    const [favMoviesName, setFavMoviesName] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

useEffect(() => {
  if (authUser?.id) {
    const usId = authUser.id;
    dispatch(favoritesActions.getByUserId(usId));
  }
}, []);

useEffect(() => {
  if (favs.length > 0) {
    const moviesArray = favs.map(item => item.movieId.toString());
    setRecMoviesId(moviesArray);
  }
}, [favs]);

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
      const moviesByIds = modifiedResults.filter((movie) => recMoviesId.includes(movie.id));
      const movieTitles = moviesByIds.map((movie) => movie.title);
      console.log(movieTitles);
      setRecMovies(moviesByIds);
      setFavMoviesName(movieTitles);
    }
  });

  

}, [recMoviesId]);

useEffect(() => {
  try {
    fetch("http://127.0.0.1:5000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titles: favMoviesName }), // Используйте "titles" вместо "title" и передайте favMoviesName как массив
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
}, [favMoviesName]);


const Test = () => {
  console.log(recommendations);
  console.log(typeof(recommendations));
}

    return (
      <>
        <Section>
        {favs.length === 0 ? (
            <>
              <EmptyPage/>
            </>
          ) : (
            <>
              <Section>
                <MovieTable movies={recMovies}/>
                <ListForRec movies={recommendations}/>
              </Section>
            </>
          )}

        </Section>
      </>
    );
};

export default Recommendations;