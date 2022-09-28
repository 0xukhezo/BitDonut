import React, { useState } from "react";
import Campaing from "../../Web3/campaing";
import web3 from "../../Web3/web3";

function ContributeForm({ address, getMessage, getUrlEtherscan }) {
  const [amountToContribute, setAmountToContribute] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    const campaing = Campaing(address);
    try {
      const accounts = await web3.eth.getAccounts();

      getMessage("Transaction in progress");
      await campaing.methods
        .contribute()
        .send({
          from: accounts[0],
          value: web3.utils.toWei(amountToContribute, "ether"),
        })
        .on("transactionHash", (hash) => {
          getUrlEtherscan("https://rinkeby.etherscan.io/tx/" + hash);
        });

      getMessage("Successful transaction");
      setTimeout(() => {
        getMessage("");
      }, 6000);
    } catch (err) {
      getMessage(err.message);
      setTimeout(() => {
        getMessage("");
      }, 6000);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} id="form-contribute">
        <div>
          <label>Contribution to the Campaing</label>
          <p>
            <input
              onChange={(event) => setAmountToContribute(event.target.value)}
              name="name"
              id="contribution-input"
              step="any"
              min="0.000000001"
              type="number"
            />
            ETH
          </p>
        </div>
        <div>
          <button type="submit" id="contribute-btn">
            Contribute
          </button>
        </div>
      </form>
    </>
  );
}
export default ContributeForm;
