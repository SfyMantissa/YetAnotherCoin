const yetAnotherCoinAddress = require('./address');

task("symbol",
  "Get the symbol of the token")
  .setAction(async () => {
    const YetAnotherCoin = await hre.ethers.getContractFactory("YetAnotherCoin");
    const yetAnotherCoin = await YetAnotherCoin.attach(yetAnotherCoinAddress);
    const symbol = await yetAnotherCoin.symbol();
    console.log('Token symbol: ' + symbol);
  });
