var GivenToken = artifacts.require("./GivenToken.sol");
var Given = artifacts.require("./Given.sol");
var GivenFactory = artifacts.require("./GivenFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(Given, "hello", web3.eth.accounts[0], 150);
  deployer.deploy(GivenToken);
  deployer.deploy(GivenFactory);
};
