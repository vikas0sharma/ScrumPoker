import React, { useState, useEffect, FC } from 'react';
import { User } from './user/User';
import { UserModel } from '../../models/user-model';
import { useParams } from 'react-router-dom';
import {
  HubConnectionBuilder,
  HubConnectionState,
  HttpTransportType,
} from '@microsoft/signalr';
import { getBoardUsers, baseURL } from '../../api/scrum-poker-api';
import { Score } from '../../models/score';
import ScoreChart from './ScoreChart';

export const UserList: FC = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const { id } = useParams();
  const boardId = id as string;
  useEffect(() => {
    if (users.length === 0) {
      getUsers();
    }
    setUpSignalRConnection(boardId).then(() => {
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
  const getSum = () => {
    const result: Score[] = [];
    users.reduce((res, value) => {
      // @ts-ignore
      if (!res[value.point]) {
        // @ts-ignore
        res[value.point] = { point: value.point + ' point', sum: 0 };
        // @ts-ignore
        result.push(res[value.point]);
      }
      // @ts-ignore
      res[value.point].sum += 1;
      return res;
    }, {});
    return result;
  };

  return (
    <div className="container">
      {users.some((u) => u.showPoint) ? (
        // <ScoreList data={getSum()}></ScoreList>
        <ScoreChart scores={getSum()}></ScoreChart>
      ) : null}
      {users.map((u) => (
        <User key={u.userId} user={u}></User>
      ))}
    </div>
  );
};
