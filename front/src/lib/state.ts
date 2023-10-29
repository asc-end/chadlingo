import { create } from "zustand";
// let Flow : "connectWallet"
//   | "beginChallenge_welcome"
//   | "beginChallenge_language1"
//   | "beginChallenge_language2"
//   | "beginChallenge_stake"
//   | "home"
//   | "play"
//   | "finishedChallenge"

type Store = {
  challenge: Challenge | null;
  setChallenge: (_challenge: Challenge) => void;
  solanaCreds: Creds | null;
  setSolanaCreds: (newCreds: Creds) => void;
  flow:
    | null
    | "connectWallet"
    | "beginChallenge"
    | "beginChallenge_welcome"
    | "beginChallenge_language1"
    | "beginChallenge_language2"
    | "beginChallenge_stake"
    | "home"
    | "play"
    | "play_sign"
    | "finishedChallenge_lose"
    | "finishedChallenge_win";
  updateFlow: (
    newData:
      | null
      | "connectWallet"
      | "beginChallenge"
      | "beginChallenge_welcome"
      | "beginChallenge_language1"
      | "beginChallenge_language2"
      | "beginChallenge_stake"
      | "home"
      | "play"
      | "play_sign"
      | "finishedChallenge_lose"
      | "finishedChallenge_win"
  ) => void;
};

const useStore = create<Store>()((set) => ({
  challenge: null,
  setChallenge: (_challenge: Challenge) => set({ challenge: _challenge }),
  solanaCreds: null,
  setSolanaCreds: (newCreds: Creds) => set({ solanaCreds: newCreds }),
  flow: null,
  updateFlow: (
    newData:
      | null
      | "connectWallet"
      | "beginChallenge"
      | "beginChallenge_welcome"
      | "beginChallenge_language1"
      | "beginChallenge_language2"
      | "beginChallenge_stake"
      | "home"
      | "play"
      | "play_sign"
      | "finishedChallenge_lose"
      | "finishedChallenge_win"
  ) => set({ flow: newData }),
}));

export default useStore;