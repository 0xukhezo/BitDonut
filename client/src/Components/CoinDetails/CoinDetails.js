import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import NavBar from "../Layout/NavBar";
import Logging from "../Logging/Logging";
import LineChart from "./LineChart";

import "./CoinDetails.css";

function CoinDetails({ coins }) {
  let { id } = useParams();
  let [dataCoin, setDataCoin] = useState([]);
  let [dataCloseOpen, setDataCloseOpen] = useState([]);
  let [isLoadding, setIsLoadding] = useState(true);
  let [databaseTimeSelected, setDatabaseTimeSelected] = useState("1");
  let [databaseSelected, setDatabaseSelected] = useState("precio");
  let [coinNumber, setCoinNumber] = useState(1);
  const [loadingChart, setLoadingChart] = useState(false);
  const [isChangeInput, setIsChangeInput] = useState(false);

  window.scrollTo(0, 0);

  let USD;

  let thisCoin = coins.filter((coin) => {
    if (coin.id === "usd-coin") {
      USD = coin;
    }
    return coin.id === id;
  });

  let [price, setPrice] = useState(thisCoin[0]?.current_price);
  let [USDNumber, setUSDNumber] = useState(price);
  let [coin, setCoin] = useState(1);

  let handleTypeFilterChange = (e) => {
    let databaseFilterID = e.currentTarget.id;
    setDatabaseSelected(databaseFilterID);
  };

  let handleTimeFilterChange = (e) => {
    setLoadingChart(true);
    let databaseTimeFilterID = e.currentTarget.id;
    setDatabaseTimeSelected(databaseTimeFilterID);
  };

  let handleCoinChange = (e) => {
    let coinInput = e.currentTarget.value;
    setCoinNumber(coinInput);
  };

  let handleUDSChange = (e) => {
    let USDInput = e.currentTarget.value;
    setUSDNumber(USDInput);
  };

  let loadDataCoins = async () => {
    await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${databaseTimeSelected}`
      )
      .then((result) => {
        setDataCoin(result.data);
        setLoadingChart(false);
      })
      .catch((err) => console.log(err));
  };

  let loadDataCloseOpen = () => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=${databaseTimeSelected}`
      )
      .then((result) => {
        setDataCloseOpen(result.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadDataCoins();
    loadDataCloseOpen();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadding(false);
    }, 2000);
  }, [loadingChart, dataCloseOpen]);

  useEffect(() => {
    loadDataCoins();
    loadDataCloseOpen();
  }, [databaseTimeSelected, databaseSelected]);

  useEffect(() => {
    coinChange(coinNumber);
    USDChange(USDNumber);
  }, [coinNumber, USDNumber]);

  let coinChange = (coinNumber) => {
    setPrice((coinNumber * thisCoin[0]?.current_price).toFixed(2));
  };

  let USDChange = (USDNumber) => {
    setCoin((USDNumber / thisCoin[0]?.current_price).toFixed(5));
  };

  let changeInputTrue = () => {
    setUSDNumber((coinNumber * thisCoin[0]?.current_price).toFixed(2));
    setIsChangeInput(true);
  };

  let changeInputFalse = () => {
    setCoinNumber((USDNumber / thisCoin[0]?.current_price).toFixed(5));
    setIsChangeInput(false);
  };

  return (
    <>
      {isLoadding ? (
        <Logging />
      ) : (
        <>
          <NavBar />
          <div id="details-display">
            <div>
              <ul>
                <li>
                  <span>Nombre</span>
                  <span>{thisCoin[0].name}</span>
                </li>
                <li>
                  <span>Valor más alto 24h</span>
                  <span>{thisCoin[0].high_24h}</span>
                </li>
                <li>
                  <span>Valor actual</span>
                  <span>{thisCoin[0].current_price}</span>
                </li>
                <li>
                  <span>Valor más bajo en 24h</span>
                  <span>{thisCoin[0].low_24h}</span>
                </li>
                <li>
                  <span>Cambio en 24h</span>
                  <span
                    style={{
                      color:
                        thisCoin[0].price_change_percentage_24h < 0
                          ? "#dc2626"
                          : "#22c55e",
                    }}
                  >
                    {thisCoin[0].price_change_24h.toFixed(2)}
                    {thisCoin[0].price_change_percentage_24h > 0 ? " ↑" : " ↓"}
                  </span>
                </li>
                <li>
                  <span>Cambio en 24h</span>
                  <span
                    style={{
                      color:
                        thisCoin[0].price_change_percentage_24h < 0
                          ? "#dc2626"
                          : "#22c55e",
                    }}
                  >
                    {thisCoin[0].price_change_percentage_24h > 0 && " +"}
                    {thisCoin[0].price_change_percentage_24h.toFixed(2)}%
                  </span>
                </li>
                {loadingChart === false && databaseTimeSelected === "1" ? (
                  <li>
                    <span>Mercado hoy</span>
                  </li>
                ) : (
                  <li>
                    <span>Mercado en {databaseTimeSelected} dias</span>
                  </li>
                )}
                <li>
                  <span>Precio de apertura </span>
                  <span>{dataCloseOpen[0][1].toFixed(2)}</span>
                </li>
                <li>
                  <span>Precio de cierre</span>
                  <span>
                    {dataCloseOpen[dataCloseOpen.length - 1][4].toFixed(2)}
                  </span>
                </li>
              </ul>
              <div id="btn-buy-sell">
                <Link id="btn-sell" to="/convert">
                  Vender {thisCoin[0].symbol.toUpperCase()}
                </Link>
                <Link id="btn-buy" to="/convert">
                  Comprar {thisCoin[0].symbol.toUpperCase()}
                </Link>
              </div>
            </div>

            <div id="chart-display">
              <div id="buttons-menu">
                <div className="buttons-display" id="time-btn">
                  <button
                    id="1"
                    style={{
                      backgroundColor:
                        databaseTimeSelected === "1" ? "#6366f1" : "white",
                      color: databaseTimeSelected === "1" ? "white" : "#6366f1",
                    }}
                    onClick={handleTimeFilterChange}
                  >
                    1D
                  </button>

                  <button
                    id="7"
                    style={{
                      backgroundColor:
                        databaseTimeSelected === "7" ? "#6366f1" : "white",
                      color: databaseTimeSelected === "7" ? "white" : "#6366f1",
                    }}
                    onClick={handleTimeFilterChange}
                  >
                    7D
                  </button>
                  <button
                    id="30"
                    style={{
                      backgroundColor:
                        databaseTimeSelected === "30" ? "#6366f1" : "white",
                      color:
                        databaseTimeSelected === "30" ? "white" : "#6366f1",
                    }}
                    onClick={handleTimeFilterChange}
                  >
                    1M
                  </button>
                  <button
                    id="90"
                    style={{
                      backgroundColor:
                        databaseTimeSelected === "90" ? "#6366f1" : "white",
                      color:
                        databaseTimeSelected === "90" ? "white" : "#6366f1",
                    }}
                    onClick={handleTimeFilterChange}
                  >
                    3M
                  </button>
                </div>
                <div className="buttons-display" id="pmv-btn">
                  <button
                    id="precio"
                    style={{
                      backgroundColor:
                        databaseSelected === "precio" ? "#6366f1" : "white",
                      color:
                        databaseSelected === "precio" ? "white" : "#6366f1",
                    }}
                    onClick={handleTypeFilterChange}
                  >
                    Precio
                  </button>

                  <button
                    id="mercado"
                    style={{
                      backgroundColor:
                        databaseSelected === "mercado" ? "#6366f1" : "white",
                      color:
                        databaseSelected === "mercado" ? "white" : "#6366f1",
                    }}
                    onClick={handleTypeFilterChange}
                  >
                    Mercado
                  </button>

                  <button
                    id="volume"
                    style={{
                      backgroundColor:
                        databaseSelected === "volume" ? "#6366f1" : "white",
                      color:
                        databaseSelected === "volume" ? "white" : "#6366f1",
                    }}
                    onClick={handleTypeFilterChange}
                  >
                    Volumen
                  </button>
                </div>
              </div>

              <LineChart
                dataCoin={dataCoin}
                loadingChart={loadingChart}
                checkerData={databaseSelected}
                thisCoin={thisCoin[0]}
                name={id}
              />

              {thisCoin[0].symbol !== "usdc" ? (
                <>
                  {isChangeInput === false ? (
                    <div>
                      <p id="info-panel">
                        Convertidor de {thisCoin[0].symbol.toUpperCase()} a{" "}
                        {USD.symbol.toUpperCase()}
                      </p>
                      <div className="change-panel">
                        <div className="div-coin">
                          <label htmlFor="coin-input" id="lable-coin">
                            <img src={thisCoin[0].image}></img>
                            <div>
                              <p>{thisCoin[0].symbol.toUpperCase()}</p>
                              <p>{thisCoin[0].name}</p>
                            </div>
                          </label>
                          <input
                            type="number"
                            className="coin-input"
                            min={0}
                            value={coinNumber}
                            onChange={handleCoinChange}
                          />
                        </div>

                        <button className="arrows">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="1.5 2 24 24"
                            stroke="currentColor"
                            onClick={changeInputTrue}
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                            />
                          </svg>
                        </button>

                        <div className="div-usd">
                          <label htmlFor="coin-input" id="lable-coin">
                            <img src={USD.image}></img>
                            <div>
                              <p>{USD.symbol.toUpperCase()}</p>
                              <p>{USD.name}</p>
                            </div>
                          </label>
                          <input
                            type="number"
                            className="coin-input"
                            min={0}
                            value={price}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p id="info-panel">
                        Convertidor de {thisCoin[0].symbol.toUpperCase()} a{" "}
                        {USD.symbol.toUpperCase()}
                      </p>
                      <div className="change-panel">
                        <div className="div-coin">
                          <label htmlFor="coin-input" id="lable-coin">
                            <img src={USD.image}></img>
                            <div>
                              <p>{USD.symbol.toUpperCase()}</p>
                              <p>{USD.name}</p>
                            </div>
                          </label>
                          <input
                            type="number"
                            className="coin-input"
                            min={0}
                            value={USDNumber}
                            onChange={handleUDSChange}
                          />
                        </div>
                        <button className="arrows">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="1.5 2 24 24"
                            stroke="currentColor"
                            onClick={changeInputFalse}
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                            />
                          </svg>
                        </button>
                        <div className="div-usd">
                          <label htmlFor="coin-input" id="lable-coin">
                            <img src={thisCoin[0].image}></img>
                            <div>
                              <p>{thisCoin[0].symbol.toUpperCase()}</p>
                              <p>{thisCoin[0].name}</p>
                            </div>
                          </label>
                          <input
                            type="number"
                            className="coin-input"
                            min={0}
                            value={coin}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CoinDetails;
