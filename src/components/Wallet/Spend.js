import React, { useState } from 'react';

const Spend = ({ instance }) => {
  const [spendTo, setSpendTo] = useState('');
  const [spendAmount, setSpendAmount] = useState('');
  const [spendPayload, setSpendPayload] = useState('');
  const [spendPromise, setSpendPromise] = useState(null);

  const handleSpendClick = async () => {
    try {
      const result = await instance.spend(spendAmount, spendTo);
      setSpendPromise(result.hash);
      console.log(result.hash);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Recipient address</label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={spendTo}
          onChange={(e) => setSpendTo(e.target.value)}
          placeholder="ak_..."
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Coins amount</label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={spendAmount}
          onChange={(e) => setSpendAmount(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Payload</label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={spendPayload}
          onChange={(e) => setSpendPayload(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleSpendClick}
      >
        Spend
      </button>
      {spendPromise && (
        <div className="mt-4">
          <div className="font-bold text-lg mb-2">Spend result</div>
          <p className="text-gray-700">{spendPromise}</p>
        </div>
      )}
    </div>
  );
};

export default Spend;
