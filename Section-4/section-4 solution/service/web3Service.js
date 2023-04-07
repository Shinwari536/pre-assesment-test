const Web3 = require("web3");
const EthDater = require("ethereum-block-by-date");
const { saveEvent } = require("./dbService");
require("dotenv").config();

const inuf_key = process.env.INFURA_KEY;
const web3 = new Web3(`https://mainnet.infura.io/v3/${inuf_key}`);
const usdcContractAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
const usdcContractAbi = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
];

const usdcContract = new web3.eth.Contract(
  usdcContractAbi,
  usdcContractAddress
);

function getHistoricalEvents() {
  // async function name(params) {
  console.log("Loading Historical Transfer events...");
  const dater = new EthDater(web3);
  const march1st2023 = new Date("2023-03-01T00:00:00Z");

  let block;
  dater.getDate(march1st2023,
      true, // Block after, optional. Search for the nearest block before or after the given date. By default true.
      false // Refresh boundaries, optional. Recheck the latest block before request. By default false.
    )
    .then((result) => {
      block = result;
    })
    .catch((err) => console.log(`We got error: \n ${err}`));

  usdcContract.getPastEvents(
    "Transfer",
    {
      fromBlock: 16995685, //block.block, (for testing I used current nearest block), block.block will give nearest block from 01-03-2023
      toBlock: "latest",
    },
    async (error, events) => {
      if (error) {
        console.error(error);
      } else {
        const eventsArray = events.map(handleEvent);
      }
    }
  );
}



function subscribeToNewEvents(params) {
  usdcContract.events
    .Transfer()
    .on("data", handleEvent)
    .on("error", console.error);
}

function handleEvent(item) {
  const event = {
    address: item.address,
    blockHash: item.blockHash,
    blockNumber: item.blockNumber,
    transactionHash: item.transactionHash,
    from: item.returnValues.from,
    to: item.returnValues.to,
    value: item.returnValues.value,
    transactionIndex: item.transactionIndex,
    event: item.event,
    signature: item.signature,
  };
  console.log("Event: ", event);
  saveEvent(event)
    .then(console.log("Event Saved\n"))
    .catch((err) => console.log(`We got error: \n ${err}`));
}

module.exports = { getHistoricalEvents, subscribeToNewEvents };
