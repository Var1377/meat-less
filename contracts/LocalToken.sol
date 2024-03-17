// https://docs.openzeppelin.com/contracts/4.x/erc20

// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LocalToken is ERC20, Ownable {

    uint8 private _decimals;

    constructor(uint8 decimals_) ERC20("LocalToken", "LOCL") Ownable(msg.sender) {
        _decimals = decimals_;
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}