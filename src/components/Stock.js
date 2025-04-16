import React from "react";

function Stock({ stock, buyStock }) {
  const handleBuyClick = () => {
    buyStock(stock);
  };

  return (
    <div>
      <div className="card" onClick={handleBuyClick}>
        <div className="card-body">
          <h5 className="card-title">{stock.name}</h5>
          <p className="card-text">${stock.price}</p>
        </div>
      </div>
    </div>
  );
}

export default Stock;
