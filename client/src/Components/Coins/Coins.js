import React from "react";

function Coins(props) {
  return (
    <div id="coin-list">
      {props.coins?.map((coin) => {
        return <div key={coin.id}></div>;
      })}
    </div>
  );
}

export default Coins;
