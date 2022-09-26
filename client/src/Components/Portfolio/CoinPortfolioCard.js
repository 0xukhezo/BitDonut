import React from "react";
import { Link } from "react-router-dom";
import "./CoinPortfolioCard.css";

function CoinPortfolioCard({ portfolioCoin, currentCoin }) {
  return (
    <Link id="display-info" to={`/${currentCoin[0].id}`}>
      <span>
        {portfolioCoin.coins} {portfolioCoin.symbol.toUpperCase()}
      </span>
    </Link>
  );
}

export default CoinPortfolioCard;
