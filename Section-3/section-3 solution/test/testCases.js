const { expect } = require("chai");
const { BigNumber, Signer } = require("ethers");
const { formatBytes32String, parseEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");
const keccak256 = require("keccak256");

describe("******** Section-3 Solution of Part 2 ********", function () {
  let aution;
  let maliciousContract;

  // addresses
  let owner;
  let authorizedCaller;
  let addr2;
  let addr3;
  let addr4;

  before(async function () {
    [owner, authorizedCaller, addr2, addr3, addr4] = await ethers.getSigners();

    // Deploying Auction smart contract
    const Auction = await ethers.getContractFactory("Auction");
    aution = await Auction.deploy();

    // Deploying MaliciousContract smart contract
    const MaliciousContract = await ethers.getContractFactory(
      "MaliciousContract",
      owner
    );
    maliciousContract = await MaliciousContract.deploy(aution.address);
  });

  describe.only("******** Auction Project ********", function () {
    it("\nOther users should be able to bid", async function () {
      let currentBid = await aution.highestBid();
      console.log("Before: ",currentBid);
      await aution.connect(addr2).bid({
        value: parseEther("2"),
      });
      expect(await aution.currentLeader()).to.be.equal(addr2.address);
      currentBid = await aution.highestBid();
      console.log("After: ",currentBid);
    });

    it("\n\nMaliciousContract should be able to bid", async function () {
      let currentBid = await aution.highestBid();
      console.log("Before: ",currentBid);
      await maliciousContract.maliciousBid({
        value: parseEther("4"),
      });
      expect(await aution.currentLeader()).to.be.equal(maliciousContract.address);
      currentBid = await aution.highestBid();
      console.log("After: ",currentBid);
    });

    it("\n\nNo user should be able to bid, because we have hacked the Auction contract", async function () {
      // We hacked the Auction Contract in above test case (the state is maintained), so no user can bid to win it.
      // MaliciousContract will always win, even if other users pay more ETH.
      await expect(aution.connect(addr3).bid({
        value: parseEther("10"),
      })).to.be.rejected;

      await expect(aution.connect(addr4).bid({
        value: parseEther("11"),
      })).to.be.rejected;

      expect(await aution.currentLeader()).to.be.equal(maliciousContract.address);
    });
    
  });
});
