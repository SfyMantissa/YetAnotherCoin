const yetAnotherCoinAddress = require('./address');

task("allowance",
  "Get the allowance provided by the account to delegate")
  .addParam("account", "User's address")
  .addParam("delegate", "Delegate's address")
  .setAction(async (taskArgs) => {
    const YetAnotherCoin = await hre.ethers.getContractFactory("YetAnotherCoin");
    const yetAnotherCoin = await YetAnotherCoin.attach(yetAnotherCoinAddress);
    const allowance = await yetAnotherCoin.allowance(taskArgs.account, taskArgs.delegate);
    console.log(taskArgs.delegate + ' has ' + allowance + ' tokens provided as allowance to ' + taskArgs.account);
  });
