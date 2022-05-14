const yetAnotherCoinAddress = require('./address');

task("totalSupply",
  "Get total token supply")
  .setAction(async () => {
    const YetAnotherCoin = await hre.ethers.getContractFactory("YetAnotherCoin");
    const yetAnotherCoin = await YetAnotherCoin.attach(yetAnotherCoinAddress);
    const totalSupply = await yetAnotherCoin.totalSupply();
    console.log('Total token supply: ' + totalSupply);
  });
