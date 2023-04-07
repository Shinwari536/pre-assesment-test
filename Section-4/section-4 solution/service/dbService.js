const TransferEvent = require("../database/models/transferEventModel");


async function saveEvent(event) {
  const newEvent = new TransferEvent(event);
  await newEvent.save();
}

async function getData(){
    const data = await TransferEvent.find().limit(3).select({_id: -1, from: 1, value: 1})
    console.log(data);
    return data;
}
module.exports = { saveEvent, getData };
