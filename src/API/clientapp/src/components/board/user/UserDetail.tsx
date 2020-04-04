import React, { FC, useState } from 'react';
import { UserModel } from '../../../models/user-model';

export const UserDetail: FC<{
  name: string;
  isAdmin: boolean;
  onShowClick: (state: boolean) => void;
  onClearClick: () => void;
}> = (user) => {
  const [isHidden, setHidden] = useState(true);

  const onShowClick = () => {
    setHidden(!isHidden);
    user.onShowClick(!isHidden);
  };
  const onClearClick = () => {
    user.onClearClick();
    onShowClick();
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
      </div>
    </div>
  );
};
