import { Account } from "@solana-mobile/mobile-wallet-adapter-protocol";
export {};
declare module "*.css";

declare module "@env" {
  export const EXPO_CRYPTO_KEY: string;
}

declare global {
  interface Creds {
    account: Account | null;
    authToken: string | null;
  }
  interface Flashcard {
    key: string,
    english: string;
    french: string;
    german: string;
    italian: string;
    portuguese: string;
    spanish: string;
  }

  interface Challenge {
    key?: string,
    beginDate: number;
    language: string;
    nbDone: number;
    ended: boolean;
  }
}
