import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../config';

task("transferFrom",
  "Allows to transfer a specified `amount` of tokens on behalf of `seller` by the delegate.")
  .addParam("signer", "ID of the signer used to make the call.")
  .addParam("seller", "Address of the wallet to withdraw tokens from.")
  .addParam("buyer", "Address of the recepient.")
  .addParam("amount", "Number of tokens to be transferred.")
  .setAction(async (taskArgs, { ethers }) => {
    const YetAnotherCoin = await ethers.getContractFactory("YetAnotherCoin");
    const yetAnotherCoin = YetAnotherCoin.attach(config.RINKEBY_ADDRESS);
    const signerArray = await ethers.getSigners();
    const txTransferFrom = yetAnotherCoin.connect(signerArray[taskArgs.signer]).transferFrom(taskArgs.seller, taskArgs.buyer, taskArgs.amount);
    const rTransferFrom = await (await txTransferFrom).wait();

    const seller = rTransferFrom.events[0].args[0];
    const buyer = rTransferFrom.events[0].args[1];
    const amount = rTransferFrom.events[0].args[2];

    console.log('On behalf of ' + seller + ' ' + amount + ' of tokens were sent to ' + buyer);
  });
