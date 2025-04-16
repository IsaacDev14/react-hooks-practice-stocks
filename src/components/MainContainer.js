import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortType, setSortType] = useState(null);
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((response) => response.json())
      .then((data) => setStocks(data));
  }, []);

  const buyStock = (stock) => {
    setPortfolio([...portfolio, stock]);
  };

  const sellStock = (stock) => {
    setPortfolio(portfolio.filter((item) => item.id !== stock.id));
  };

  const sortStocks = (stocks) => {
    if (sortType === "Alphabetically") {
      return [...stocks].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "Price") {
      return [...stocks].sort((a, b) => a.price - b.price);
    }
    return stocks;
  };

  const filterStocks = (stocks) => {
    if (!filterType) return stocks;
    return stocks.filter((stock) => stock.type === filterType);
  };

  const filteredAndSortedStocks = sortStocks(filterStocks(stocks));

  return (
    <div>
      <SearchBar
        setSortType={setSortType}
        setFilterType={setFilterType}
        sortType={sortType}
        filterType={filterType}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredAndSortedStocks} buyStock={buyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} sellStock={sellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
