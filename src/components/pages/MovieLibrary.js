import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Papa from "papaparse"; // A popular CSV parser library
import MovieCards from "../MovieCards";

const MovieLibrary = () => {
  return (
    <>
      <MovieCards />
    </>
  );
};

export default MovieLibrary;
