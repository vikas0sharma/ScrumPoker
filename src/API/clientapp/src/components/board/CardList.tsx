import React from 'react';
import Card from './card/Card';
import { useSelector } from 'react-redux';
import { BoardState } from '../../redux/actions';

const CardList = () => {
  const cards = [
    {
      path: '1.png',
      val: 1,
      name: 'One',
    },
    {
      path: '2.png',
      val: 2,
      name: 'Two',
    },
    {
      path: '3.png',
      val: 3,
      name: 'Three',
    },
    {
      path: '5.png',
      val: 5,
      name: 'Five',
    },
    {
      path: '8.png',
      val: 8,
      name: 'Eight',
    },
  ];
  const s = useSelector((state) => state) as BoardState;

  return (
    <div className="card-group">
      {cards.map((c) => (
        <Card key={c.name} {...c}></Card>
      ))}
    </div>
  );
};

export default CardList;
