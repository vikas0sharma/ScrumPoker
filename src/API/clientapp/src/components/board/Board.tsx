import React, { useEffect, useState } from 'react';
import CardList from './CardList';
import { UserList } from './UserList';
import { useParams } from 'react-router-dom';
import { UserDetail } from './user/UserDetail';
import { getUser, clearUsersPoint } from '../../api/scrum-poker-api';
import { UserModel } from '../../models/user-model';

export const Board = () => {
  const { id, userId } = useParams();
  const [user, setUser] = useState<UserModel | null>(null);
  const [hiddenState, setHiddenState] = useState(true);

  const togglePointHandler = (state: boolean) => setHiddenState(state);

  useEffect(() => {
    if (!user) {
      getUserFromApi();
    }
  }, []);
  console.log(id, userId);
  const getUserFromApi = async () => {
    const user = await getUser(id as string, userId as string);
    setUser(user);
  };
  const onClearPointHandler = () => {
    clearUsersPoint(id as string);
  };
  return (
    <>
      <UserDetail
        name={user?.name as string}
        isAdmin={user?.isAdmin as boolean}
        onShowClick={togglePointHandler}
        onClearClick={onClearPointHandler}
      ></UserDetail>
      <CardList></CardList>
      <UserList state={hiddenState as boolean}></UserList>
    </>
  );
};
