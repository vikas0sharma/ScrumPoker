import React, { useState } from 'react';
import './SprintDetail.css';
import { useHistory } from 'react-router-dom';

export const SprintDetail = () => {
  const [boardName, setBoardName] = useState('');
  const history = useHistory();
  let id: string = '';

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

    id = await response.json();
    history.push(`/board/${id}`);
  };
  return (
    <div className="container container-card">
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              src={`${process.env.PUBLIC_URL}/images/k.png`}
              className="card-img img-king"
            />
          </div>
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
                <label className="float-left">Admin Name</label>
                <input
                  type="input"
                  className="form-control form-control-lg rounded-0"
                />
              </div>

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
