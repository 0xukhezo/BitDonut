import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Coins from "./Components/Coins/Coins";
import Home from "./Components/Home/Home";
import CoinDetails from "./Components/CoinDetails/CoinDetails";
import Convert from "./Components/Convert/Convert";
import Portfolio from "./Components/Portfolio/Portfolio";
import Campaings from "./Components/Campaigns/Campaigns";
import NewCampaigns from "./Components/Campaigns/NewCampaigns";
import CampaignDetails from "./Components/Campaigns/CampaignDetails";
import CampaignRequests from "./Components/Requests/CampaignRequests";
import NewRequest from "./Components/Requests/NewRequest";

import "./App.css";

function App() {
  let [coins, setCoins] = useState([]);

  let loadCoins = () => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
      )
      .then((result) => {
        setCoins(result.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadCoins();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home coins={coins} />}></Route>
      <Route path="/coins" element={<Coins coins={coins} />}></Route>
      <Route path="/convert" element={<Convert coins={coins} />}></Route>
      <Route path="/portfolio" element={<Portfolio coins={coins} />}></Route>
      <Route path="/campaigns" element={<Campaings />}></Route>
      <Route path="/newCampaign" element={<NewCampaigns />}></Route>
      <Route
        path="/campaigns/:id/requests"
        element={<CampaignRequests />}
      ></Route>
      <Route path="/campaigns/:id" element={<CampaignDetails />}></Route>
      <Route
        path="/campaigns/:id/requests/new"
        element={<NewRequest />}
      ></Route>
      <Route path="/:id" element={<CoinDetails coins={coins} />}></Route>
    </Routes>
  );
}

export default App;
