import { ethers } from 'hardhat';
import { ContractFactory } from 'ethers';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);
  const blast = {
    address: '0x4300000000000000000000000000000000000002',
  };
  const blastPoints = {
    address: '0x2fc95838c71e76ec69ff817983BFf17c710F34E0',
  };
  const ONE_BP_FEE = 100;
  const ONE_BP_TICK_SPACING = 1;
  // get private key of deployer

  const monoswapV3Factory = await ethers.deployContract(
    'MonoswapV3Factory',
    []
  );

  console.log(
    'UniswapV3Factory deployed to:',
    await monoswapV3Factory.getAddress()
  );
  console.log(
    'Pool init code hash:',
    await monoswapV3Factory.INIT_CODE_POOL_HASH()
  );

  console.log('Set fee 500 bps with tick spacing 10');
  await monoswapV3Factory.enableFeeAmount(500, 10);
  console.log('Set fee 3000 bps with tick spacing 60');
  await monoswapV3Factory.enableFeeAmount(3000, 60);
  console.log('Set fee 10000 bps with tick spacing 200');
  await monoswapV3Factory.enableFeeAmount(10000, 200);

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
