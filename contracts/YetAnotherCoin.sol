// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @author Sfy Mantissa
/// @title  A simple ERC-20-compliant token I made to better understand the
///         ERC-20 standard.
contract YetAnotherCoin is Ownable {

  /// @notice Get token balance of the `account`.
  mapping(address => uint256) public balanceOf;

  /// @notice Get the allowance provided by the `account` to `delegate`.
  mapping(address => mapping(address => uint256)) public allowance;
  
  /// @notice Get token's human-readable name.
  string public name;

  /// @notice Get token's acronym representation.
  string public symbol;

  /// @notice Get token's decimals in end-user representation.
  uint8 public decimals;

  /// @notice Get token's total supply.
  uint256 public totalSupply;

  /// @notice Gets triggered upon any action where tokens are moved
  ///         between accounts: transfer(), transferFrom(), mint(), burn().
  event Transfer(
    address indexed seller,
    address indexed buyer,
    uint256 amount
  );

  /// @notice Gets triggeted upon a successful approve() call.
  event Approval(
    address indexed owner,
    address indexed delegate,
    uint256 amount
  );

  /// @notice `_name` is the token's human-readable name string.
  ///         `_symbol` is the three character string used to represent the token.
  ///         `_decimals` is used to tell the precision of token quantity to the end-user.
  ///         `_totalSupply` is used to tell the total initial supply of tokens.
  /// @dev    Upon deployment owner gets the entire supply. `_totalSupply` can be manipulated
  ///         with mint() and burn() functions.
  constructor() {
    name = "YetAnotherCoin";
    symbol = "YAC";
    decimals = 5;  
    mint(msg.sender, 100000);
  }

  /// @notice Allows to transfer a specified `amount` of tokens between
  ///         the caller and the `buyer`
  /// @param  buyer Address of the recepient.
  /// @param  amount Number of tokens to be transferred.
  /// @return Flag to tell whether the call succeeded.
  function transfer(address buyer, uint256 amount) 
    external
    returns (bool)
  {
    require(buyer != address(0), "Buyer must have a non-zero address!");
    require(
      balanceOf[msg.sender] >= amount,
      "Transfer amount must not exceed balance!"
    );

    balanceOf[msg.sender] -= amount;
    balanceOf[buyer] += amount;

    emit Transfer(msg.sender, buyer, amount);
    return true;
  }

  /// @notice Allows to transfer a specified `amount` of tokens on behalf
  ///         of `seller` by the delegate.
  /// @dev    Delegate must have enough allowance.
  /// @param  seller Address of the wallet to withdraw tokens from.
  /// @param  buyer Address of the recepient.
  /// @param  amount Number of tokens to be transferred.
  /// @return Flag to tell whether the call succeeded.
  function transferFrom(address seller, address buyer, uint256 amount)
    external
    returns (bool)
  {
    require(seller != address(0), "Seller must have a non-zero address!");
    require(buyer != address(0), "Buyer must have a non-zero address!");

    require(
      balanceOf[seller] >= amount,
      "Seller does not have the specified amount!"
    );

    require(
      allowance[seller][msg.sender] >= amount,
      "Delegate does not have enough allowance!"
    );

    balanceOf[seller] -= amount;
    allowance[seller][msg.sender] -= amount;
    balanceOf[buyer] += amount;

    emit Transfer(seller, buyer, amount);
    return true;
  }

  /// @notice Allows the caller to delegate spending the specified `amount`
  ///         of tokens from caller's wallet by the `delegate`.
  /// @param  delegate Address of the delegate.
  /// @param  amount Number of tokens to be allowed for transfer.
  /// @return Flag to tell whether the call succeeded.
  function approve(address delegate, uint256 amount)
    external
    returns (bool)
  {
    require(delegate != address(0), "Delegate must have a non-zero address!");

    allowance[msg.sender][delegate] = amount;

    emit Approval(msg.sender, delegate, amount);
    return true;
  }

  /// @notice Allows the caller to give the specified `amount` of tokens
  ///         to the `account` and increase `_totalSupply` by the `amount`.
  /// @dev    Can only be called by the owner.
  /// @param  account Address of the recepient.
  /// @param  amount Number of tokens to be transferred.
  function mint(address account, uint256 amount)
    public
    onlyOwner
  {
    require(account != address(0), "Receiving account must have a non-zero address!");

    totalSupply += amount;
    balanceOf[account] += amount;

    emit Transfer(address(0), account, amount);
  }

  /// @notice Allows the caller to burn the specified `amount` of tokens
  ///         from the `account` and decrease the `_totalSupply by the `amount`.
  /// @dev    Can only be called by the owner.
  /// @param  account Address of the burned account.
  /// @param  amount Number of tokens to be burned.
  function burn(address account, uint256 amount)
    external
    onlyOwner
  {
    require(account != address(0), "Burner account must have a non-zero address!");
    require(balanceOf[account] >= amount, "Burn amount must not exceed balance!");

    balanceOf[account] -= amount;
    totalSupply -= amount;

    emit Transfer(account, address(0), amount);
  }
}
