import React, { FC, useContext } from 'react';
import './User.css';
import { UserModel } from '../../../models/user-model';
import { adminContext } from '../../../models/context';
import Delete from '../../common/Delete';
import { deleteUser } from '../../../api/scrum-poker-api';
import { useParams } from 'react-router-dom';

export const User: FC<{ user: UserModel }> = ({ user }) => {
  const { isAdmin } = useContext(adminContext);

  const { id } = useParams();

  const onDelete = () => {
    deleteUser(id as string, user.userId as string);
  };

  return (
    <div className="media user-list">
      <div className="media-left align-self-center">
        <img
          className="rounded-circle"
          src={`${process.env.PUBLIC_URL}/images/${
            user.gender == 'F' ? 'f.jpg' : 'm.png'
          }`}
        />
        <h4>{user.name}</h4>
      </div>
      <div className="media-body"></div>
      <div className="media-right align-self-center">
        <div
          className="btn btn-default"
          style={{ background: user.point > 0 ? 'green' : '#6b456a' }}
        >
          {user.showPoint ? user.point : 'Point'}
        </div>
        {isAdmin && !user.isAdmin ? (
          <Delete onDelete={onDelete}></Delete>
        ) : null}
      </div>
    </div>
  );
};
