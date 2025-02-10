import { useParams, Link } from "react-router-dom";
import "./css/PetPage.css";
import React, { useEffect, useState } from "react";
import getPetsData from "../utils/getPetsData";

const PetPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [isAdopted, setIsAdopted] = useState(true);

  useEffect(() => {
    getPetsData().then((data) => {
      setPet(data.find((p) => p.id === Number(id)));
    });
  }, [id]);

  if (!pet) {
    return <p>Loading pet data...</p>;
  }

  return (
    <div className="PetPage max-space-1600">
      <div className="home-btn-div">
        <Link to="/">
          <button className="home-btn btn">
            <i class="bi bi-house-heart-fill"></i> Home
          </button>
        </Link>
      </div>
      <div className="img-text-div">
        <div className="img-div">
          <img src={pet.image} />
        </div>
        <div className="PetDetails">
          <p>Name : {pet.dogName}</p>
          <p>Breed : {pet.breed}</p>
          <p>Gender : {pet.gender}</p>
          <p>Age : {pet.age}</p>
          <button
            className={`adopt-btn box ${
              pet.isAdopted ? "bg-color-green" : "bg-color-orange"
            }`}
          >
            {pet.isAdopted ? "ADOPTED :D" : "NOT ADOPTED :C"}
          </button>
        </div>
      </div>
      <div className="desc-div">
        <h3>Description</h3>
        <p className="description">{pet.description}</p>
      </div>
    </div>
  );
};

export default PetPage;
