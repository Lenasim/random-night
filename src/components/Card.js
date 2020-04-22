import React from 'react';

function Card(props) {
  return (
    <div className="card" onClick={props.onClick} >
      <div className="card-details">
        <h4 className="card-category">{props.categorie}</h4>
        <h3 className="card-title">{props.name}</h3>
      </div>
      <img className="card-image" src={props.image} alt={props.name} />
    </div>
  )
}

export default Card
