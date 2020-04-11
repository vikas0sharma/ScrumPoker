import React, { useState, useEffect, FC } from 'react';
import { User } from './user/User';
import { UserModel } from '../../models/user-model';
import { useParams } from 'react-router-dom';
import {
  HubConnectionBuilder,
  HubConnectionState,
  HubConnection,
} from '@microsoft/signalr';
import { getBoardUsers, baseURL } from '../../api/scrum-poker-api';

export const UserList: FC = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const { id } = useParams();
  const boardId = id as string;
  useEffect(() => {
    if (users.length === 0) {
      getUsers();
    }
    setUpSignalRConnection(boardId).then((con) => {
      //connection = con;
    });
  }, []);

  const getUsers = async () => {
    const users = await getBoardUsers(boardId);
    setUsers(users);
  };

  const setUpSignalRConnection = async (boardId: string) => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${baseURL}/scrumboardhub`)
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
