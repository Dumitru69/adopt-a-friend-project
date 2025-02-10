import React from "react";
import "./css/PetCard.css";
import "./css/PetPage.css";
import "./css/shared.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function PetCard({ pet }) {
  if (!pet) {
    return null; // Prevent errors if `pet` is undefined
  }

  return (
    <div className="pet-card-div">
      <img className="petImage" src={pet.image} alt={pet.dogName} />
      <div className="pet-text-div">
        <h1 className="dogName">{pet.dogName}</h1>
        <p>{pet.breed}</p>
        <p>{pet.gender}</p>
        <div
          className={`adopt-badge box ${
            pet.isAdopted ? "bg-color-green" : "bg-color-orange"
          }`}
        >
          <p>{pet.isAdopted ? "ADOPTED :D" : "NOT ADOPTED :C"}</p>
        </div>

        <Link to={`/pets/${pet.id}`}>
          <button className="details-btn">More Details</button>
        </Link>
      </div>
    </div>
  );
}

export default PetCard;
