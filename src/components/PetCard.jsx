import React from "react";
import "./css/PetCard.css";

function PetCard({ image, dogName, breed, description }) {
  return (
    <div className="pet-card-div">
      <img className="petImage" src={image} />
      <h1>{dogName}</h1>
      <p>{breed}</p>
      <p>{description}</p>
    </div>
  );
}

export default PetCard;
