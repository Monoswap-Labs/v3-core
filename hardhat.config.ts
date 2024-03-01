import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.7.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 0,
          },
        },
      },
    ],
  },
  networks: {
    ganache: {
      url: 'http://localhost:8545',
      gasPrice: 20000000000,
      accounts: [process.env.GANACHE_PRIVATE_KEY || ''],
    },
    // for mainnet
    blastMainnet: {
      url: `https://rpc.ankr.com/blast`,
      accounts: [process.env.BLAST_MAINNET_PRIVATE_KEY || ''],
      // gasPrice: 1000000000,
    },
    // for Sepolia testnet
    blastSepolia: {
      url: `https://rpc.ankr.com/blast_testnet_sepolia/${
        process.env.NODE_API_KEY || ''
      }`,
      accounts: [process.env.BLAST_SEPOLIA_PRIVATE_KEY || ''],
      gasPrice: 10000000000,
    },
  },
  etherscan: {
    apiKey: {
      blastSepolia: 'your API key',
      blastMainnet: process.env.SCAN_API_KEY || '',
    },
    customChains: [
      {
        network: 'blastSepolia',
        chainId: 168587773,
        urls: {
          apiURL:
            'https://api.routescan.io/v2/network/testnet/evm/168587773/etherscan',
          browserURL: 'https://testnet.blastscan.io',
        },
      },
      {
        network: 'blastMainnet',
        chainId: 81457,
        urls: {
          apiURL: 'https://api.blastscan.io/api',
          browserURL: 'https://blastscan.io/',
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
};

export default config;
