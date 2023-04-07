require('dotenv').config();
const { hashMessage } = require('@ethersproject/hash')
const signer = require('../utils/signer');

module.exports = async function() {
    const message = process.env.MESSAGE;
    const signature = await signer.signMessage(message);
    const messageHash = hashMessage(message);
    console.log(signature);

    return { messageHash, signature };
}