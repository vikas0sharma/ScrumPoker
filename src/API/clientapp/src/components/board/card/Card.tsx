import React, { FC, useState } from 'react';
import './Card.css';
import { useSelector, useDispatch } from 'react-redux';
import { BoardState, createBoard } from '../../../redux/actions';

const Card: FC<{
  path: string;
  name: string;
  val: number;
}> = (props) => {
  const s = useSelector((state) => state) as BoardState;
  const dispatcher = useDispatch();
  const [isToggled, setToggle] = useState(false);

  const updateUserPoint = async () => {
    const response = await fetch(
      `https://localhost:5001/scrum-poker/users/${s.boardId}`,
      {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: s.userId,
          point: props.val,
        }),
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
      },
    );
    await response.json();
  };
  const onClickHandler = () => {
    setToggle(!isToggled);
    dispatcher(
      createBoard({
        boardId: s.boardId,
        userId: s.userId,
        isAdmin: s.isAdmin,
        point: props.val,
      }),
    );
    updateUserPoint();
  };

  return (
    <div
      className={'card img-card ' + (isToggled ? 'img-card-fliped' : '')}
      onClick={onClickHandler}
    >
      <div className="card-img-top">
        <img
          src={`${process.env.PUBLIC_URL}/images/${props.path}`}
          className="mx-auto img-fluid i-card"
          alt={props.name + ' Point'}
        ></img>
      </div>
    </div>
  );
};

export default Card;
