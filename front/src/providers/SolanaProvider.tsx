import React, { createContext, useContext, useState, useEffect } from 'react';
import { Connection, clusterApiUrl, Keypair } from '@solana/web3.js';
import { getEncryptedValueFor } from '../lib/secure-store/secureStore';

type ConnexionState= "connected" | "connecting" | "disconnected" | undefined

type SolanaContextType = {
    connection: Connection;
    solanaCreds: Creds | undefined;
    setSolanaCreds: React.Dispatch<React.SetStateAction<Creds | undefined>>;
    connexionState: ConnexionState
    setConnexionState: React.Dispatch<React.SetStateAction<ConnexionState>>
};

const SolanaContext = createContext<SolanaContextType | null>(null);

export const SolanaProvider = ({ children }: { children: React.ReactNode }) => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
    const [solanaCreds, setSolanaCreds] = useState<Creds>();
    const [connexionState, setConnexionState] = useState<ConnexionState>()

    async function getCreds() {
        if (solanaCreds) return solanaCreds;
        else {
          let solCreds = (await getEncryptedValueFor("sol-creds")) as Creds;
          setSolanaCreds(solCreds);
          setConnexionState(solCreds ? "connected": "disconnected")
          return solCreds;
        }
      }
    useEffect(() => {
        getCreds()
    }, []);

    return (
        <SolanaContext.Provider value={{ connection, solanaCreds, setSolanaCreds, connexionState, setConnexionState  }}>
            {children}
        </SolanaContext.Provider>
    );
};

export const useSolana = () => {
    const context = useContext(SolanaContext);
    if (context === null) {
        throw new Error('useSolana must be used within a SolanaProvider');
    }
    return context;
};
