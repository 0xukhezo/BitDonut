import React from "react";
import { Link } from "react-router-dom";
import "./CoinCard.css";

function CoinCard({ coin, bitcoin }) {
  return (
    <Link to={`/${coin.id}`}>
      <ul id="coin-info">
        <li>
          <img src={coin.image} />
          <span>{coin.name}</span>
        </li>
        <li>{coin.current_price.toFixed(2)} $</li>
        <li>{coin.high_24h.toFixed(2)} $</li>
        <li>{coin.low_24h.toFixed(2)} $</li>
        <li
          style={{
            color: coin.price_change_percentage_24h < 0 ? "#dc2626" : "#22c55e",
          }}
        >
          {coin.price_change_24h.toFixed(2)}
          {coin.price_change_percentage_24h > 0 ? " ↑" : " ↓"}
        </li>
        <li
          style={{
            color: coin.price_change_percentage_24h < 0 ? "#dc2626" : "#22c55e",
          }}
        >
          {coin.price_change_percentage_24h > 0 && " +"}
          {coin.price_change_percentage_24h.toFixed(2)}%
        </li>

        <li>
          {(coin.current_price / bitcoin.current_price).toFixed(6)}{" "}
          {bitcoin.symbol.toUpperCase()}
        </li>
      </ul>
    </Link>
  );
}

export default CoinCard;
