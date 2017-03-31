var payontime = artifacts.require("./payontime.sol");

contract('payontime', function(accounts) {
  it("Check the ether is pay", function(){
    var sender = web3.eth.accounts[0];
    var receiver = web3.eth.accounts[1];
    var sender_start;
    var sender_end;
    var receiver_start;
    var receiver_end;
    var myPay = payontime.deployed();
    sender_start = web3.fromWei(web3.eth.getBalance(sender));
    receiver_start = web3.eth.getBalance(receiver);
    
    payontime.new(receiver,{from:sender, value:100000000000}).then(
      function(myPay){
        myPay.start.call().then(
          function(start){
            receiver_end = web3.eth.getBalance(receiver);
            console.log(receiver_end-receiver_start);
            assert.equal(start,true,"Success~");
          }
        );
      });

    });
});
