import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

export function Airdrop() {
  const wallet = useWallet();
  const [solanaAmount, setSolanaAmount] = useState(0);
  const [message, setMessage] = useState("");
  const publicKey = wallet.publicKey?.toString();
  const { connection } = useConnection();

  async function sendAirdropUser() {
    if (!wallet.publicKey) {
      setMessage("Wallet not connected!");
      return;
    }
    try {
      const signature = await connection.requestAirdrop(
        wallet.publicKey,
        solanaAmount
      );
      setMessage(`Airdrop successful! Transaction signature: ${signature}`);
      console.log("Airdrop Signature:", signature);
    } catch (error) {
      console.error("Airdrop failed:", error);
      setMessage("Airdrop failed. Check the console for details.");
    }
  }

  function handleChange(e) {
    setSolanaAmount(Number(e.target.value) * 1000000000); // Convert SOL to lamports
  }

  return (
    <div>
      <p>Your public key is: {publicKey || "Not connected"}</p>
      <input
        type="text"
        placeholder="Amount in SOL"
        onChange={(e) => handleChange(e)}
      />
      <button onClick={sendAirdropUser}>Send Airdrop</button>
      <p>{message}</p>
    </div>
  );
}
