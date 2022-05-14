import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import { yetAnotherCoinAddress } from "./address";

task("mint",
  "Allows the caller to give the specified `amount` of tokens to the `account` and increase `_totalSupply` by the `amount`.")
  .addParam("account", "Address of the recepient.")
  .addParam("amount", "Number of tokens to be transferred.")
  .setAction(async (taskArgs, { ethers }) => {
    const YetAnotherCoin = await ethers.getContractFactory("YetAnotherCoin");
    const yetAnotherCoin = YetAnotherCoin.attach(yetAnotherCoinAddress);
    const txMint = yetAnotherCoin.mint(taskArgs.account, taskArgs.amount);
    const rMint = await (await txMint).wait();

    const account = rMint.events[0].args[1];
    const amount = rMint.events[0].args[2];
    const totalSupply = await yetAnotherCoin.totalSupply();

    console.log(account + ' had ' + amount + ' of tokens minted. Total supply is now ' + totalSupply + '.');
  });
