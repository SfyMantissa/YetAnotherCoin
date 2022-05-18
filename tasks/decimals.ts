import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../config';

task("decimals",
  "Get the decimals of the token")
  .setAction(async (_, { ethers }) => {
    const YetAnotherCoin = await ethers.getContractFactory("YetAnotherCoin");
    const yetAnotherCoin = YetAnotherCoin.attach(config.RINKEBY_ADDRESS);
    const decimals = await yetAnotherCoin.decimals();
    console.log('Token decimals: ' + decimals);
  });
