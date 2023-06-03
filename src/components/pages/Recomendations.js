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
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

return (
  <div>
      <h1>Hi {authUser?.name}!</h1>
      <p>You're logged in with React 18 + Redux & JWT!!</p>
      <h3>Users from secure api end point:</h3>
      {users.length &&
          <ul>
              {users.map(user =>
                  <li key={user.id}>{user.name} {user.name}</li>
              )}
          </ul>
      }
      {users.loading && <div className="spinner-border spinner-border-sm"></div>}
      {users.error && <div className="text-danger">Error loading users: {users.error.message}</div>}
  </div>
);
  // if (recMovies == null) {
  //   return (
  //     <>
  //       <Section>
  //         <EmptyPage />
  //       </Section>
  //     </>
  //   );
  // } else {
  //   return <></>;
  // }
};

export default Recommendations;

    

