// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @author Sfy Mantissa
/// @title  A simple ERC-20-compliant token I made to better understand the
///         ERC-20 standard.
contract YetAnotherCoin is Ownable {

  mapping(address => uint256) private balances;
  mapping(address => mapping(address => uint256)) private allowances;
  
  string private _name;
  string private _symbol;
  uint8 private _decimals;
  uint256 private _totalSupply;

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
    _name = "YetAnotherCoin";
    _symbol = "YAC";
    _decimals = 5;  
    _totalSupply = 100000;
    balances[msg.sender] = _totalSupply;
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
      balances[msg.sender] >= amount,
      "Transfer amount must not exceed balance!"
    );

    balances[msg.sender] -= amount;
    balances[buyer] += amount;

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
      balances[seller] >= amount,
      "Seller does not have the specified amount!"
    );

    require(
      allowances[seller][msg.sender] >= amount,
      "Delegate does not have enough allowance!"
    );

    balances[seller] -= amount;
    allowances[seller][msg.sender] -= amount;
    balances[buyer] += amount;

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

    allowances[msg.sender][delegate] = amount;

    emit Approval(msg.sender, delegate, amount);
    return true;
  }

  /// @notice Allows the caller to give the specified `amount` of tokens
  ///         to the `account` and increase `_totalSupply` by the `amount`.
  /// @dev    Can only be called by the owner.
  /// @param  account Address of the recepient.
  /// @param  amount Number of tokens to be transferred.
  function mint(address account, uint256 amount)
    external
    onlyOwner
  {
    require(account != address(0), "Receiving account must have a non-zero address!");

    _totalSupply += amount;
    balances[account] += amount;

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
    require(balances[account] >= amount, "Burn amount must not exceed balance!");

    balances[account] -= amount;
    _totalSupply -= amount;

    emit Transfer(account, address(0), amount);
  }

  /// @notice Allows the caller to get token's `_name`.
  /// @return Token's name.
  function name()
    external
    view
    returns (string memory)
  {
    return _name;
  }

  /// @notice Allows the caller to get token's `_symbol`.
  /// @return Token's symbol.
  function symbol()
    external
    view
    returns (string memory)
  {
    return _symbol;
  }

  /// @notice Allows the caller to get token's `_decimals`.
  /// @return Token's decimals.
  function decimals()
    external
    view
    returns (uint8)
  {
    return _decimals;
  }

  /// @notice Allows the caller to get token's `_totalSupply`.
  /// @return Token's total supply.
  function totalSupply()
    external
    view
    returns (uint256)
  {
    return _totalSupply;
  }

  /// @notice Allows the caller to get token balance of the `account`.
  /// @param  account The address for which the balance is fetched.
  /// @return Token balance of the `account`.
  function balanceOf(address account)
    external
    view
    returns (uint256)
  {
    return balances[account];
  }

  /// @notice Allows the caller to get the allowance provided by the
  ///         `account` to `delegate`
  /// @return The amount of allowance.
  function allowance(address account, address delegate)
    external
    view
    returns (uint256)
  {
    return allowances[account][delegate];
  }
}
