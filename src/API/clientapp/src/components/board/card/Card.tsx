import React, { FC, useState } from 'react';
import './Card.css';

const Card: FC<{
  path: string;
  name: string;
  val: number;
  cardClick: (val: number) => void;
}> = (props) => {
  const [isToggled, setToggle] = useState(false);

  const onClickHandler = () => {
    setToggle(!isToggled);
    console.log(isToggled);
    props.cardClick(props.val);
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
