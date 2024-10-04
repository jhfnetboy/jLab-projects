"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi"; // Import useAccount hook

export default function ConnectButton() {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount(); // Get connection status

  return (
    <button
      onClick={() => open()}
      className="bg-blue-500 text-white p-2 rounded mb-4"
    >
          {isConnected ? "Connected" : "Connect Wallet"}
    </button>
  );
}
