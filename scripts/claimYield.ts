import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  const v3Pool = await ethers.getContractAt(
    'MonoswapV3Pool',
    '0x4384D65b057b1873e59f8D7802cC9366a7E54B84'
  );
  console.log('Claiming yield from pool:', await v3Pool.getAddress());
  const tx = await v3Pool.claimAllYield(deployer.address);
  console.log('Claimed yield with tx:', tx.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
