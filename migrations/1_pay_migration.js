var payMigration = artifacts.require("./payontime.sol");

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(payMigration);
};
