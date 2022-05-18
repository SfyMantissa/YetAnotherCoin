import { ethers } from "hardhat";

const main = async () => {
  const YetAnotherCoin = await ethers.getContractFactory("YetAnotherCoin");
  const yetAnotherCoin = await YetAnotherCoin.deploy(
    "YetAnotherCoin",
    "YAC",
    5,
    100000
  );
  await yetAnotherCoin.deployed();
  console.log("YetAnotherCoin deployed to:", yetAnotherCoin.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
