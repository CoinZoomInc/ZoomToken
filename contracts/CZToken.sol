pragma solidity ^0.4.17;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";

contract CZToken is StandardToken, Ownable,Pausable {
  string public constant name = 'CoinZoom'; // token_name 
  string public constant symbol = 'ZOOM'; // token_symbol
  uint8 public constant decimals = 18; // decimal ponts
  uint  constant INITIAL_SUPPLY = 1000000000; // initial quantity of total_token supply

  string Owner;

  event Yes(string);
  event No(string);

 // to set initial supply of the token on creator address
  constructor() public {
    totalSupply_ = INITIAL_SUPPLY * (10**uint(decimals));

    // to set the total balance at creator address
    balances[msg.sender] = totalSupply_;
    }

  function setON(string _n) public onlyOwner returns (bool) {
    Owner = _n;
    return true;
  }

  function getON() public view returns (string) {
    return Owner;
  }


  function () public payable {
    revert("This contract does not support recieving ether.");
  }

// to transfer from coin to some other address
  function transfer(address _to, uint256 _value)
    public
    onlyOwner
    returns (bool)
    {
        require(_to != msg.sender);
        return super.transfer(_to, _value);
    }

  function transferFrom(address _from, address _to, uint256 _value)
    public
    returns (bool)
    {
        return super.transferFrom(_from, _to, _value);
    }


    function approve(address _spender, uint256 _value)
    public
    onlyOwner
    returns (bool)
    {
        return super.approve(_spender, _value);
    }

    function increaseApproval(address _spender, uint _addedValue)
    public
    returns (bool success)
    {
        return super.increaseApproval(_spender, _addedValue);
    }

  function decreaseApproval(address _spender, uint _subtractedValue)
    public
    returns (bool success)
    {
        return super.decreaseApproval(_spender, _subtractedValue);
    }

}
