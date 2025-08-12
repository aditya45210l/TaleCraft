"use client";
// import { CampProvider } from "@camp/origin";
import { CampProvider } from "@campnetwork/origin/react";
import { ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ORIGIN_CLIENT_ID } from "./env";
import { WagmiProvider } from "wagmi";
import config from "../../../rainbowKitProvider";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import useTheme from "../store/useTheme";

const queryClient = new QueryClient();
// const apollo = new ApolloClient({
//   uri: import.meta.env.VITE_SUBGRAPH_URL,
//   cache: new InMemoryCache(),
// });
export function Provider({ children }: { children: ReactNode }) {
  const theme = useTheme((state) => state.theme);

   useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <CampProvider clientId={'fce77d7a-8085-47ca-adff-306a933e76aa'}>
            {/* <ApolloProvider client={apollo}> */}
            {children}
            {/* </ApolloProvider> */}
          </CampProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
