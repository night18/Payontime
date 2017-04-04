
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import payontime_artifacts from '../../build/contracts/payontime.json'
var payontime = contract(payontime_artifacts);

window.App = {
	sendCoin : function(){

		var sender = web3.eth.accounts[0];
		var receiver = document.getElementById('receiver').value;
		var amount = parseInt(document.getElementById('amount').value);
		web3.eth.getBalance(receiver,function(error,result){
			if(!error){
				console.log("Before transfer: " + result );
			}else{
				console.log("Error: " + error);
			}
		});
		// console.log(sender);
		// console.log(receiver);
		// console.log(amount);

		var newContract = payontime.new(receiver,{from:sender, value:amount}).then(
			function(myPay){
				console.log(myPay.getContractAddr.call());
			}).then(
			function(){
				web3.eth.getBalance(receiver,function(error,result){
					if(!error){
						console.log("After transfer: " + result );
					}else{
						console.log("Error: " + error);
					}
				});
			});
		

		
	}
}


window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  payontime.setProvider(web3.currentProvider);

});
