"use client";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {  basecampTestnet} from "viem/chains";
import {WALLETCONNECT_PROJECT_ID} from "@/lib/config/env"

const config = getDefaultConfig({
  appName: "Simle ENS",
  projectId: WALLETCONNECT_PROJECT_ID || 'be7bdc5bddc672a5f0003bb02559f68e',
  chains: [basecampTestnet],
  ssr: false,
});

export default config;