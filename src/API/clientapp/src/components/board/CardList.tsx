import React from 'react';
import Card from './card/Card';

const CardList = () => {
  const cards = [
    {
      path: '1.png',
      name: 'One',
    },
    {
      path: '2.png',
      name: 'Two',
    },
    {
      path: '3.png',
      name: 'Three',
    },
    {
      path: '5.png',
      name: 'Five',
    },
    {
      path: '8.png',
      name: 'Eight',
    },
  ];
  return (
    <div className="card-group">
      {cards.map((c) => (
        <Card key={c.name} path={c.path} name={c.name}></Card>
      ))}
    </div>
  );
};

export default CardList;
