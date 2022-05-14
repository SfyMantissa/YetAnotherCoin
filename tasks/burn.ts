import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import { yetAnotherCoinAddress } from "./address";

task("burn",
  "Allows the caller to burn the specified `amount` of tokens from the `account` and decrease the `_totalSupply by the `amount`.")
  .addParam("account", "Address of the burned account.")
  .addParam("amount", "Number of tokens to be burned.")
  .setAction(async (taskArgs, { ethers }) => {
    const YetAnotherCoin = await ethers.getContractFactory("YetAnotherCoin");
    const yetAnotherCoin = YetAnotherCoin.attach(yetAnotherCoinAddress);
    const txBurn = yetAnotherCoin.burn(taskArgs.account, taskArgs.amount);
    const rBurn = await (await txBurn).wait();

    const account = rBurn.events[0].args[0];
    const amount = rBurn.events[0].args[2];
    const totalSupply = await yetAnotherCoin.totalSupply();

    console.log(account + ' had ' + amount + ' of tokens burned. Total supply is now ' + totalSupply + '.');
  });
