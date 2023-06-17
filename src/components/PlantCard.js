import React from "react";

function PlantCard({ plant, onSoldOut }) {
  const handleSoldOut = () => {
    onSoldOut(plant.id);
  };

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {plant.inStock ? (
        <button className="primary" onClick={handleSoldOut}>
          In Stock
        </button>
      ) : (
        <button disabled>Sold Out</button>
      )}
    </li>
  );
}

export default PlantCard;
