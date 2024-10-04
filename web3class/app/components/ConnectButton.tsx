"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";

export default function ConnectButton() {
  const { open } = useWeb3Modal();

  return (
    <button
      onClick={() => open()}
      className="bg-blue-500 text-white p-2 rounded mb-4"
    >
      Connect Wallet
    </button>
  );
}
