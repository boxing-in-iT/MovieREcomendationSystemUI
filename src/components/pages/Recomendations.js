import { useState, useEffect } from "react";
import styled from "styled-components";
import EmptyPage from "../EmptyPage";
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from '../../_store';

const Section = styled.div``;

const Recommendations = () => {

  const dispatch = useDispatch();
    const { user: authUser } = useSelector(x => x.auth);
    const { users } = useSelector(x => x.users);
  const [recMovies, setRecMovies] = useState();

  useEffect(() => {
    dispatch(userActions.getAll());
    dispatch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
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

    

