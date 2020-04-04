import React, { FC, useState } from 'react';
import './User.css';
import { UserModel } from '../../../models/user-model';

export const User: FC<{ data: UserModel; hiddenState: boolean }> = ({
  data,
  hiddenState,
}) => {
  debugger;
  return (
    <div className="media user-list">
      <div className="media-left align-self-center">
        <img
          className="rounded-circle"
          src={`${process.env.PUBLIC_URL}/images/${
            data.gender == 'F' ? 'f.jpg' : 'm.png'
          }`}
        />
        <h4>{data.name}</h4>
      </div>
      <div className="media-body"></div>
      <div className="media-right align-self-center">
        <a
          href="#"
          className="btn btn-default"
          style={{ background: data.point > 0 ? 'green' : '#6b456a' }}
        >
          {hiddenState ? 'Point' : data.point}
        </a>
      </div>
    </div>
  );
};
