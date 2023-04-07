// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Auction {

    address public currentLeader;
    uint public highestBid;

    function bid() external payable {
        require(msg.value > highestBid);
        
        require(payable(currentLeader).send(highestBid));

        currentLeader = msg.sender;
        highestBid = msg.value;
    }
}
