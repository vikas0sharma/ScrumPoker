import React, { useState } from 'react';
import './SprintDetail.css';
import { useHistory, Link } from 'react-router-dom';
import { King } from '../common/King';
import { createBoard } from '../../api/scrum-poker-api';
import { Copy } from '../common/Copy';
import CopyText from '../common/CopyText';

export const SprintDetail = (props: {
  setAdminHandler: (isAdmin: boolean) => void;
}) => {
  const [boardName, setBoardName] = useState('');
  const [id, setUserLink] = useState('');
  const [isLoading, setLoadingState] = useState(false);
  const [linkCreated, setLinkState] = useState(false);
  const [href, setHref] = useState('');

  const onSubmitHandler = async () => {
    setLoadingState(true);
    const id = await createBoard({
      name: boardName,
      description: '',
    });
    setLoadingState(false);
    setLinkState(true);
    setUserLink(id);
    setHref(`${window.location.href}boards/${id}`);

    props.setAdminHandler(true);
  };
  const onCopyClick = () => {
    CopyText(href);
  };

  return (
    <div className="container container-card">
      <div className="card mb-3">
        <div className="row no-gutters">
          <King></King>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Create your poker board</h5>
              <div className="form-group">
                <label className="float-left">Sprint Name</label>
                <input
                  type="input"
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
                  className="form-control form-control-lg rounded-0"
                />
              </div>
              <div className="form-group">
                <label className="float-left">Description</label>
                <input
                  type="text"
                  className="form-control form-control-lg rounded-0"
                />
              </div>
              {linkCreated === true ? (
                <div className="form-group">
                  <label>Please visit and share the url with the team:</label>
                  <Copy onClickHandler={onCopyClick}></Copy>
                  <br />
                  <Link to={`/boards/${id}`}>{href}</Link>
                </div>
              ) : null}
              <button
                type="submit"
                onClick={() => onSubmitHandler()}
                className={`btn btn-default btn-lg float-left ${
                  isLoading ? 'disabled' : ''
                }`}
              >
                {isLoading === true ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm mr-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span>Creating ...</span>
                  </>
                ) : (
                  <span>Create</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
