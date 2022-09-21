import React, { useState, useEffect } from "react";
import NavBar from "../Layout/NavBar";

import "./Convert.css";

function Convert({ coins }) {
  let bitcoin = coins[0];
  let ethereum = coins[1];

  let [coinOne, setCoinOne] = useState(bitcoin);
  let [coinTwo, setCoinTwo] = useState(ethereum);
  let [dropDownCoinOne, setDropDownCoinOne] = useState(false);
  let [dropDownCoinTwo, setDropDownCoinTwo] = useState(false);
  let [isArrowsPressed, setIsArrowsPressed] = useState(false);
  let [coinOneInput, setCoinOneInput] = useState(1);
  let [coinTwoInput, setCoinTwoInput] = useState();
  let [priceOne, setPriceOne] = useState(0);
  let [priceTwo, setPriceTwo] = useState(0);

  const handleCoinOne = (e) => {
    let coinOneButton = e.currentTarget.value;
    let thisCoinOne = coins.filter((coin) => {
      return coin.symbol === coinOneButton;
    });
    setDropDownCoinOne(false);
    setCoinOne(thisCoinOne[0]);
  };

  const handleCoinTwo = (e) => {
    let coinTwoButton = e.currentTarget.value;
    let thisCoinTwo = coins.filter((coin) => {
      return coin.symbol === coinTwoButton;
    });
    setDropDownCoinTwo(false);
    setCoinTwo(thisCoinTwo[0]);
  };

  let openDropDownOne = () => {
    if (dropDownCoinOne === false) {
      setDropDownCoinOne(true);
    } else {
      setDropDownCoinOne(false);
    }
  };

  let openDropDownTwo = () => {
    if (dropDownCoinTwo === false) {
      setDropDownCoinTwo(true);
    } else {
      setDropDownCoinTwo(false);
    }
  };

  const handleCoinOneChange = (e) => {
    let coinOneInput = e.currentTarget.value;
    setCoinOneInput(coinOneInput);
  };

  const handleCoinTwoChange = (e) => {
    let coinTwoInput = e.currentTarget.value;
    setCoinTwoInput(coinTwoInput);
  };

  let coinOneChange = (coinOneInput) => {
    setPriceOne(
      ((coinOneInput * coinOne.current_price) / coinTwo.current_price).toFixed(
        3
      )
    );
  };

  let coinTwoChange = (coinTwoInput) => {
    setPriceTwo(
      ((coinTwoInput * coinTwo.current_price) / coinOne.current_price).toFixed(
        3
      )
    );
  };

  let changeInputTrue = () => {
    setCoinTwoInput(priceOne);
    setIsArrowsPressed(true);
  };

  let changeInputFalse = () => {
    setCoinOneInput(priceTwo);
    setIsArrowsPressed(false);
  };

  useEffect(() => {
    coinOneChange(coinOneInput);
    coinTwoChange(coinTwoInput);
  }, [coinOneInput, coinTwoInput, coinOne, coinTwo]);

  return (
    <>
      <NavBar />
      <div id="Background-convert">
        <div id="Convert">
          {isArrowsPressed === false ? (
            <div className="convert-one">
              <div id="Container-CoinOne">
                <button onClick={openDropDownOne} className="dropdown">
                  <img src={coinOne?.image} id="img-coin-dropdown" />
                  <span>{coinOne?.symbol.toUpperCase()}</span>
                </button>
                <div>
                  {dropDownCoinOne === true && (
                    <div className="Dropdow-panel">
                      {coins?.map((coin) => {
                        return (
                          <button
                            value={coin.symbol}
                            onClick={handleCoinOne}
                            className="Dropdow-Coins"
                          >
                            <img src={coin.image} id="img-coin" />
                            <span>{coin.symbol.toUpperCase()}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  <input
                    type="number"
                    id="coinOne-input"
                    min={0}
                    value={coinOneInput}
                    onChange={handleCoinOneChange}
                  />
                </div>
                <button id="arrowsConverter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="-3 0 30 30"
                    stroke="currentColor"
                    onClick={changeInputTrue}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>
                </button>
              </div>
              <div id="Container-CoinTwo">
                <button onClick={openDropDownTwo} className="dropdown">
                  <img src={coinTwo?.image} id="img-coin-dropdown" />
                  <span>{coinTwo?.symbol.toUpperCase()}</span>
                </button>
                <div>
                  {dropDownCoinTwo === true && (
                    <div className="Dropdow-panel">
                      {coins?.map((coin) => {
                        return (
                          <button
                            value={coin.symbol}
                            onClick={handleCoinTwo}
                            className="Dropdow-Coins"
                          >
                            <img src={coin.image} id="img-coin" />
                            <span>{coin.symbol.toUpperCase()}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  <input
                    type="number"
                    id="coinTwo-input"
                    min={0}
                    disabled
                    value={priceOne}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="convert-one">
              <div id="Container-CoinOne">
                <button onClick={openDropDownTwo} className="dropdown">
                  <img src={coinTwo?.image} id="img-coin-dropdown" />
                  <span>{coinTwo?.symbol.toUpperCase()}</span>
                </button>
                <div>
                  {dropDownCoinTwo === true && (
                    <div className="Dropdow-panel">
                      {coins?.map((coin) => {
                        return (
                          <button
                            value={coin.symbol}
                            onClick={handleCoinTwo}
                            className="Dropdow-Coins"
                          >
                            <img src={coin.image} id="img-coin" />
                            <span>{coin.symbol.toUpperCase()}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  <input
                    type="number"
                    id="coinOne-input"
                    min={0}
                    onChange={handleCoinTwoChange}
                    value={coinTwoInput}
                  />
                </div>
                <button id="arrowsConverter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="-3 0 30 30"
                    stroke="currentColor"
                    onClick={changeInputFalse}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>
                </button>
              </div>
              <div id="Container-CoinTwo">
                <button onClick={openDropDownOne} className="dropdown">
                  <img src={coinOne?.image} id="img-coin-dropdown" />
                  <span>{coinOne?.symbol.toUpperCase()}</span>
                </button>
                <div>
                  {dropDownCoinOne === true && (
                    <div className="Dropdow-panel">
                      {coins?.map((coin) => {
                        return (
                          <button
                            value={coin.symbol}
                            onClick={handleCoinOne}
                            className="Dropdow-Coins"
                          >
                            <img src={coin.image} id="img-coin" />
                            <span>{coin.symbol.toUpperCase()}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  <input
                    type="number"
                    id="coinTwo-input"
                    min={0}
                    disabled
                    value={priceTwo}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Convert;
