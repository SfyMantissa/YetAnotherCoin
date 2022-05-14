const yetAnotherCoinAddress = require('./address');

task("balanceOf",
  "Get the balance of the account")
  .addParam("account", "User's address")
  .setAction(async (taskArgs) => {
    const YetAnotherCoin = await hre.ethers.getContractFactory("YetAnotherCoin");
    const yetAnotherCoin = await YetAnotherCoin.attach(yetAnotherCoinAddress);
    const balanceOf = await yetAnotherCoin.balanceOf(taskArgs.account);
    console.log(taskArgs.account + ' has ' + balanceOf + ' tokens.');
  });
