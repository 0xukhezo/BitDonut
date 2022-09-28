import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import web3 from "../../Web3/web3";
import Campaing from "../../Web3/campaing";
import NavBar from "../Layout/NavBar";

function NewRequest() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState();
  const [urlEther, setUrlEther] = useState("");
  const [recipient, setRecipient] = useState();
  const [value, setValue] = useState();
  const { id } = useParams();

  const campaing = Campaing(id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();

      setMessage("Transaction in progress");
      await campaing.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0],
        })
        .on("transactionHash", (hash) => {
          setUrlEther("https://rinkeby.etherscan.io/tx/" + hash);
        });
      navigate(`/campaigns/${id}/requests`);
      setMessage();
    } catch (err) {
      setMessage(err.message);
      setTimeout(() => {
        setMessage("");
      }, 6000);
    }
  };
  return (
    <>
      <NavBar />
      <div id="new-request-bg">
        <div id="form-new-request">
          <div>
            <h1>Create a new Request</h1>
            <form onSubmit={handleSubmit}>
              <p>
                <label>Description</label>
                <textarea
                  onChange={(event) => setDescription(event.target.value)}
                  name="description"
                  id="description-request"
                  type="text"
                />
              </p>
              <p>
                <label>Recipient</label>
                <input
                  onChange={(event) => setRecipient(event.target.value)}
                  name="recipient"
                  id="address-request"
                  type="text"
                />
              </p>
              <p>
                <label>Amount in ETH</label>
                <input
                  onChange={(event) => setValue(event.target.value)}
                  name="value"
                  step="any"
                  id="amount-request"
                  min="0.000000001"
                  type="number"
                />
              </p>
              <button type="submit">Generate the Request</button>
            </form>
          </div>
        </div>
        <p>
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
        </p>
      </div>
    </>
  );
}

export default NewRequest;
