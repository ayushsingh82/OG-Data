// integrating AI inference services from the 0G Compute Network

'use client';

import React, { useState } from 'react';
import { BrowserProvider, ethers } from 'ethers';
import { createZGComputeNetworkBroker } from '@0glabs/0g-serving-broker';

interface Service {
  provider: string;
  serviceType: string;
  url: string;
  inputPrice: bigint;
  outputPrice: bigint;
  updatedAt: bigint;
  model: string;
  verifiability: string;
  description?: string;
}

// Aligning the BrokerInstance with SDK’s actual signatures
interface BrokerInstance {
  ledger: {
    getLedger: () => Promise<{
      user: string;
      availableBalance: bigint;
      totalBalance: bigint;
      inferenceSigner: [bigint, bigint];
      additionalInfo: string;
      inferenceProviders: string[];
      fineTuningProviders: string[];
    }>;
    addLedger: (balance: number, gasPrice?: number) => Promise<void>;
  };
  inference: {
    listService: () => Promise<Service[]>;
    acknowledgeProviderSigner: (provider: string) => Promise<void>;
    getServiceMetadata: (provider: string) => Promise<{ endpoint: string; model: string }>;
    getRequestHeaders: (provider: string, question: string) => Promise<Record<string, string>>;
  };
}

export default function InferenceClient() {
  const [broker, setBroker] = useState<BrokerInstance | null>(null);
  const [balance, setBalance] = useState<string>('');
  const [services, setServices] = useState<Service[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  // Connect wallet and broker
  const connect = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask');
      return;
    }
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Cast to your local BrokerInstance type
    const brokerInstance = (await createZGComputeNetworkBroker(signer)) as unknown as BrokerInstance;
    setBroker(brokerInstance);

    // Check balance
    const account = await brokerInstance.ledger.getLedger();
    setBalance(ethers.formatEther(account.availableBalance));
  };

  // Fund account
  const fund = async () => {
    if (!broker) return;
    await broker.ledger.addLedger(0.1); // pass number instead of bigint
    const account = await broker.ledger.getLedger();
    setBalance(ethers.formatEther(account.availableBalance));
  };

  // Discover services
  const discover = async () => {
    if (!broker) return;
    const servicesList = await broker.inference.listService();
    setServices(servicesList);
  };

  // Ask a question to a service
  const ask = async (service: Service) => {
    if (!broker) return;
    setLoading(true);
    try {
      // Acknowledge provider
      await broker.inference.acknowledgeProviderSigner(service.provider);

      // Get service metadata
      const { endpoint, model } = await broker.inference.getServiceMetadata(service.provider);

      // Generate auth headers
      const headers = await broker.inference.getRequestHeaders(service.provider, question);

      // Send request
      const response = await fetch(`${endpoint}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify({
          messages: [{ role: 'user', content: question }],
          model,
        }),
      });
      const data = await response.json();
      setAnswer(data.choices?.[0]?.message?.content || 'No answer');
    } catch (err) {
      setAnswer('Error: ' + (err as Error).message);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Connection Section */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-4">Connect to 0G Inference Network</h3>
        <div className="space-y-4">
          {!broker ? (
            <button 
              onClick={connect} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="space-y-3">
              <div className="bg-black/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Available Balance:</span>
                  <span className="text-blue-400 font-semibold">{balance} OG</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={fund} 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Fund 0.1 OG
                </button>
                <button 
                  onClick={discover} 
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Discover Services
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Services List */}
      {services.length > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-bold mb-4">Available AI Services</h3>
          <div className="space-y-3">
            {services.map((service) => (
              <div key={service.provider} className="bg-black/50 rounded-lg p-4 border border-gray-700 hover:border-blue-500/50 transition-colors duration-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold text-white">{service.model}</div>
                    <div className="text-sm text-gray-400">{service.provider}</div>
                    {service.description && (
                      <div className="text-sm text-gray-300 mt-1">{service.description}</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Verifiability</div>
                    <div className="text-sm text-green-400">{service.verifiability}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="text-sm text-gray-400">
                    Input: {ethers.formatEther(service.inputPrice)} OG • Output: {ethers.formatEther(service.outputPrice)} OG
                  </div>
                  <button
                    onClick={() => ask(service)}
                    disabled={loading || !question}
                    className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                      loading || !question
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {loading ? 'Processing...' : 'Ask Question'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Question Input */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-4">Ask Your Question</h3>
        <div className="space-y-4">
          <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Enter your question for the AI agent..."
            className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          />
          {loading && (
            <div className="flex items-center gap-2 text-blue-400">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
              <span>Processing your request...</span>
            </div>
          )}
          {answer && (
            <div className="bg-black/50 rounded-lg p-4 border border-green-500/30">
              <div className="text-sm text-green-400 mb-2 font-semibold">AI Response:</div>
              <div className="text-gray-300 whitespace-pre-wrap">{answer}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
