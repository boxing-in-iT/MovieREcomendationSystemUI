import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { favoritesActions } from '../_store';

const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const CarouselHeader = styled.h2`
  text-align: center;
`;

const CarouselInner = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
  touch-action: pan-y;
`;

const CarouselItem = styled.div`
  flex: 0 0 300px; /* Adjust the width as needed */
  margin: 0 10px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  overflow: hidden;
  border-radius: 4px;
  transition: transform 0.3s ease-in-out;
`;

const CarouselItemImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const CarouselItemDetails = styled.div`
  padding: 10px;
`;

const CarouselItemTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const CarouselItemDescription = styled.p`
  margin: 10px 0 5px;
  font-size: 14px;
  color: #555;
`;

const CarouselItemReleaseDate = styled.p`
  margin: 0;
  font-size: 14px;
  color: #888;
`;

const CarouselItemVoteAverage = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: #888;
`;

const SearchBarContainer = styled.div`
  width: 50%;
  margin: 0 auto;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
`;


const CarouselNavigation = styled.div`
  bottom: 10px;
  left: 50%;
  transform: translateX(50%);
`;

const CarouselNavigationButton = styled.button`
  font-size: 24px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0 5px;
`;

const DeleteButton = styled.button`
  font-size: 16px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: red;
  margin-top: 10px;
`;

const PreviousButton = styled(CarouselNavigationButton)`
  margin-right: auto;
`;

const NextButton = styled(CarouselNavigationButton)`
  margin-left: auto;
`;


const MovieTable = ({ movies }) => {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector(x => x.auth);  
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isClick, setIsClick] = useState(false);

  const goToPrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
  };

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchDistance = touchEndX - touchStartX;

    if (touchDistance > 0) {
      goToPrevious();
    } else if (touchDistance < 0) {
      goToNext();
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setActiveIndex(0); // Сброс активного индекса при каждом поиске
  };

  const handleDelete = (movieId, userId) => {
    // Реализуйте здесь логику удаления фильма по идентификатору (movieId)
    console.log(`Delete movie with ID: ${movieId} and userId: ${userId}`);
    return dispatch(favoritesActions.delete({movieId, userId}));
  };

  const filteredMovies = movies.filter((movie) => {
    // Фильтрация фильмов по значению searchQuery
    const title = movie.title.toLowerCase();
    return title.includes(searchQuery.toLowerCase());
  });

  const Test = () => {
    console.log(movies);
  }

  return (
    <CarouselContainer> 
        <CarouselHeader>Your Favorite Movies</CarouselHeader>
        <SearchBarContainer>
            <SearchBar type="text" placeholder="Search movies..." value={searchQuery} onChange={handleSearch} />
        </SearchBarContainer>
      <CarouselInner
        style={{ transform: `translateX(-${activeIndex * 320}px)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {filteredMovies.map((movie) => (
          <CarouselItem key={movie.id}>
            <CarouselItemDetails>
              <CarouselItemTitle>{movie.title}</CarouselItemTitle>
              <CarouselItemReleaseDate>Release Date: {movie.release_date}</CarouselItemReleaseDate>
              <CarouselItemVoteAverage>Vote Average: {movie.vote_average}</CarouselItemVoteAverage>
              <DeleteButton onClick={() => handleDelete(movie.id, authUser.id)}>Delete</DeleteButton>
            </CarouselItemDetails>
          </CarouselItem>
        ))}
      </CarouselInner>
      <CarouselNavigation>
        <CarouselNavigationButton onClick={goToPrevious}>&#8249;</CarouselNavigationButton>
        <CarouselNavigationButton onClick={goToNext}>&#8250;</CarouselNavigationButton>
      </CarouselNavigation>
    </CarouselContainer>
  );
};

export default MovieTable;