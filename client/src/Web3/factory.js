import web3 from "./web3";

const address = "0xcFf078ee4B6EEF085Ef1D85c6bAfc50e4deF2501";

const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "minimal",
        type: "uint256",
      },
    ],
    name: "createCampaing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "deployedCampaings",
    outputs: [
      {
        internalType: "contract Campaing",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDeployedCampaing",
    outputs: [
      {
        internalType: "contract Campaing[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const instance = new web3.eth.Contract(abi, address);

export default instance;
