import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import { yetAnotherCoinAddress } from "./address";

task("approve",
  "Allows the caller to delegate spending the specified `amount` of tokens from caller's wallet by the `delegate`.")
  .addParam("signer", "ID of the signer used to make the call.")
  .addParam("delegate", "Address of the delegate")
  .addParam("amount", "Number of tokens to be allowed for transfer.")
  .setAction(async (taskArgs, { ethers }) => {
    const YetAnotherCoin = await ethers.getContractFactory("YetAnotherCoin");
    const yetAnotherCoin = YetAnotherCoin.attach(yetAnotherCoinAddress);
    const signerArray = await ethers.getSigners();
    const txApprove = yetAnotherCoin.connect(signerArray[taskArgs.signer]).approve(taskArgs.delegate, taskArgs.amount);
    const rApprove = await (await txApprove).wait();

    const caller = rApprove.events[0].args[0];
    const delegate = rApprove.events[0].args[1];
    const amount = rApprove.events[0].args[2];

    console.log(caller + ' approved ' + delegate + ' to spend ' + amount + ' of tokens on their behalf.');
  });
