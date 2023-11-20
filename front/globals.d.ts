import { Account } from "@solana-mobile/mobile-wallet-adapter-protocol";
export {};
declare module "*.css";

declare module "@env" {
  export const EXPO_CRYPTO_KEY: string;
}

declare global {
  interface Creds {
    accounts: Account[];
    auth_token: string;
    wallet_uri_base: string;
  }
  interface Flashcard {
    key: string;
    english: string;
    french: string;
    german: string;
    italian: string;
    portuguese: string;
    spanish: string;
  }

  interface Challenge {
    id: string;
    key?: string;
    beginDate: number;
    type: ChallengeType;
    nbDone: number;
    state: "during" | "pending" | "won" | "lost" | "archived";
    solStaked: number;
    friends: string []
  }

  interface LanguageChallenge extends Challenge {
    languageFrom: LanguageType;
    languageTo: LanguageType;
  }

  interface MeditationChallenge extends Challenge {
    duration: number;
  }

  interface CodeChallenge extends Challenge {
    user: string;
    repo: string;
  }

  interface SocialsChallenge extends Challenge {
    user: string;
  }

  type ChallengeType = "Language" | "Meditation" | "Code" | "Socials";
  type LanguageType = "english" | "portuguese" | "french" | "spanish" | "italian" | "german";
}
