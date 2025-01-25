import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import Main from "./components/main";
import PetCard from "./components/PetCard";
import React, { useEffect, useState } from "react";

// function App() {
//   return (
//     <div>
//       <Header></Header>
//       <Main></Main>
//     </div>
//   );
// }

// export default App;

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
    <div>
      <Header></Header>
      <Main></Main>
      {petsData.map((pet) => (
        <PetCard
          key={pet.id} // Use the unique `id` from the JSON as the key
          dogName={pet.dogName}
          breed={pet.breed}
          description={pet.description}
          image={pet.image}
        />
      ))}
    </div>
  );
};

export default App;
