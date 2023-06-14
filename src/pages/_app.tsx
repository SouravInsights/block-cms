import React from "react";
import { Inter } from "next/font/google";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "../components/commons";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { DBProvider } from "@/contexts/common/DBProvider";

import { auth, polybase } from "../config"
import { PolybaseProvider, AuthProvider } from '@polybase/react'
import { UserProvider } from '@/contexts/common/UserProvider';

const inter = Inter({ subsets: ["latin"] });
const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: "gk29ldaCGz6MPGB5COa_eUXnAxlpPTLx" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "BlockCMS App",
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
    <PolybaseProvider polybase={polybase}>
      <AuthProvider polybase={polybase} auth={auth}>
        <WagmiConfig config={wagmiConfig}>
          <ChakraProvider>
            <main className={inter.className}>
              <UserProvider>
              <DBProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
               </DBProvider>
              </UserProvider>
            </main>
          </ChakraProvider>
        </WagmiConfig>
      </AuthProvider>
    </PolybaseProvider>
  );
}

export default MyApp;
