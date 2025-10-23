# 🌐 0G-Galileo-Testnet Configuration

## Network Details
- **Network Name**: 0G-Galileo-Testnet
- **Chain ID**: 16602
- **Token Symbol**: 0G
- **Block Explorer**: https://chainscan-galileo.0g.ai
- **Faucet**: https://faucet.0g.ai
- **RPC URL**: https://rpc-galileo.0g.ai

## Wallet Configuration Updated

The wallet provider has been updated to use 0G-Galileo-Testnet instead of Base Sepolia:

### Changes Made:
1. **WalletProvider.tsx**: Updated to use custom 0G chain definition
2. **Layout.tsx**: Updated metadata to reflect 0G Network
3. **Page.tsx**: Updated branding to show "Powered by 0G-Galileo-Testnet"

### Chain Configuration:
```typescript
const ogGalileoTestnet = defineChain({
  id: 16602,
  name: '0G-Galileo-Testnet',
  nativeCurrency: {
    decimals: 18,
    name: '0G',
    symbol: '0G',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-galileo.0g.ai'],
    },
    public: {
      http: ['https://rpc-galileo.0g.ai'],
    },
  },
  blockExplorers: {
    default: {
      name: '0G Chainscan',
      url: 'https://chainscan-galileo.0g.ai',
    },
  },
  testnet: true,
});
```

## Getting Started

### 1. Get Test Tokens
- Visit https://faucet.0g.ai
- Connect your wallet
- Request test 0G tokens

### 2. Add Network to Wallet
The network will be automatically added when you connect through the UI, but you can also add it manually:

**Network Details for Manual Addition:**
- Network Name: 0G-Galileo-Testnet
- RPC URL: https://rpc-galileo.0g.ai
- Chain ID: 16602
- Currency Symbol: 0G
- Block Explorer: https://chainscan-galileo.0g.ai

### 3. Deploy Contracts
Deploy your Wave 5 contracts to the 0G-Galileo-Testnet:
```bash
# Update your hardhat config for 0G network
# Deploy contracts
npx hardhat deploy --network ogGalileo
```

### 4. Update Contract Addresses
Once deployed, update the contract addresses in your UI components:
- `/src/app/contract-testing/page.tsx`
- `/src/app/wave5/page.tsx`
- Any other components that reference contract addresses

## Environment Variables

Make sure your `.env.local` includes:
```bash
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_OG_RPC_URL=https://rpc-galileo.0g.ai
NEXT_PUBLIC_CHAIN_ID=16602
```

## Testing

1. **Connect Wallet**: Use the connect button in the navbar
2. **Switch Network**: Wallet should automatically switch to 0G-Galileo-Testnet
3. **Test Functions**: Use the contract testing interface at `/contract-testing`
4. **View Transactions**: Check transactions on https://chainscan-galileo.0g.ai

## Troubleshooting

### Common Issues:
1. **Network Not Found**: Make sure you're using a compatible wallet (MetaMask, WalletConnect)
2. **RPC Errors**: Check if the RPC URL is accessible
3. **Transaction Failures**: Ensure you have enough 0G tokens for gas fees

### Support:
- **0G Documentation**: Check 0G official docs
- **Block Explorer**: Monitor transactions at https://chainscan-galileo.0g.ai
- **Community**: Join 0G community channels

## Next Steps

1. Deploy all Wave 5 contracts to 0G-Galileo-Testnet
2. Update contract addresses in the UI
3. Test all functionality end-to-end
4. Prepare for mainnet deployment when ready
