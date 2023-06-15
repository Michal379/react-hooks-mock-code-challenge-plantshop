import React, { useState, useEffect } from "react";
import PlantCard from "./PlantCard";
import NewPlantForm from "./NewPlantForm";

function PlantList({ plants }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </ul>
  );
}

function PlantPage() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((responseData) => setPlants(responseData))
      .catch((error) => console.log(error));
  }, []);

  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((createdPlant) => {
        setPlants((prevPlants) => [...prevPlants, createdPlant]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <PlantList plants={plants} />
    </main>
  );
}

export default PlantPage;
