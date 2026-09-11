import { network } from "hardhat";

const { ethers } = await network.connect();

const ledger = await ethers.deployContract("ConsentLedger");
await ledger.waitForDeployment();

console.log(`ConsentLedger deployed to: ${await ledger.getAddress()}`);
