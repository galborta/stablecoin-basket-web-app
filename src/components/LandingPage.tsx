import React, { useState, useEffect } from 'react';
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from '../app/client';
import './LandingPage.css'; // Create a CSS file for styling

interface Props {
  onStart: () => void; // Add a prop to handle the start action
}

const LandingPage: React.FC<Props> = ({ onStart }) => {
  const account = useActiveAccount();

  useEffect(() => {
    if (account) {
      onStart();
    }
  }, [account, onStart]);

  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to the Stablecoin Basket Manager</h1>
      </header>
      <main className="landing-content">
        <h2>Why Use a Stablecoin Basket?</h2>
        <p>
          The Stablecoin Basket application allows you to save in assets you believe in. 
          By strategically managing your basket, you can benefit from selling one asset over another, 
          taking advantage of market fluctuations and re-pegging over time.
        </p>
        <h2>Automated Strategies</h2>
        <p>
          Our application provides automated strategies that help you sell one asset over another 
          from your basket. You have the power to decide which assets to include in your basket, 
          tailoring your investment strategy to your preferences.
        </p>
        <h2>Get Started</h2>
        <p>
          Join us today and take control of your investments with the Stablecoin Basket Manager. 
          Start building your basket and watch your savings grow!
        </p>
        <div className="button-container">
          <ConnectButton client={client} />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
