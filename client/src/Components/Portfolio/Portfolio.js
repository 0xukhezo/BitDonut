import React, { useState, useEffect } from "react";
import NavBar from "../Layout/NavBar";
import CoinPortfolioCard from "./CoinPortfolioCard";
import "./Portfolio.css";

function Portfolio({ coins }) {
  let bitcoin = coins[0];
  let [coinSelected, setCoinSelected] = useState(bitcoin);
  let [dropDownCoin, setDropDownCoin] = useState(false);
  let [current, setCurrent] = useState();
  let [portfolio, setPortfolio] = useState([]);
  let [percentageOfCoins, setPercentageOfCoins] = useState();
  let [total, setTotal] = useState(0);
  let [changeTotal, setChange_24h] = useState(0);
  let [changeTotalPercentage, setChangePercentage_24h] = useState(0);
  let [portfolioCurrent, setPortfolioCurrent] = useState({
    coins: 0,
    symbol: "",
  });
  const handleCoin = (e) => {
    let coinButton = e.currentTarget.value;
    let thisCoin = coins.filter((coin) => {
      return coin.symbol === coinButton;
    });
    setDropDownCoin(false);
    setCoinSelected(thisCoin[0]);
  };

  let openDropDown = () => {
    if (dropDownCoin === false) {
      setDropDownCoin(true);
    } else {
      setDropDownCoin(false);
    }
  };

  let handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setCurrent((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (current.coin !== 0) {
      setPortfolioCurrent({
        coins: parseFloat(current.coin),
        symbol: coinSelected.symbol,
      });
      document.getElementById("coin-input-portfolio").value = 0;
      setCurrent(0);
    }
  };

  let createPortfolio = () => {
    let copy = [...portfolio];
    if (current !== undefined) {
      let test = portfolio.filter((similar) => {
        return similar.symbol === portfolioCurrent.symbol;
      });
      if (test.length !== 0) {
        portfolioCurrent.coins += parseFloat(test[0].coins);
        copy.splice(copy.indexOf(test[0]), 1);
      }
      copy.push(portfolioCurrent);
      setPortfolio(copy);
    }
  };

  let getInfoOfPortfolio = (active) => {
    if (active === "total") {
      let totalOfCoins = portfolio?.map((oneInPortfolio) => {
        let matches = coins.filter((oneInAllCoins) => {
          return oneInPortfolio.symbol === oneInAllCoins.symbol;
        });

        let matchesPrice = matches.map((match) => {
          return match.current_price * oneInPortfolio.coins;
        });

        return matchesPrice;
      });
      return totalOfCoins;
    } else if (active === "change") {
      let totalOfChange = portfolio?.map((oneInPortfolio) => {
        let matches = coins.filter((oneInAllCoins) => {
          return oneInPortfolio.symbol === oneInAllCoins.symbol;
        });
        let matchesPrice = matches.map((match) => {
          return match.price_change_24h * oneInPortfolio.coins;
        });

        return matchesPrice;
      });
      return totalOfChange;
      // } else if (active === "percentage") {
      //   let totalOfChangePercentage = portfolio?.map((oneInPortfolio) => {
      //     let matches = coins.filter((oneInAllCoins) => {
      //       return oneInPortfolio.symbol === oneInAllCoins.symbol;
      //     });
      //     let matchesPrice = matches.map((match) => {
      //       return match.price_change_percentage_24h * oneInPortfolio.coins;
      //     });
      //     return matchesPrice;
      //   });
      //   return totalOfChangePercentage;
    }
  };

  let getAllTotal = () => {
    let totalOfCurrentPrice = getInfoOfPortfolio("total");
    let totalOfChange = getInfoOfPortfolio("change");

    if (totalOfCurrentPrice.length > 0) {
      let total = totalOfCurrentPrice?.reduce(function (
        previousValue,
        currentValue
      ) {
        return (parseFloat(previousValue) + parseFloat(currentValue)).toFixed(
          3
        );
      });
      let percentagePerCoin = totalOfCurrentPrice.map((one) => {
        return ((one * 100) / total).toFixed(2);
      });
      let change = totalOfChange.reduce(function (previousValue, currentValue) {
        return (parseFloat(previousValue) + parseFloat(currentValue)).toFixed(
          3
        );
      });
      let changePercentage = ((-change * 100) / (change - total)).toFixed(2);
      setTotal(total);
      setChange_24h(change);
      setChangePercentage_24h(changePercentage);
      setPercentageOfCoins(percentagePerCoin);
    }
  };

  function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  }

  let totalOfCurrentPrice = getInfoOfPortfolio("total");
  let labelForChart = portfolio.map((currentCoinInPortfolio) => {
    return currentCoinInPortfolio.symbol.toUpperCase();
  });

  useEffect(() => {
    createPortfolio();
  }, [portfolioCurrent]);

  useEffect(() => {
    getAllTotal();
  }, [portfolio]);

  useEffect(() => {
    getAllTotal();
  }, [portfolio]);

  return (
    <div>
      <NavBar />
      <div id="Display">
        <div>
          <div id="ContainerInput">
            <button
              onClick={openDropDown}
              className="dropdown"
              id="dropdown-portfolio"
            >
              <img src={coinSelected?.image} id="img-coin-dropdown" />
              <span>{coinSelected?.symbol.toUpperCase()}</span>
            </button>
            {dropDownCoin === true && (
              <div className="Dropdow-panel" id="dropdown-panel-portfolio">
                {coins?.map((coin) => {
                  return (
                    <button
                      name="symbol"
                      value={coin.symbol}
                      onClick={handleCoin}
                      className="Dropdow-Coins"
                    >
                      <img src={coin.image} id="img-coin" />
                      <span>{coin.symbol.toUpperCase()}</span>
                    </button>
                  );
                })}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                step="any"
                id="coin-input-portfolio"
                min={0.00001}
                name="coin"
                onChange={handleInputChange}
                placeholder="0"
              />
              <button id="coin-submit">Añadir al Portfolio</button>
            </form>
          </div>
          <div id="display-cards">
            {portfolio.map((portfolioCoin) => {
              let currentCoin = coins.filter((coin) => {
                return coin.symbol === portfolioCoin.symbol;
              });
              return (
                <CoinPortfolioCard
                  portfolioCoin={portfolioCoin}
                  currentCoin={currentCoin}
                />
              );
            })}
          </div>
        </div>

        <div>
          <ul id="display-totals">
            <li>Total del Portfolio</li>
            <li className="Data">{separator(Math.round(total))} $</li>
            <li>Cambio en 24h</li>
            <li
              style={{
                color: changeTotal < 0 ? "#dc2626" : "#22c55e",
              }}
              className="Data"
            >
              {separator(Math.round(changeTotal))} ${" "}
              {changeTotal > 0 ? " ↑" : " ↓"}
            </li>
            <li>Porcentaje en 24h</li>
            <li
              style={{
                color: changeTotalPercentage < 0 ? "#dc2626" : "#22c55e",
              }}
              className="Data"
            >
              {changeTotalPercentage} %{" "}
              {changeTotalPercentage > 0 ? " ↑" : " ↓"}
            </li>
            {portfolio?.length > 0 ? <li>Composición Portfolio</li> : <></>}
            <li></li>
            <div>
              {portfolio?.map((oneCoinSymbol) => {
                return <li>{oneCoinSymbol.symbol.toUpperCase()}</li>;
              })}
            </div>
            <div className="Data">
              {percentageOfCoins?.map((oneCoinPercentage) => {
                return <li id="PercentageOfCoin">{oneCoinPercentage} %</li>;
              })}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
