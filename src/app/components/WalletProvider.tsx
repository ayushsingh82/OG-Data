'use client';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { Chain } from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ReactNode } from 'react';

// Custom 0G-Galileo-Testnet configuration
const ogGalileoTestnet: Chain = {
  id: 16601,
  name: '0G-Galileo-Testnet',
  nativeCurrency: {
    decimals: 18,
    name: '0G',
    symbol: 'OG',
  },
  rpcUrls: {
    public: { http: ['https://rpc-galileo.0g.ai'] },
    default: { http: ['https://rpc-galileo.0g.ai'] },
  },
  blockExplorers: {
    default: { name: '0G Chainscan', url: 'https://chainscan-galileo.0g.ai' },
  },
  testnet: true,
};

const config = getDefaultConfig({
  appName: 'AgentForge',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [ogGalileoTestnet],
  ssr: true,
});

const queryClient = new QueryClient();

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}; 