import "./App.css";
import Header from "./components/header";
import Filters from "./components/Filters";
import PetCard from "./components/PetCard";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PetPage from "./components/PetPage";
import Footer from "./components/Footer";

import getPetsData from "./utils/getPetsData";

const App = () => {
  const [petsData, setPetsData] = useState([]);
  const [filters, setFilters] = useState({
    breed: [],
    type: [],
    gender: [],
    age: "",
  });

  useEffect(() => {
    getPetsData().then((data) => setPetsData(data));
  }, []);

  const filteredPets = petsData.filter((pet) => {
    const minAge = filters.minAge || 0; // Default to 0 if empty
    const maxAge = filters.maxAge || Infinity; // Default to Infinity if empty

    return (
      (filters.breed.length === 0 || filters.breed.includes(pet.breed)) &&
      (filters.type.length === 0 || filters.type.includes(pet.type)) &&
      (filters.gender.length === 0 || filters.gender.includes(pet.gender)) &&
      pet.age >= minAge &&
      pet.age <= maxAge // Filter within range
    );
  });

  return (
    <div className="main-content">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div className="filt-cards-div max-space-1700">
                {/* Pass filters and setFilters to Filters */}
                <Filters filters={filters} setFilters={setFilters} />
                <div className="app-card-div">
                  {filteredPets.map((pet) => (
                    <PetCard
                      className="pet-cards"
                      pet={pet}
                      key={pet.id}
                      dogName={pet.dogName}
                      gender={pet.gender}
                      breed={pet.breed}
                      image={pet.image}
                    />
                  ))}
                </div>
              </div>
            }
          ></Route>
          <Route path="/pets/:id" element={<PetPage />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
