import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import factory from "../../Web3/factory";
import NavBar from "../Layout/NavBar";
import Logging from "../Logging/Logging";

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
          <div>
            <div>
              <h1>Campaings</h1>
              <Link to={"/newCampaign"}>
                <button>Create a new Campaing </button>
              </Link>
            </div>

            <div>
              {campaings.map((campaing) => {
                return (
                  <Link to={`${campaing}`}>
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
