import React, { useState } from 'react';
import { useActiveAccount, useWalletBalance, useDisconnect, useActiveWallet } from "thirdweb/react";
import { client } from '../app/client';
import './WalletInfo.css';

interface WalletInfoProps {
  onDisconnect: () => void;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ onDisconnect }) => {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: "ethereum", // Replace with the appropriate chain
    address: account?.address,
  });
  const [isOpen, setIsOpen] = useState(false);
  const { disconnect } = useDisconnect();

  if (!account) {
    return null;
  }

  const handleDisconnect = () => {
    disconnect(wallet);
    onDisconnect();
  };

  return (
    <div className={`wallet-info ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="wallet-summary">
        <img src="https://via.placeholder.com/24" alt="Wallet Icon" />
        <span>{account.address}</span>
      </div>
      {isOpen && (
        <div className="wallet-details">
          <p>Wallet address: {account.address}</p>
          <p>
            Wallet balance: {isLoading ? "Loading..." : `${balance?.displayValue || 0} ${balance?.symbol || ''}`}
          </p>
          <button className="disconnect-button" onClick={handleDisconnect}>
            <img src="https://via.placeholder.com/24" alt="Disconnect Icon" />
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletInfo;
