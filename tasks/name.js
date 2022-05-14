const yetAnotherCoinAddress = require('./address');

task("name",
  "Get the name of the token")
  .setAction(async () => {
    const YetAnotherCoin = await hre.ethers.getContractFactory("YetAnotherCoin");
    const yetAnotherCoin = await YetAnotherCoin.attach(yetAnotherCoinAddress);
    const name = await yetAnotherCoin.name();
    console.log('Token name: ' + name);
  });
