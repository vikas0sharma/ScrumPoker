import React, { useState } from 'react';
import './SprintDetail.css';
import { useHistory, Link } from 'react-router-dom';
import { King } from '../common/King';
import { connect, useDispatch } from 'react-redux';
import { createBoard } from '../../redux/actions';

const SprintDetail = () => {
  const [boardName, setBoardName] = useState('');
  const [id, setUserLink] = useState('');
  const [linkState, setLinkState] = useState(false);
  const dispatcher = useDispatch();
  const onSubmitHandler = async () => {
    const response = await fetch('https://localhost:5001/scrum-poker/boards', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({ name: boardName }), // body data type must match "Content-Type" header
    });

    const id = await response.json();

    dispatcher(
      createBoard({ boardId: id, userId: '', isAdmin: true, point: 0 }),
    );
    setUserLink(id);
    setLinkState(true);
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
              {linkState === true ? (
                <div className="form-group">
                  <label>Please visit and share the url with the team:</label>
                  <br />
                  <Link
                    to={`/users/${id}`}
                  >{`${window.location.href}users/${id}`}</Link>
                </div>
              ) : null}
              <button
                type="submit"
                onClick={() => onSubmitHandler()}
                className="btn btn-default btn-lg float-left"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect()(SprintDetail);
