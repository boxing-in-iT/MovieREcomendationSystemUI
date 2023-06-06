import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Papa from "papaparse"; // A popular CSV parser library
import dataSet from "../assets/data/tmdb_5000_movies.csv";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const SearchTitle = styled.h1`
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const SearchInput = styled.input`
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  padding: 0.5rem;
  width: 100%;
  max-width: 400px;
  margin-right: 1rem;
`;

const SearchButton = styled.button`
  background-color: #0074d9;
  color: white;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0063a0;
  }
`;

const GenreButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SortByGenres = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const Button = styled.button`
  margin-right: 10px;
  padding: 10px 15px;
  background-color: ${(props) =>
    props.isActive ? props.theme.body : props.theme.text};
  color: ${(props) => (props.isActive ? props.theme.text : props.theme.body)};
  border: none;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const SortTitle = styled.h1`
  color:${(props) => props.theme.body};
`;

const GenreButtons = styled.div`
  margin-bottom: 20px;
`;

const MovieCard = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: calc(25% - 20px);
  height: 250px;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 5px #ccc;
  transition: all 0.3s ease-in-out;

  background-color: ${(props) => props.theme.text};
  color: ${(props) => props.theme.body};

  &:hover {
    transform: scale(1.05);
    box-shadow: 5px 5px 10px #ccc;
    cursor: pointer;
  }
`;

const MovieInfo = styled.div`
  padding: 10px;
  max-height: 200px;
  overflow: auto;
`;

const MovieTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const MovieDirector = styled.p`
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const MovieYear = styled.p`
  font-size: 0.9rem;
`;

const MovieCards = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "Thriller",
    "War",
    "Western",
  ];

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredMovies = movies.filter((movie) => {
    const genres = JSON.parse(movie.genres).map((genre) => genre.name);
    const isInSelectedGenre = !selectedGenre || genres.includes(selectedGenre);
    const isInSearchQuery =
      searchQuery === "" ||
      movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    return isInSelectedGenre && isInSearchQuery;
  });

  useEffect(() => {
    // Load CSV file and parse it to an array of objects using Papa.parse()
    Papa.parse(dataSet, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: (results) => {
        const modifiedResults = results.data.map((row) => {
          // const modifiedGenres = row.genres.replace(/'id'/g, '"id"');
          const modifiedGenres = row.genres.replace(/'/g, '"');
          return {
            ...row,
            genres: modifiedGenres,
          };
        });
        setMovies(modifiedResults.slice(0, 200)); // get first 5 rows only
        // setMovies(modifiedResults);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const Test = () => {
    console.log(movies);
  };

  return (
    <Section>
    
      <input
      type="text"
      placeholder="Search movie"
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />
      <GenreButtons>
      <SortTitle>Sort by genre</SortTitle>
        {genres.map((genre) => (
          <Button
            key={genre}
            onClick={() => handleGenreClick(genre)}
            isActive={selectedGenre === genre}
          >
            {genre}
          </Button>
        ))}
        <Button onClick={() => setSelectedGenre(null)}>Clear</Button>
      </GenreButtons>
      {filteredMovies.slice(0, 200).map((movie, index) => (
        <MovieCard key={index}>
          <MovieInfo>
            <MovieTitle>{movie.title}</MovieTitle>
            <MovieDirector>
              Genres:{" "}
              {JSON.parse(movie.genres)
                .map((genre) => genre.name)
                .join(", ")}
            </MovieDirector>
            <MovieDirector>Released: {movie.release_date}</MovieDirector>
            <MovieDirector>Director: {movie.overview}</MovieDirector>
            {/* Use Link component to navigate to movie details page with movie id */}
            <Link to={`/movies/${movie.id}`}>Details</Link>
          </MovieInfo>
        </MovieCard>
      ))}
      <button onClick={Test()}>Click</button>
    </Section>
  );
};

const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  min-height: 100vh;
  width: 100%;
  padding-top: 2%;

  background-color: ${(props) => props.theme.text};
`;

export default MovieCards;
