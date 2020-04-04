import React, { useState } from 'react';
import { King } from '../../common/King';
import { useParams, useHistory } from 'react-router-dom';
import { createBoard } from '../../../redux/actions';
import { useDispatch } from 'react-redux';

export const CreateUser = () => {
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('M');
  const history = useHistory();
  const { id } = useParams();
  const dispatcher = useDispatch();
  const onSubmitHandler = async () => {
    const response = await fetch(
      `https://localhost:5001/scrum-poker/users/${id}`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({
          name: userName,
          gender: gender,
        }), // body data type must match "Content-Type" header
      },
    );
    const userId = await response.json();
    dispatcher(
      createBoard({ boardId: id as string, userId, point: 0, isAdmin: false }),
    );
    if (userId) history.push(`/boards/${id}`);
  };

  return (
    <div className="container container-card">
      <div className="card mb-3">
        <div className="row no-gutters">
          <King></King>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Create your profile for the board</h5>
              <div className="form-group">
                <label className="float-left">Name</label>
                <input
                  type="input"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="form-control form-control-lg rounded-0"
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text">Gender</label>
                </div>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="custom-select"
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  onClick={onSubmitHandler}
                  className="btn btn-default btn-lg float-left"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
