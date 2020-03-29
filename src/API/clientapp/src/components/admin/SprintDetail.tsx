import React from 'react';
import './SprintDetail.css';

export const SprintDetail = () => {
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
                  type="text"
                  className="form-control form-control-lg rounded-0"
                  name="uname1"
                  id="uname1"
                />
              </div>
              <div className="form-group">
                <label className="float-left">Admin Name</label>
                <input
                  type="password"
                  className="form-control form-control-lg rounded-0"
                  id="pwd1"
                />
              </div>

              <button
                type="submit"
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
