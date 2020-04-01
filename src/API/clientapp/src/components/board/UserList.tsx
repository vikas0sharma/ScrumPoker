import React, { useState, useEffect } from 'react';
import { User } from './user/User';
import { UserModel } from '../../models/user-model';
import { useParams } from 'react-router-dom';

export const UserList = () => {
  let emptyUsers: UserModel[] = [];
  const [users, setUsers] = useState(emptyUsers);
  const { id } = useParams();
  useEffect(() => {
    if (users.length === 0) {
      getUsers();
    }
  }, []);

  const getUsers = async () => {
    const response = await fetch(
      `https://localhost:5001/scrum-poker/users/${id}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
      },
    );
    const users: UserModel[] = await response.json();
    setUsers(users);
  };
  return (
    <div className="container">
      {users.map((u) => (
        <User key={u.id} data={u}></User>
      ))}
    </div>
  );
};
