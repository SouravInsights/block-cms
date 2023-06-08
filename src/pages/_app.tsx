import React from 'react';
import { Inter } from 'next/font/google';
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Layout } from '../components/commons'

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const inter = Inter({ subsets: ["latin"] });
const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: "gk29ldaCGz6MPGB5COa_eUXnAxlpPTLx" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ChakraProvider>
        <main className={inter.className}>
          <RainbowKitProvider chains={chains}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RainbowKitProvider>
        </main>
      </ChakraProvider>
    </WagmiConfig>
  );
}

export default MyApp;