import { Connection, clusterApiUrl } from "@solana/web3.js";

let connectionInstance:Connection;

export default function getConnection() {
  if (!connectionInstance) {
    connectionInstance = new Connection(clusterApiUrl("devnet"), "confirmed");
  }
  return connectionInstance;
}
