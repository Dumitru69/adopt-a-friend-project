import "./App.css";
import Header from "./components/header";
import Filters from "./components/Filters";
import PetCard from "./components/PetCard";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PetPage from "./components/PetPage";
import Footer from "./components/Footer";
import AdoptionPage from "./components/AdoptionPage";
import getPetsData from "./utils/getPetsData";

const defaultFilters = {
  breed: [],
  type: [],
  gender: [],
  minAge: "",
  maxAge: "",
};

const App = () => {
  const [filters, setFilters] = useState(() => {
    const storedFilters = localStorage.getItem("filters");
    return storedFilters ? JSON.parse(storedFilters) : defaultFilters;
  });

  const [petsData, setPetsData] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    getPetsData().then((data) => setPetsData(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  const filteredPets = petsData.filter((pet) => {
    const minAge = filters.minAge || 0;
    const maxAge = filters.maxAge || Infinity;
    return (
      (filters.breed.length === 0 || filters.breed.includes(pet.breed)) &&
      (filters.type.length === 0 || filters.type.includes(pet.type)) &&
      (filters.gender.length === 0 || filters.gender.includes(pet.gender)) &&
      pet.age >= minAge &&
      pet.age <= maxAge
    );
  });

  return (
    <div className="main-content">
      <Router>
        <Header
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
        />
        <Routes>
          <Route
            path="/"
            element={
              <div className="filt-cards-div max-space-1700">
                <Filters filters={filters} setFilters={setFilters} />
                <div className="app-card-div">
                  {filteredPets.map((pet) => (
                    <PetCard
                      className="pet-cards"
                      pet={pet}
                      key={pet.id}
                      petName={pet.petName}
                      gender={pet.gender}
                      breed={pet.breed}
                      image={pet.image}
                    />
                  ))}
                </div>
              </div>
            }
          />
          <Route path="/pets/:id" element={<PetPage />} />
          <Route path="/adoption-page" element={<AdoptionPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
