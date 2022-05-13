// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract YetAnotherCoin {

  mapping(address => uint256) private balances;
  mapping(address => mapping(address => uint256)) private allowances;
  
  string private _name;
  string private _symbol;
  uint8 private _decimals;
  uint256 private _totalSupply;

  event Transfer(address indexed seller, address indexed buyer, uint256 amount);
  event Approval(address indexed owner, address indexed delegate, uint256 amount);

  constructor() {
    _name = "YetAnotherCoin";
    _symbol = "YAC";
    _decimals = 5;  
    _totalSupply = 100000;
  }

  function transfer(address buyer, uint256 amount) public returns (bool success) {
    require(buyer != address(0), "Buyer must have a non-zero address!");
    require(balances[msg.sender] >= amount, "Transfer amount must not exceed balance!");

    balances[msg.sender] -= amount;
    balances[buyer] += amount;

    emit Transfer(msg.sender, buyer, amount);
    return true;
  }

  function transferFrom(address seller, address buyer, uint256 amount) public returns (bool success) {
    require(seller != address(0), "Seller must have a non-zero address!");
    require(buyer != address(0), "Buyer must have a non-zero address!");
    require(balances[seller] >= amount, "Seller does not have the specified amount!");
    require(allowances[seller][msg.sender] >= amount, "Delegate does not have enough allowance!");

    balances[seller] -= amount;
    allowances[seller][msg.sender] -= amount;
    balances[buyer] += amount;

    emit Transfer(seller, buyer, amount);
    return true;
  }

  function approve(address delegate, uint256 amount) public returns (bool success) {
    require(delegate != address(0), "Delegate must have a non-zero address!");

    allowances[msg.sender][delegate] = amount;

    emit Approval(msg.sender, delegate, amount);
    return true;
  }

  function mint(address account, uint256 amount) public {
    require(account != address(0), "Receiving account must have a non-zero address!");

    _totalSupply += amount;
    balances[account] += amount;

    emit Transfer(address(0), account, amount);
  }

  function burn(address account, uint256 amount) public {
    require(account != address(0), "Burner account must have a non-zero address!");

    balances[account] -= amount;
    _totalSupply -= amount;

    emit Transfer(account, address(0), amount);
  }

  function name() public view returns (string memory) {
    return _name;
  }

  function symbol() public view returns (string memory) {
    return _symbol;
  }

  function decimals() public view returns (uint8) {
    return _decimals;
  }

  function totalSupply() public view returns (uint256) {
    return _totalSupply;
  }

  function balanceOf(address account) public view returns (uint256 balance) {
    return balances[account];
  }

  function allowance(address account, address delegate) public view returns (uint256 remaining) {
    return allowances[account][delegate];
  }
}
