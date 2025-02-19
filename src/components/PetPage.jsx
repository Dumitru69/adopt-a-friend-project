import { useParams, Link } from "react-router-dom";
import "./css/PetPage.css";
import React, { useEffect, useState } from "react";
import getPetsData from "../utils/getPetsData";
import "./css/shared.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingScreen from "./LoadingScreen";

const PetPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    getPetsData().then((data) => {
      setPet(data.find((p) => p.id === Number(id)));
    });
  }, [id]);

  if (!pet) {
    return <LoadingScreen />;
  }

  return (
    <div className="PetPage max-space-1600">
      <div className="home-btn-div">
        <Link to="/">
          <button className="home-btn btn">
            <i className="bi bi-house-heart-fill"></i> Home
          </button>
        </Link>
      </div>
      <div className="img-text-div">
        <div className="img-div">
          <img
            src={`${process.env.PUBLIC_URL}${pet.image}`}
            alt={pet.petName}
          />
        </div>
        <div className="PetDetails">
          <p>Name : {pet.petName}</p>
          <p>Breed : {pet.breed}</p>
          <p>Gender : {pet.gender}</p>
          <p>Age : {pet.age}</p>
          <Link to={`/adoption-page`}>
            <button className="adopt-btn" disabled={pet.isAdopted}>
              <span>{pet.isAdopted ? "Adopted :D" : "Adopt Me!"}</span>
            </button>
          </Link>
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
