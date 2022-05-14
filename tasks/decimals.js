const yetAnotherCoinAddress = require('./address');

task("decimals",
  "Get the decimals of the token")
  .setAction(async () => {
    const YetAnotherCoin = await hre.ethers.getContractFactory("YetAnotherCoin");
    const yetAnotherCoin = await YetAnotherCoin.attach(yetAnotherCoinAddress);
    const decimals = await yetAnotherCoin.decimals();
    console.log('Token decimals: ' + decimals);
  });
