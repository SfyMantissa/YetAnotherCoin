import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../config';

task("balanceOf",
  "Get the balance of the account")
  .addParam("account", "User's address")
  .setAction(async (taskArgs, { ethers }) => {
    const YetAnotherCoin = await ethers.getContractFactory("YetAnotherCoin");
    const yetAnotherCoin = YetAnotherCoin.attach(config.RINKEBY_ADDRESS);
    const balanceOf = await yetAnotherCoin.balanceOf(taskArgs.account);
    console.log(taskArgs.account + ' has ' + balanceOf + ' tokens.');
  });
