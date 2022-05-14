import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import { yetAnotherCoinAddress } from "./address";

task("name",
  "Get the name of the token")
  .setAction(async (_, { ethers }) => {
    const YetAnotherCoin = await ethers.getContractFactory("YetAnotherCoin");
    const yetAnotherCoin = YetAnotherCoin.attach(yetAnotherCoinAddress);
    const name = await yetAnotherCoin.name();
    console.log('Token name: ' + name);
  });
