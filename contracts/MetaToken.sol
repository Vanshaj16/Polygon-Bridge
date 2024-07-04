// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MetaToken is ERC721, Ownable {
    constructor() ERC721("MetaToken", "MTA") {}

     function promptDescription() public pure returns (string memory) {
        return "an image with the collection of 5 Metatoken NFT blockchain";
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function decimals() public pure returns (uint8) {
		return 0;
	}
    
}