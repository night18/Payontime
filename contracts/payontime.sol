pragma solidity ^0.4.0;

contract payontime{
	address public remitter;
	address private remittee;
	uint value;
	bool public start;

	/*Only owner can use these function*/
	modifier onlyOwner(){
		if(msg.sender != remitter) throw;
		_;
	}

	/*Initialize the owner*/
	function payontime(address receiver) payable{
		remitter = msg.sender;
		value = msg.value;
		remittee = receiver;
		start = true;
		if(!remittee.send(value)){
			throw;
		}
	}

	function send (address receiver, uint amount) payable {
		
	}

	function getContractAddr() public returns(address){
		return this;
	}

	/*Get the remittee*/
	function getRemitee() public returns(address){
		return remittee;
	}


}