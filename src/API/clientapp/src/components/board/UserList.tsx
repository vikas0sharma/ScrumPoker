import React, { useState, useEffect } from 'react';
import { User } from './user/User';
import { UserModel } from '../../models/user-model';
import { useParams } from 'react-router-dom';
import {
  HubConnectionBuilder,
  HubConnectionState,
  HubConnection,
} from '@microsoft/signalr';

export const UserList = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const { id } = useParams();
  useEffect(() => {
    if (users.length === 0) {
      getUsers();
    }
    setUpSignalRConnection(id as string).then((con) => {
      //connection = con;
    });
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

  const setUpSignalRConnection = async (boardId: string) => {
    const connection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/scrumboardhub')
      .withAutomaticReconnect()
      .build();

    connection.on('Message', (message: string) => {
      console.log('Message', message);
    });
    connection.on('UsersAdded', (users: UserModel[]) => {
      setUsers(users);
    });

    try {
      await connection.start();
    } catch (err) {
      console.log(err);
    }

    if (connection.state === HubConnectionState.Connected) {
      connection.invoke('SubscribeToBoard', boardId).catch((err: Error) => {
        return console.error(err.toString());
      });
    }

    return connection;
  };
  return (
    <div className="container">
      {users.map((u) => (
        <User key={u.id} data={u}></User>
      ))}
    </div>
  );
};
