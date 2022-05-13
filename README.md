# YetAnotherCoin 💰

A simple ERC-20-compliant token I made to better understand the [ERC-20 standard](https://eips.ethereum.org/EIPS/eip-20).

## Features

- [x] The contract is fully ERC-20-compliant.
- [x] The contract includes additional _mint()_ and _burn()_ functions.
- [ ] Includes tests which provide 100% coverage according to _solidity-coverage_ in _test/yet-another-coin-test.ts_.
- [ ] Deployment script is located in _scripts/deploy.ts_.
- [x] All private deployment data is stored using [dotenv](https://www.npmjs.com/package/dotenv).
- [ ] The contract is deployed to the Rinkeby testnet @%ADDRESS_HERE%.
- [ ] Hardhat tasks were written and stored in _tasks/_, they cover everything in the ABI.
- [ ] Additional _verify_ task is made to easily verify the contract after deployment.
- [ ] All tests, tasks and configs use TypeScript.

**Don't forget to append _--network rinkeby_ when using tasks with the contract deployed to testnet.**

## Demonstration

%SCREENSHOT_OF_COVERAGE%
%GIF_WITH_TASK_RUNNING%

