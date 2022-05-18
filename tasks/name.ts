import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../config';

task("name",
  "Get the name of the token")
  .setAction(async (_, { ethers }) => {
    const YetAnotherCoin = await ethers.getContractFactory("YetAnotherCoin");
    const yetAnotherCoin = YetAnotherCoin.attach(config.RINKEBY_ADDRESS);
    const name = await yetAnotherCoin.name();
    console.log('Token name: ' + name);
  });
