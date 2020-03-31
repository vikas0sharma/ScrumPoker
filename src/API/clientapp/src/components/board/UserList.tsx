import React from 'react';
import { User } from './user/User';

export const UserList = () => {
  const users = [
    {
      name: 'vik',
      id: 11,
      gender: 'M',
    },
    {
      name: 'abc',
      id: 12,
      gender: 'F',
    },
  ];
  return (
    <div className="container">
      {users.map((u) => (
        <User key={u.id} data={u}></User>
      ))}
    </div>
  );
};
