const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const compiledFactory = require("./build/CampaingFactory.json");

require("dotenv").config();

const provider = new HDWalletProvider(
  process.env.SEED_PHRASE,
  process.env.RINKEBY_HTTP
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: "10000000", from: accounts[0] })
    .catch((err) => {
      console.log(err);
    });

  console.log("Contract deployed to:", result.options.address);

  provider.engine.stop();
};
deploy();
