'use client';

import React, { useState } from 'react';
import { useAccount, useContractWrite, useContractRead } from 'wagmi';

// Contract ABIs would be imported here in a real implementation
// For now, we'll use placeholder interfaces

interface ContractInteractionProps {
  contractName: string;
  contractAddress: string;
  functionName: string;
  description: string;
  inputs: Array<{
    name: string;
    type: string;
    placeholder: string;
  }>;
}

const ContractInteraction: React.FC<ContractInteractionProps> = ({
  contractName,
  contractAddress,
  functionName,
  description,
  inputs
}) => {
  const { address, isConnected } = useAccount();
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setInputValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, this would call the actual contract
      console.log('Calling contract function:', {
        contract: contractName,
        function: functionName,
        inputs: inputValues
      });
      
      // Simulate contract call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Transaction submitted successfully!');
    } catch (error) {
      console.error('Contract call failed:', error);
      alert('Transaction failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">{contractName}</h3>
        <p className="text-gray-300 text-sm mb-4">{description}</p>
        <div className="text-xs text-gray-400 mb-4">
          Contract: {contractAddress}
        </div>
      </div>

      <div className="space-y-4">
        {inputs.map((input) => (
          <div key={input.name}>
            <label className="block text-gray-300 mb-2">
              {input.name} ({input.type})
            </label>
            <input
              type={input.type === 'uint256' ? 'number' : 'text'}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              placeholder={input.placeholder}
              value={inputValues[input.name] || ''}
              onChange={(e) => handleInputChange(input.name, e.target.value)}
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={isLoading || !isConnected}
          className={`w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
            isLoading || !isConnected
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isLoading ? 'Processing...' : `Call ${functionName}`}
        </button>

        {!isConnected && (
          <div className="text-center text-yellow-400 text-sm mt-2">
            Please connect your wallet to interact with contracts
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractInteraction;
