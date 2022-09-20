import React, { useState, useEffect } from "react";
import CoinCard from "../CoinCard/CoinCard";
import NavBar from "../Layout/NavBar";

function Coins({ coins }) {
  let [open, setOpen] = useState(false);
  let [shorts, setShort] = useState();
  let [allCoins, setCoins] = useState(coins);
  let [allCoinsCopy, setCoinsCopy] = useState(coins);
  let [search, setSearch] = useState("");
  window.scrollTo(0, 0);
  let bitcoin = allCoins.filter((coin) => {
    return coin.id === "bitcoin";
  });

  let closeSearch = () => {
    setSearch("");
  };

  let openDisplay = () => {
    setOpen(true);
  };

  let hiddeDisplay = () => {
    setOpen(false);
    closeSearch();
  };

  let getShort = (id) => {
    setShort(id);
  };

  const sortOptions = [
    { value: "1", label: "Más caro", checked: false },
    { value: "0", label: "Más barato", checked: false },
  ];

  const handleShortFilterChange = (e) => {
    let shortFilterID = e.currentTarget.id;
    getShort(shortFilterID);
  };

  useEffect(() => {
    let copy = [...allCoins];
    if (search.length !== 0) {
      copy = allCoins.filter((coin) =>
        coin.name.toLowerCase().includes(search)
      );
    }
    if (shorts === 1) {
      copy = copy.sort((a, b) => {
        if (a.current_price > b.current_price) {
          return -1;
        }
        if (a.current_price < b.current_price) {
          return 1;
        }
        return 0;
      });
    } else if (shorts === 0) {
      copy = copy.sort((a, b) => {
        if (a.current_price > b.current_price) {
          return 1;
        }
        if (a.current_price < b.current_price) {
          return -1;
        }
        return 0;
      });
    }
    setCoinsCopy(copy);
  }, [shorts, search]);

  return (
    <>
      <NavBar />
      <div>
        {open === true ? (
          <>
            <div>
              <button onClick={hiddeDisplay}>Ocultar</button>
            </div>
            <div>
              <ul>
                {sortOptions.map((option) => (
                  <li>
                    <label htmlFor={option.value}>
                      <input
                        onChange={handleShortFilterChange}
                        id={option.value}
                        name="radio-filter"
                        defaultChecked={false}
                        key={option.value}
                        type="radio"
                      />
                      <span>{option.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div>
            <button onClick={openDisplay}>Filtros</button>
          </div>
        )}

        <ul>
          <li>Nombre</li>
          <li>Precio </li>
          <li>Más alto 24h </li>
          <li>Más bajo 24h </li>
          <li>Cambio en 24h </li>
          <li>Porcentaje en 24h</li>
          <li>Cambio con BTC</li>
        </ul>

        <div>
          {allCoinsCopy?.map((coin) => {
            return (
              <div key={coin.id}>
                <CoinCard coin={coin} bitcoin={bitcoin[0]} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Coins;
