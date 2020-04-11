import React from 'react';
import CardList from './CardList';
import { UserList } from './UserList';
import { UserDetail } from './user/UserDetail';

export const Board = () => {
  return (
    <>
      <UserDetail></UserDetail>
      <CardList></CardList>
      <UserList></UserList>
    </>
  );
};
