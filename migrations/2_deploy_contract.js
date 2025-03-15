var product = artifacts.require("product");
const PatentRegistry = artifacts.require("PatentRegistry");

module.exports = function (deployer) {
  deployer.deploy(product);
};
module.exports = function (deployer) {
  deployer.deploy(PatentRegistry);
};
