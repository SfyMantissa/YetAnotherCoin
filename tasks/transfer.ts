import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../config';

task("transfer",
  "Allows to transfer a specified `amount` of tokens between the caller and the `buyer`")
  .addParam("signer", "ID of the signer used to make the call.")
  .addParam("buyer", "Address of the recepient.")
  .addParam("amount", "Number of tokens to be transferred.")
  .setAction(async (taskArgs, { ethers }) => {
    const YetAnotherCoin = await ethers.getContractFactory("YetAnotherCoin");
    const yetAnotherCoin = YetAnotherCoin.attach(config.RINKEBY_ADDRESS);
    const signerArray = await ethers.getSigners();
    const txTransfer = yetAnotherCoin.connect(signerArray[taskArgs.signer]).transfer(taskArgs.buyer, taskArgs.amount);
    const rTransfer = await (await txTransfer).wait();

    const caller = rTransfer.events[0].args[0];
    const buyer = rTransfer.events[0].args[1];
    const amount = rTransfer.events[0].args[2];

    console.log(caller + ' sent ' + amount + ' of tokens to ' + buyer + '.');
  });
