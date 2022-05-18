import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "solidity-coverage";
import './tasks/index';
import * as dotenv from "dotenv";
dotenv.config();

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "rinkeby",
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
