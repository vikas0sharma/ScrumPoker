import React, { FC } from 'react';
import { Score } from '../../models/score';

export const ScoreList: FC<{ data: Score[] }> = ({ data }) => {
  return (
    <ul className="list-group mt-5">
      {data.map((s) => (
        <li
          key={s.point}
          className="text-info list-group-item d-flex justify-content-between align-items-center"
        >
          Total Votes {s.point}
          <span className="badge badge-primary badge-pill">{s.sum}</span>
        </li>
      ))}
    </ul>
  );
};
