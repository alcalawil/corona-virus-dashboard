import React from "react";

const Card = ({ name, count, type }) => {
  console.log("card", count, name);
  const cardTypeStyle = `card-counter ${type}`;
  return (
    <div className="col-md-3">
      <div className={cardTypeStyle}>
        <i className="fa fa-code-fork"></i>
        <span className="count-name">{name}</span>
        <span className="count-numbers">{count}</span>
      </div>
    </div>
  );
};

export default Card;
