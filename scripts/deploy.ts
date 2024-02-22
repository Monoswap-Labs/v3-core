import { ethers } from 'hardhat';
import { ContractFactory } from 'ethers';

async function main() {
  const ONE_BP_FEE = 100;
  const ONE_BP_TICK_SPACING = 1;
  // get private key of deployer

  const MonoswapV3Factory: ContractFactory = await ethers.getContractFactory(
    'MonoswapV3Factory'
  );
  const monoswapV3Factory = await MonoswapV3Factory.deploy();

  console.log(
    'UniswapV3Factory deployed to:',
    await monoswapV3Factory.getAddress()
  );
  console.log(
    'Pool init code hash:',
    await monoswapV3Factory.INIT_CODE_POOL_HASH()
  );
  monoswapV3Factory.enableFeeAmount(ONE_BP_FEE, ONE_BP_TICK_SPACING);
  console.log(
    `UniswapV3Factory added a new fee tier ${
      ONE_BP_FEE / 100
    } bps with tick spacing ${ONE_BP_TICK_SPACING}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
