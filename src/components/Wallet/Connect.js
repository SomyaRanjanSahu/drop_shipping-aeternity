import React, { useState, useEffect } from 'react';
import { AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk';
import useAeternitySDK from '../../hooks/useAeternitySDK';
import Spends from './Spendsample';
import './chatbotbutton.css'; // Ensure you have appropriate styles for the chatbot button
import Chatbot from './ChatbotSample';

const Connect = () => {
  const { aeSdk, connectToWallet, address, networkId, getBalance } = useAeternitySDK();
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
	
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balance = await aeSdk.getBalance(address, { format: AE_AMOUNT_FORMATS.AE });
        setBalance(balance);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (address) {
      fetchBalance();
    }
  }, [aeSdk,address, getBalance]);
	const fetchBalance = async () => {
		try {
			const balance = await aeSdk.getBalance(address, { format: AE_AMOUNT_FORMATS.AE });
			setBalance(balance);
		} catch (error) {
			console.error(error.message);
		}
	};

  const handleConnectClick = async () => {
    setIsLoading(true);
    try {
      await connectToWallet();
      console.log(aeSdk);
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const closeChatbot = () => {
    setShowChatbot(false);
  };

  return (
    <div className="container mx-auto mt-8 relative">
      {address ? (
        <React.Fragment>
          <p className="text-lg font-semibold mb-4">
            Connected to wallet on network "{networkId}". Address: {address}
          </p>
          <p className="text-lg mb-4">Balance: {balance}</p>

          <Spends instance={aeSdk} onPaymentSuccess={fetchBalance} />

          <button
            className="chatbot-button"
            onClick={toggleChatbot}
          >
            Chatbot
          </button>
           {/* <Chatbot closeChatbot={closeChatbot} instance={aeSdk} address={address} /> */}
         
         
          {showChatbot && <Chatbot closeChatbot={closeChatbot} instance={aeSdk} address={address} />}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleConnectClick}
            disabled={isLoading}
          >
            {isLoading ? 'Connecting...' : 'Connect to Wallet'}
          </button>
          {isLoading && <p className="mt-4">Connecting...</p>}
        </React.Fragment>
      )}
    </div>
  );
};

export default Connect ;
