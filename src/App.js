import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/Navigation";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import GlobalStyles from "./components/styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { light, dark } from "./components/styles/Themes";
import Home from "./components/pages/Home";
import ListComponent from "./components/List";
import { useState } from "react";
import Recommendations from "./components/pages/Recomendations";
import MovieLibrary from "./components/pages/MovieLibrary";
import MovieDetail from "./components/pages/MovieDetail";
import AboutProject from "./components/pages/AboutProject";

function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={dark}>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movieLibrary" element={<MovieLibrary />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/about" element={<AboutProject />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
