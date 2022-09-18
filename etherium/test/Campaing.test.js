const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("Web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../build/CampaingFactory.json");
const compiledCampaing = require("../build/Campaing.json");

let accounts;
let factory;
let campaing;
let campaingAddress;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "3000000" });

  await factory.methods.createCampaing("50").send({
    from: accounts[0],
    gas: "3000000",
  });

  const addresses = await factory.methods.getDeployedCampaing().call();
  campaingAddress = addresses[0];

  campaing = await new web3.eth.Contract(compiledCampaing.abi, campaingAddress);
});

describe("campaing", () => {
  it("deploys a campaing by the factory", () => {
    assert.ok(factory.options.address);
    assert.ok(campaing.options.address);
  });

  it("manager is the only one can create campaings", async () => {
    const manager = await campaing.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it("allow someone can contribute to the campaing and mark as contributor", async () => {
    await campaing.methods.contribute().send({
      value: "200",
      from: accounts[1],
    });
    const isContributor = await campaing.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it("Send less money that is allowed", async () => {
    try {
      await lottery.methods.contribute().send({
        from: accounts[1],
        value: 10,
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("allow manager to create a payable request", async () => {
    await campaing.methods
      .createRequest("Buy batteries", "100", accounts[1])
      .send({
        gas: "1000000",
        from: accounts[0],
      });
    const request = await campaing.methods.requests(0).call();
    assert.equal("Buy batteries", request.description);
  });

  it("create all transaction possibles", async () => {
    await campaing.methods.contribute().send({
      value: web3.utils.toWei("10", "ether"),
      from: accounts[0],
    });

    await campaing.methods
      .createRequest(
        "Buy batteries",
        web3.utils.toWei("5", "ether"),
        accounts[1]
      )
      .send({
        gas: "1000000",
        from: accounts[0],
      });

    await campaing.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    await campaing.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = await web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    assert(balance > 104);
  });
});
