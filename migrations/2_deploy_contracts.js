var CZToken = artifacts.require("./CZToken.sol");

module.exports = function(deployer) {
  deployer.deploy(CZToken);
};

