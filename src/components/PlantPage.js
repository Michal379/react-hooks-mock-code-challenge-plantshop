import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((responseData) => {
        setPlants(responseData);
        setFilteredPlants(responseData);
      })
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
        setFilteredPlants((prevPlants) => [...prevPlants, createdPlant]);
      })
      .catch((error) => console.log(error));
  };

  const handleSoldOut = (plantId) => {
    const updatedPlants = plants.map((plant) => {
      if (plant.id === plantId) {
        return { ...plant, inStock: false };
      }
      return plant;
    });
    setPlants(updatedPlants);
    setFilteredPlants(updatedPlants);
  };

  const handleSearch = (searchTerm) => {
    const filtered = plants.filter((plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlants(filtered);
  };

  return (
    <main>
      <Search onSearch={handleSearch} />
      <NewPlantForm onAddPlant={handleAddPlant} />
      <PlantList plants={filteredPlants} onSoldOut={handleSoldOut} />
    </main>
  );
}

export default PlantPage;
