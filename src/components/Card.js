import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {

  const dateObj = new Date(props.date);
  const formattedTime = props.date ? `${dateObj.getHours().toString().padStart(2, 0)}:${dateObj.getMinutes().toString().padStart(2, 0)}` : null;

  return (
    <div style={{ width: '15%', margin: '5px'}}>
      <Link to={`/pokemon/${props.id}`}>
          <h2>{props.name}</h2>
          {
            props.catched
              ? <span>{formattedTime}</span>
              : <button type="button" onClick={props.onCatchPokemon}>Catch</button>
          }
          <img
            src={`https://raw.githubusercontent.com/epam-js-may-2018/homework-7-js/master/pokemons/${props.id}.png`}
            style={{ width: '100%' }}
          />
      </Link>
    </div>
  );
}

export default Card;
