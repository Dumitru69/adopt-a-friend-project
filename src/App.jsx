import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import Filters from "./components/Filters";
import PetCard from "./components/PetCard";
import React, { useEffect, useState } from "react";

const App = () => {
  const [petsData, setPetsData] = useState([]);

  useEffect(() => {
    fetch("/database.json") // Fetch from the public folder
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setPetsData(data.pets)) // Access the `pets` array in the JSON
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  return (
    <div className="main-content">
      <Header></Header>
      <Filters></Filters>
      <div className="app-card-div max-space-available">
        {petsData.map((pet) => (
          <PetCard
            className="pet-cards"
            key={pet.id} // Use the unique `id` from the JSON as the key
            dogName={pet.dogName}
            gender={pet.gender}
            breed={pet.breed}
            description={pet.description}
            image={pet.image}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
