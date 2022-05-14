require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require('solidity-coverage');
require("@nomiclabs/hardhat-etherscan");

const { name } = require('./tasks/name');
const { symbol } = require('./tasks/symbol');
const { decimals } = require('./tasks/decimals');
const { totalSupply } = require('./tasks/totalSupply');
const { balanceOf } = require('./tasks/balanceOf');
const { allowance } = require('./tasks/allowance');
const { transfer } = require('./tasks/transfer');
const { transferFrom } = require('./tasks/transferFrom');
const { approve } = require('./tasks/approve');
const { mint } = require('./tasks/mint');
const { burn } = require('./tasks/burn');

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY1, process.env.PRIVATE_KEY2],
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  }
};
