pragma solidity ^0.4.0;

contract payontime{
	address public remitter;
	address private remittee;
	uint value;
	string reply = "false";

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
		reply = "success";
		if(!remittee.send(value)){
			throw;
		}
	}

	function wakeUp() public returns (string){
		return reply; 
	}

	function getContractAddr() public returns(address){
		return this;
	}

	/*Get the remittee*/
	function getRemitee() public returns(address){
		return remittee;
	}
}