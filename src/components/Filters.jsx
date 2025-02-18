import { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Filters.css";
import "./css/shared.css";
import CheckboxGroup from "./CheckGroup";
import getPetsData from "../utils/getPetsData";
import LoadingScreen from "./LoadingScreen";

const defaultFilters = {
  type: [],
  gender: [],
  breed: [],
  minAge: "",
  maxAge: "",
};

const Filters = ({ filters, setFilters }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getPetsData();
        setPets(data); // Update the pets state here
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const genders = useMemo(
    () => [...new Set(pets.map((pet) => pet.gender))],
    [pets]
  );
  const petTypes = useMemo(
    () => [...new Set(pets.map((pet) => pet.type))],
    [pets]
  );

  const uniqueBreeds = useMemo(() => {
    if (
      !filters.type.length &&
      !filters.gender.length &&
      !filters.minAge &&
      !filters.maxAge
    ) {
      return [...new Set(pets.map((pet) => pet.breed))];
    }

    return [
      ...new Set(
        pets
          .filter(
            (pet) =>
              (filters.type.length === 0 || filters.type.includes(pet.type)) &&
              (filters.gender.length === 0 ||
                filters.gender.includes(pet.gender)) &&
              (filters.minAge === "" || pet.age >= filters.minAge) &&
              (filters.maxAge === "" || pet.age <= filters.maxAge)
          )
          .map((pet) => pet.breed)
      ),
    ];
  }, [pets, filters.type, filters.gender, filters.minAge, filters.maxAge]);

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

    if (type === "minAge" && filters.maxAge && value > filters.maxAge) {
      alert("Minimum age cannot be greater than maximum age.");
      return;
    }

    if (type === "maxAge" && filters.minAge && value < filters.minAge) {
      alert("Maximum age cannot be less than minimum age.");
      return;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="filters">
      <div className="checkboxes-div">
        <button onClick={clearFilters} className="clear-filters-btn">
          Clear Filters
        </button>
        <h4 className="text-center">Filter by:</h4>
        <span className="gap9">
          <h6>Age:</h6>
          <div className="age-filters">
            <div className="min-age">
              <input
                type="number"
                min={1}
                className="age-input"
                value={filters.minAge || ""}
                onChange={(e) => handleAgeChange(e, "minAge")}
              />
              <p className="age-label">Min. age</p>
            </div>
            <div className="max-age">
              <input
                type="number"
                min={1}
                className="age-input"
                value={filters.maxAge || ""}
                onChange={(e) => handleAgeChange(e, "maxAge")}
              />
              <p className="age-label">Max. age</p>
            </div>
          </div>
        </span>
        <span className="gap9">
          <CheckboxGroup
            title="Type of Pet"
            items={petTypes}
            filters={filters}
            category="type"
            onChange={handleCheckboxChange}
          />
          <CheckboxGroup
            title="Gender"
            items={genders}
            filters={filters}
            category="gender"
            onChange={handleCheckboxChange}
          />
        </span>
        <CheckboxGroup
          title="Breed"
          items={uniqueBreeds}
          filters={filters}
          category="breed"
          onChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
};

export default Filters;
