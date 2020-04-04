import React from 'react';
import CardList from './CardList';
import { UserList } from './UserList';
import { useSelector } from 'react-redux';

export const Board = () => {
  const s = useSelector((state) => state);
  console.log(s);
  return (
    <>
      <CardList></CardList>
      <UserList></UserList>
    </>
  );
};
