import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Campaing from "../../Web3/campaing";
import web3 from "../../Web3/web3";
import ContributeForm from "./ContributeForm";
import NavBar from "../Layout/NavBar";

function CampaingDetails() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [dataCampaing, setDataCampaing] = useState([]);
  const [urlEther, setUrlEther] = useState("");

  const campaing = Campaing(id);

  const getMessage = (messageIncoming) => {
    setMessage(messageIncoming);
  };
  const getUrlEtherscan = (urletherscan) => {
    console.log(urletherscan);
    setUrlEther(urletherscan);
  };

  async function componentDidMount() {
    const dataFromFetch = await campaing.methods.getSummary().call();
    const balance = await web3.eth.getBalance(campaing.options.address);

    setDataCampaing({
      approversCount: dataFromFetch[0],
      minimumContribution: await web3.utils.fromWei(dataFromFetch[1], "ether"),
      numRequests: dataFromFetch[2],
      manager: dataFromFetch[3],
      balance: await web3.utils.fromWei(balance, "ether"),
    });
  }

  componentDidMount();

  return (
    <>
      <NavBar />
      <div id="display">
        <div id="campaing-details">
          <div>
            <p>Manager {dataCampaing.manager}</p>
            <p>
              The manager created this campaign and can create requests to
              withdraw money
            </p>
            <p>Minimal Contribution: {dataCampaing.minimumContribution} ETH</p>
            <p>
              You must contribute at least this much wei to become an approver
            </p>
            <p>Campaing Balance: {dataCampaing.balance} ETH</p>
            <p>Approvers: {dataCampaing.approversCount}</p>
          </div>
          <div id="forms-campaigns">
            <p>
              Requests in the Campaign {dataCampaing.numRequests}
              {dataCampaing.numRequests == 0 ? (
                <Link to={`/campaigns/${id}/requests/new`}>
                  <button>Create a new Request </button>
                </Link>
              ) : (
                <Link to={`/campaigns/${id}/requests`}>
                  <button>View Request</button>
                </Link>
              )}
            </p>
            <ContributeForm
              address={id}
              getMessage={getMessage}
              getUrlEtherscan={getUrlEtherscan}
            />
          </div>
        </div>
        {!message ? (
          <></>
        ) : message == "Successful transaction" ? (
          <div id="correct-transaction">
            {message}
            <div>
              <a href={urlEther} target="_blank" id="seeEtherscan">
                See in Etherscan
              </a>
            </div>
          </div>
        ) : message !== "Transaction in progress" ? (
          <div id="error-transaction">
            {message}
            <div>
              <a href={urlEther} target="_blank" id="seeEtherscan">
                See in Etherscan
              </a>
            </div>
          </div>
        ) : (
          <div id="current-transaction">
            {message}
            <div>
              <a href={urlEther} target="_blank" id="seeEtherscan">
                See in Etherscan
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CampaingDetails;
