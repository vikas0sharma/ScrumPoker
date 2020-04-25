import React, { FC } from 'react';
import { Score } from '../../models/score';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
} from 'recharts';

const ScoreChart: FC<{ scores: Score[] }> = (props) => {
  const rndColor = () => '#' + ((Math.random() * 0xffffff) << 0).toString(16);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={props.scores} margin={{ top: 90, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="point"></XAxis>
        <YAxis />
        <Tooltip />
        <Bar
          maxBarSize={20}
          dataKey="sum"
          fill="#8884d8"
          label={{ position: 'top' }}
        >
          {props.scores.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={rndColor()} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ScoreChart;
