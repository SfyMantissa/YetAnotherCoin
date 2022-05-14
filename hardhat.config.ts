import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "solidity-coverage";
import * as dotenv from "dotenv";
dotenv.config();

import './tasks/accounts';
import './tasks/allowance';
import './tasks/approve';
import './tasks/balanceOf';
import './tasks/burn';
import './tasks/decimals';
import './tasks/mint';
import './tasks/name';
import './tasks/symbol';
import './tasks/totalSupply';
import './tasks/transferFrom';
import './tasks/transfer';

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
