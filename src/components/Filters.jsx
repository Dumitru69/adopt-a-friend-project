import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Filters.css";
import "./css/shared.css";

const Filters = ({ filters, setFilters }) => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch("/database.json")
      .then((response) => response.json())
      .then((data) => setPets(data.pets));
  }, []);

  const genders = [...new Set(pets.map((pet) => pet.gender))];
  const petTypes = [...new Set(pets.map((pet) => pet.type))];

  const filteredBreeds = pets
    .filter(
      (pet) => filters.type.length === 0 || filters.type.includes(pet.type)
    )
    .map((pet) => pet.breed);

  const uniqueBreeds = [...new Set(filteredBreeds)];

  const handleCheckboxChange = (category, value) => {
    setFilters((prevFilters) => {
      const updatedCategory = prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value];

      return { ...prevFilters, [category]: updatedCategory };
    });
  };

  const handleAgeChange = (e, type) => {
    const value = e.target.value ? Number(e.target.value) : "";
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  return (
    <div className="filters">
      <div className="checkboxes-div">
        <h4 className="text-center">Filter by:</h4>
        <h6>Age :</h6>
        <div className="age-filters">
          <div className="min-age">
            <input
              type="number"
              min={1}
              className="age-input"
              value={filters.minAge || ""}
              onChange={(e) => handleAgeChange(e, "minAge")}
            />
            <p>Min. age</p>
          </div>
          <div className="max-age">
            <input
              type="number"
              min={1}
              className="age-input"
              value={filters.maxAge || ""}
              onChange={(e) => handleAgeChange(e, "maxAge")}
            />
            <p>Max. age</p>
          </div>
        </div>
        <p>Adopted Status</p>
        <h6>Type of Pet :</h6>
        {petTypes.map((type) => (
          <div key={type} className="checkbox-div">
            <input
              type="checkbox"
              className="checkbox"
              checked={filters.type.includes(type)}
              onChange={() => handleCheckboxChange("type", type)}
            />
            <label className="check-label">{type}</label>
          </div>
        ))}
        <h6>Gender :</h6>
        {genders.map((gender) => (
          <div key={gender} className="checkbox-div">
            <input
              type="checkbox"
              className="checkbox"
              checked={filters.gender.includes(gender)}
              onChange={() => handleCheckboxChange("gender", gender)}
            />
            <label className="check-label">{gender}</label>
          </div>
        ))}

        <h6>Breed :</h6>
        {uniqueBreeds.map((breed) => (
          <div key={breed} className="checkbox-div">
            <input
              type="checkbox"
              className="checkbox"
              checked={filters.breed.includes(breed)}
              onChange={() => handleCheckboxChange("breed", breed)}
            />
            <label className="check-label">{breed}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
