import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import factory from "../../Web3/factory";
import NavBar from "../Layout/NavBar";
import Logging from "../Logging/Logging";

import "./Campaigns.css";

function Campaings() {
  const [campaings, setCampaings] = useState([]);
  let [isLoadding, setIsLoadding] = useState(true);

  async function fetchData() {
    const campaingsFromFetch = await factory.methods
      .getDeployedCampaing()
      .call();

    setCampaings(campaingsFromFetch);
    setIsLoadding(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [campaings]);

  return (
    <>
      {isLoadding ? (
        <Logging />
      ) : (
        <>
          <NavBar />
          <div id="display-campaings">
            <div id="header-campaings">
              <h1 id="title-campaings">Campaings</h1>
              <Link to={"/newCampaign"} id="btn-new-campaing">
                <button>Create a new Campaing </button>
              </Link>
            </div>

            <div id="wrapper">
              {campaings.map((campaing) => {
                return (
                  <Link to={`${campaing}`} id="section-campaigns">
                    <div>
                      <p>Campaing Hash {campaing}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Campaings;
