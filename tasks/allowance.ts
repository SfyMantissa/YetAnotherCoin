import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../config';

task("allowance",
  "Get the allowance provided by the account to delegate")
  .addParam("account", "User's address")
  .addParam("delegate", "Delegate's address")
  .setAction(async (taskArgs, { ethers }) => {
    const YetAnotherCoin = await ethers.getContractFactory("YetAnotherCoin");
    const yetAnotherCoin = YetAnotherCoin.attach(config.RINKEBY_ADDRESS);
    const allowance = await yetAnotherCoin.allowance(taskArgs.account, taskArgs.delegate);
    console.log(taskArgs.delegate + ' has ' + allowance + ' tokens provided as allowance to ' + taskArgs.account + '.');
  });
