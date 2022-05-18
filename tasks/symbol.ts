import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../config';

task("symbol",
  "Get the symbol of the token")
  .setAction(async (_, { ethers }) => {
    const YetAnotherCoin = await ethers.getContractFactory("YetAnotherCoin");
    const yetAnotherCoin = YetAnotherCoin.attach(config.RINKEBY_ADDRESS);
    const symbol = await yetAnotherCoin.symbol();
    console.log('Token symbol: ' + symbol);
  });
