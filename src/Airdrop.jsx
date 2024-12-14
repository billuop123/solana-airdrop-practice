import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

export function Airdrop() {
  const wallet = useWallet();
  const [solanaAmount, setSolanaAmount] = useState();
  const publicKey = wallet.publicKey?.toString();
  const { connection } = useConnection();
  async function sendAirdropUser() {
    await connection.requestAirdrop(wallet.publicKey, solanaAmount);
  }
  function handleChange(e) {
    setSolanaAmount(e.target.value * 1000000000);
  }
  return (
    <div>
      Airdrop,your public key is {publicKey}
      <input
        type="text"
        placeholder="Amount"
        onChange={(e) => handleChange(e)}
      ></input>
      <button onClick={sendAirdropUser}>Send Airdrop</button>
    </div>
  );
}
