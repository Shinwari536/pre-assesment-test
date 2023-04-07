const mongoose = require('mongoose');

const transferSchema = mongoose.Schema({
    address: {
        type: String,
    },
    blockHash: {
        type: String,
    },
    blockNumber: {
        type: Number,
    },
    transactionHash: {
        type: String,
    },
    from: {
        type: String,
    },
    to: {
        type: String,
    },
    value: {
        type: Number,
    },
    event: {
        type: String,
    },
    signature: {
        type: String,
    },
});

const TransferEvent = mongoose.model("Transfer Event", transferSchema);
module.exports = TransferEvent;
/*
{
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    blockHash: '0xa6131258f0f435d72c0608dff9a9394a2e6f5c9a8ae3ac052eee81d05116b49e',
    blockNumber: 16989059,
    logIndex: 272,
    removed: false,
    transactionHash: '0xd1b8bb1e428b917aa74663445803b958bd29e9146bb819d698be92845db05724',
    transactionIndex: 149,
    id: 'log_3a4f9335',
    returnValues: Result {
      '0': '0x74de5d4FCbf63E00296fd95d33236B9794016631',
      '1': '0x1Da33044457942254C8057f499a0Cf94E0540C9F',
      '2': '1487936032',
      from: '0x74de5d4FCbf63E00296fd95d33236B9794016631',
      to: '0x1Da33044457942254C8057f499a0Cf94E0540C9F',
      value: '1487936032'
    },
    event: 'Transfer',
    signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    raw: {
      data: '0x0000000000000000000000000000000000000000000000000000000058b01a20',
      topics: [Array]
    }
  }

  */