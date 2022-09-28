import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Campaing from "../../Web3/campaing";
import web3 from "../../Web3/web3";
import NavBar from "../Layout/NavBar";
import Logging from "../Logging/Logging";

function CampaingRequests() {
  const [requests, setRequests] = useState([]);
  const [approversCounter, setApproversCounter] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoadding, setIsLoadding] = useState(true);
  const [urlEther, setUrlEther] = useState("");
  const { id } = useParams();
  const campaing = Campaing(id);

  const compound = async () => {
    const requestCounter = await campaing.methods.getRequestCount().call();

    const approversCounterFromFetch = await campaing.methods
      .approversCount()
      .call();
    setApproversCounter(approversCounterFromFetch);

    const requestsFromFetch = await Promise.all(
      Array(parseInt(requestCounter))
        .fill()
        .map((request, index) => {
          return campaing.methods.requests(index).call();
        })
    );
    setRequests(requestsFromFetch);
    setIsLoadding(false);
  };

  const onApprove = async (index) => {
    try {
      const accounts = await web3.eth.getAccounts();
      setMessage("Transaction in progress");

      await campaing.methods.approveRequest(index).send({
        from: accounts[0],
      });
      setMessage("Successful transaction");
      setTimeout(() => {
        setMessage("");
      }, 6000);
    } catch (err) {
      setMessage(err.message);
      setTimeout(() => {
        setMessage("");
      }, 6000);
    }
  };

  const onFinalize = async (index) => {
    try {
      const accounts = await web3.eth.getAccounts();
      setMessage("Transaction in progress");

      await campaing.methods
        .finalizeRequest(index)
        .send({
          from: accounts[0],
        })
        .on("transactionHash", (hash) => {
          setUrlEther("https://rinkeby.etherscan.io/tx/" + hash);
        });

      setMessage("Successful transaction");
      setTimeout(() => {
        setMessage("");
      }, 6000);
    } catch (err) {
      setMessage(err.message);
      setTimeout(() => {
        setMessage("");
      }, 6000);
    }
  };

  useEffect(() => {
    compound();
  }, []);

  useEffect(() => {
    compound();
  }, [requests]);

  return (
    <>
      {isLoadding ? (
        <Logging />
      ) : (
        <>
          <NavBar />
          <div id="display-campaings">
            <div id="header-campaings">
              <h1 id="title-campaings">Campaign Requests</h1>
              <Link to={`/campaigns/${id}/requests/new`}>
                <button>Create a new Request</button>
              </Link>
            </div>
            <div id="wrapper">
              {requests.map((request, index) => {
                return (
                  <div key={index} id="section-requests">
                    <div>ID: {index}</div>
                    <div>Description: {request.description}</div>
                    <div>Recipient: {request.recipient}</div>
                    <div>
                      Objetive: {web3.utils.fromWei(request.value, "ether")} ETH
                    </div>
                    <div>
                      Approvers: {request.approvalCount}/{approversCounter}
                    </div>
                    <div>
                      {!request.complete ? (
                        <>
                          <button onClick={onApprove.bind(null, index)}>
                            Approve request
                          </button>
                          <button onClick={onFinalize.bind(null, index)}>
                            Finalize request
                          </button>
                        </>
                      ) : (
                        <div id="request-complete">Request Complete</div>
                      )}{" "}
                    </div>
                  </div>
                );
              })}
            </div>
            <Link to={`/campaigns/${id}`}>
              <button id="back-btn">Back to Campaign</button>
            </Link>
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
      )}
    </>
  );
}

export default CampaingRequests;
