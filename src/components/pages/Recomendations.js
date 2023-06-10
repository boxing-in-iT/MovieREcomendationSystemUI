import { useState, useEffect } from "react";
import styled from "styled-components";
import EmptyPage from "../EmptyPage";
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from '../../_store';

const Section = styled.div``;

const Recommendations = () => {
  const [recMovies, setRecMovies] = useState();

  if (recMovies == null) {
    return (
      <>
        <Section>
          <EmptyPage />
        </Section>
      </>
    );
  } else {
    return <></>;
  }
};

export default Recommendations;

    

