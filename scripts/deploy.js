const hre = require("hardhat");

const main = async () => {
  const YetAnotherCoin = await hre.ethers.getContractFactory("YetAnotherCoin");
  const yetAnotherCoin = await YetAnotherCoin.deploy();
  await yetAnotherCoin.deployed();
  console.log("YetAnotherCoin deployed to:", yetAnotherCoin.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
