import React from "react";
import "./css/PetCard.css";
import "./css/shared.css";

function PetCard({ image, dogName, breed, gender, description }) {
  return (
    <div className="pet-card-div">
      <img className="petImage" src={image} />
      <div className="pet-text-div">
        <h1>{dogName}</h1>
        <p>{breed}</p>
        <p>{gender}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default PetCard;
