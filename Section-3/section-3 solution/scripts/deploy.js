// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const Card = await hre.ethers.getContractFactory("MembershipCardNFCToken");
  const card = await Card.deploy("NFC Card", "NFC", "0x2aBf3d51405d54e60F61dE6EBC6D1E78cbad6dC8")
  await card.deployed();
  
  // const ToyNFT = await hre.ethers.getContractFactory("ToyNFT");
  // const toy_nft = await ToyNFT.deploy("Toy NFT", "Toy NFT")
  // await toy_nft.deployed();


  // const _escrow = await hre.ethers.getContractFactory("EscrowServices");
  // const escrow = await _escrow.deploy()
  // await escrow.deployed();


  // console.log(
  //   `\n\nMembership Card nft contract address ${card.address}\n\nToy nft contract address ${toy_nft.address}\n`
  // );

  console.log(
    `card contract address ${card.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



// Run following in terminal to deploy
// npx hardhat run scripts/deploy.js --network goerli
