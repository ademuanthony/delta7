/**
 *SPDX-License-Identifier: UNLICENSED
*/

pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Delta7 is ERC1155, Ownable {
    using SafeMath for uint;

    uint256 public round;
    bool public auctionIsRunning;

    uint256 public auctionStartDate;
    uint256 public auctionEndDate;

    uint256 public auctionStartIndex;
    uint256 public auctionEndIndex;

    address public adminWallet;

    IERC20 dfcToken;

    // @dev mapping of a users bids for each item in each round
    mapping(uint256 => mapping(address => mapping(uint256 => uint256))) bids;
    // @dev of bidders for each round
    mapping(uint256 => mapping(uint256 => address[])) public topBidders;
    // @dev mapping of bids for each round
    mapping(uint256 => mapping(uint256 => uint256[])) public topBids;

    uint constant ADAY = 1 days;

    event BidPlaced(address account, uint256 item, uint256 amount);
    event AuctionStarted(uint256 startIndex, uint256 numberOfItems, uint256 numberOfDays);
    event AuctionEnded(uint256 round);

    constructor(string memory baseUri) ERC1155(baseUri) {}

    function setDfcTokenInstance(address instance) public onlyOwner {
        dfcToken = IERC20(instance);
    }

    function setAdminWallet(address account) public onlyOwner {
        adminWallet = account;
    }

    // @dev Places a bid with the {amount} on the {item} for the caller
    //
    // @dev refunds the current bid
    // @dev Transfers the {amount} DFC from the caller to the contract
    //
    // @dev emits BidPlaced event
    function placeBid(uint256 item, uint256 amount) external {
        require(auctionStartDate > 0 && block.timestamp <= auctionEndDate, "No auction is running at the moment");
        require(item >= auctionStartIndex && item <= auctionEndIndex, "no auction for the selected item");

        uint256 currentMax;
        if (topBids[round][item].length > 0) {
            currentMax = topBids[round][item][topBids[round][item].length-1];
        }
        require(amount > currentMax, "amount must be greater than the current max bid for this item");

        dfcToken.transferFrom(msg.sender, address(this), amount);
        if (topBids[round][item].length > 0) {
            dfcToken.transfer(topBidders[round][item][topBidders[round][item].length-1], topBids[round][item][topBids[round][item].length-1]);
        }

        bids[round][msg.sender][item] = amount;
        topBids[round][item].push(amount);
        topBidders[round][item].push(msg.sender);

        BidPlaced(msg.sender, item, amount);
    }

    // @dev starts auctoin for the specified {numberOfItems}
    //
    // @dev emits AuctionStarted event
    function startAuction(uint256 numberOfItems, uint256 numberOfDays) external onlyOwner {
        require(block.timestamp > auctionEndDate, "Wait for the current auction to end");
        require(!auctionIsRunning, "release items for last auction first");

        if (auctionEndIndex > 0) {
            auctionStartIndex = auctionEndIndex.add(1);
        }
        auctionEndIndex = auctionStartIndex.add(numberOfItems.sub(1));

        auctionStartDate = block.timestamp;
        auctionEndDate = block.timestamp.add(numberOfDays.mul(ADAY));
        round++;
        auctionIsRunning = true;
    }

    // @dev ends the last auction and release the items for the winners
    //
    //@dev emit AuctionEnded
    function releaseItems() external {
        require(block.timestamp > auctionEndDate, "Wait for the current auction to end");
        require(auctionIsRunning, "no pending items to release");
        for(uint256 item = auctionStartIndex; item <= auctionEndIndex; item++) {
            (address winner, ) = auctionWinner(item, round);
            if (winner == address(0)) {
                winner = adminWallet;
            }
            _mint(winner, item, 1, "");
        }
        dfcToken.transfer(adminWallet, dfcToken.balanceOf(address(this)));
        auctionIsRunning = false;
        emit AuctionEnded(round);
    }

    // @dev returns the winner of {item} for the {_round}
    function auctionWinner(uint256 item, uint256 _round) public view returns(address account, uint256 amount) {
        require(_round <= round, "invalid round");
        if(_round == round) {
            require(item >= auctionStartIndex && item <= auctionEndIndex, "item not in current auction");
        }
        if (topBids[_round][item].length > 0) {
            amount = topBids[_round][item][topBids[_round][item].length-1];
            account = topBidders[_round][item][topBidders[_round][item].length-1];
        }
    }

    // @dev returns the number of bids for {item} in {round}
    function bidCount(uint256 _round, uint256 item) external view returns(uint256) {
        require(_round <= round, "invalid round");
        return topBids[_round][item].length;
    }

    // @dev returns the bid at {index} for the {item} in {_round}
    function getBid(uint256 _round, uint256 item, uint256 index) external view returns(address account, uint256 amount) {
        amount = topBids[_round][item][index];
        account = topBidders[_round][item][index];
    }

    // @dev returns the bid by {account} for the {item} in {_round}
    function getBidByAccount(uint256 _round, uint256 item, address account) external view returns(uint256) {
        return bids[_round][account][item];
    }

}