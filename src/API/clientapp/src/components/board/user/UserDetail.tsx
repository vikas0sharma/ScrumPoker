import React, { FC, useState, useEffect } from 'react';
import { UserModel } from '../../../models/user-model';
import { useParams } from 'react-router-dom';
import {
  togglePointVisibility,
  getUser,
  clearUsersPoint,
} from '../../../api/scrum-poker-api';
import { Share } from '../../common/Share';
import CopyText from '../../common/CopyText';

export const UserDetail: FC = () => {
  const initUserState = new UserModel();
  const { id, userId } = useParams<{ id: string; userId: string }>();
  const [user, setUser] = useState<UserModel>(initUserState);
  const [isHidden, setHidden] = useState(false);

  const togglePointHandler = (state: boolean) => {
    togglePointVisibility(id, state);
  };
  useEffect(() => {
    if (!user.id) {
      getUserFromApi();
    }
  }, []);

  const getUserFromApi = async () => {
    const user = await getUser(id, userId);
    setUser(user);
    setHidden(!user.showPoint);
  };
  const onClearPointHandler = () => {
    clearUsersPoint(id);
  };

  const onShowClick = () => {
    setHidden(!isHidden);
    togglePointHandler(isHidden);
  };
  const onClearClick = () => {
    onClearPointHandler();
  };
  const shareHandler = () => {
    let href = window.location.href;
    href = href.substring(0, href.indexOf('users'));
    CopyText(href);
  };

  return (
    <div className="card border-primary">
      <div className="card-header">
        <div className="float-left">
          <b>{user.name}</b>
        </div>
        {user.isAdmin ? (
          <div className="float-right">
            <button
              onClick={onShowClick}
              type="button"
              className="btn btn-outline-secondary mr-3"
            >
              {isHidden ? 'Show' : 'Hide'}
            </button>
            <button
              onClick={onClearClick}
              type="button"
              className="btn btn-outline-secondary"
            >
              Clear
            </button>
          </div>
        ) : null}
        <button
          onClick={shareHandler}
          type="button"
          className="btn btn-outline-secondary mr-3 float-right"
        >
          Copy board link <Share></Share>
        </button>
      </div>
    </div>
  );
};
