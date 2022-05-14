const yetAnotherCoinAddress = require('./address');

task("mint",
  "Allows the caller to give the specified `amount` of tokens to the `account` and increase `_totalSupply` by the `amount`.")
  .addParam("account", "Address of the recepient.")
  .addParam("amount", "Number of tokens to be transferred.")
  .setAction(async (taskArgs) => {
    const YetAnotherCoin = await hre.ethers.getContractFactory("YetAnotherCoin");
    const yetAnotherCoin = await YetAnotherCoin.attach(yetAnotherCoinAddress);
    const txMint = yetAnotherCoin.mint(taskArgs.account, taskArgs.amount);
    const rMint = await (await txMint).wait();

    const account = rMint.events[0].args[1];
    const amount = rMint.events[0].args[2];
    const totalSupply = await yetAnotherCoin.totalSupply();

    console.log(account + ' had ' + amount + ' of tokens minted. Total supply is now ' + totalSupply + '.');
  });
