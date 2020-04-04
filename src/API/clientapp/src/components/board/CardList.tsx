import React from 'react';
import Card from './card/Card';
import { useParams } from 'react-router-dom';
import { updateUserPoint } from '../../api/scrum-poker-api';
import { UserModel } from '../../models/user-model';

const CardList = () => {
  const cards = [
    {
      path: '1.png',
      name: 'One',
      val: 1,
    },
    {
      path: '2.png',
      name: 'Two',
      val: 2,
    },
    {
      path: '3.png',
      name: 'Three',
      val: 3,
    },
    {
      path: '5.png',
      name: 'Five',
      val: 5,
    },
    {
      path: '8.png',
      name: 'Eight',
      val: 8,
    },
  ];
  const { id, userId } = useParams();
  const onCardClickHandler = (val: number) => {
    const user = new UserModel();
    user.id = userId;
    user.point = val;

    const result = updateUserPoint(id as string, user);
  };
  return (
    <div className="card-group">
      {cards.map((c) => (
        <Card key={c.name} {...c} cardClick={onCardClickHandler}></Card>
      ))}
    </div>
  );
};

export default CardList;
