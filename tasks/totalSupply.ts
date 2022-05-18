import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../config';

task("totalSupply",
  "Get total token supply")
  .setAction(async (_, { ethers }) => {
    const YetAnotherCoin = await ethers.getContractFactory("YetAnotherCoin");
    const yetAnotherCoin = YetAnotherCoin.attach(config.RINKEBY_ADDRESS);
    const totalSupply = await yetAnotherCoin.totalSupply();
    console.log('Total token supply: ' + totalSupply);
  });
