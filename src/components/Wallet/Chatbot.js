import React, { useState, useEffect } from 'react';
import './Chatbot.css';
import { AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk';

const Chatbot = ({ closeChatbot, instance, address }) => {
  const [botMessages, setBotMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    // Display initial greeting
    setBotMessages((prevMessages) => [
      ...prevMessages,
      { id: 'bot', text: 'Hi user! What would you like to do? Type "send money" or "get balance".' },
    ]);
  }, []);

  const handleSend = () => {
    setBotMessages((prevMessages) => [
      ...prevMessages,
      { id: 'user', text: userInput },
    ]);

    if (userInput.toLowerCase() === 'send money') {
      setBotMessages((prevMessages) => [
        ...prevMessages,
        { id: 'bot', text: 'Please enter the recipient\'s public key:' },
      ]);
    } else if (userInput.toLowerCase() === 'get balance') {
      getBalance();
    }

    setUserInput('');
  };

  const getBalance = async () => {
    try {
      const balance = await instance.getBalance(address, { format: AE_AMOUNT_FORMATS.AE });
      console.log("balance", balance);
      setBotMessages((prevMessages) => [
        ...prevMessages,
        { id: 'bot', text: `Your current balance is ${balance}` },
        { id: 'bot', text: 'Type "chat again" to start a new conversation.' },
      ]);
    } catch (error) {
      setBotMessages((prevMessages) => [
        ...prevMessages,
        { id: 'bot', text: `Failed to retrieve balance: ${error.message}` },
        { id: 'bot', text: 'Type "chat again" to start a new conversation.' },
      ]);
    }
  };

  const startChatAgain = () => {
    setBotMessages([]);
    setUserInput('');
  };

  return (
    // <div className='fixed bottom-4 right-4 w-80 h-96 bg-white border border-gray-300 rounded-md shadow-md overflow-hidden chatbot'>
		<div> 
      {/* <div className='flex justify-between items-center p-4 border-b border-gray-300 bg-gray-100'> */}
			<div>
        <h2 className='text-lg font-bold'>Chatbot</h2>
        <button onClick={closeChatbot} className='focus:outline-none'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 text-gray-600'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M13.414 12l3.293 3.293a1 1 0 01-1.414 1.414L12 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L10.586 12 7.293 8.707a1 1 0 011.414-1.414L12 10.586l3.293-3.293a1 1 0 111.414 1.414L13.414 12z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>

      {/* <div className='overflow-y-auto p-4 h-64 chatbot-messages'> */}
			<div>
        {botMessages.map((message, index) => (
          <div key={index} className={`message ${message.id === 'bot' ? 'bg-gray-200' : 'bg-blue-200'} p-2 rounded-md mb-2`}>
            {message.text}
          </div>
        ))}
      </div>

      {/* <div className='p-4 border-t border-gray-300 bg-gray-100'> */}
			<div>
        <div className='flex gap-2'>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded-md'
            onClick={() => handleSend('Send Money')}
          >
            Send Money
          </button>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded-md'
            onClick={() => handleSend('Get Balance')}
          >
            Get Balance
          </button>
        </div>

        {/* <div className='flex justify-center mt-4'>
				 */}
				 <div>
          <button
            onClick={startChatAgain}
            className='px-4 py-2 bg-green-500 text-white rounded-md'
            style={{ display: botMessages.length > 0 ? 'block' : 'none' }}
          >
            Start Chat Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
