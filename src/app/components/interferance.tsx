// integrating AI inference services from the 0G Compute Network

'use client';

import React, { useState } from 'react';
import { BrowserProvider, ethers } from 'ethers';
import { createZGComputeNetworkBroker } from '@0glabs/0g-serving-broker';

export default function InferenceClient() {
  const [broker, setBroker] = useState<any>(null);
  const [balance, setBalance] = useState<string>('');
  const [services, setServices] = useState<any[]>([]);
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
    const brokerInstance = await createZGComputeNetworkBroker(signer);
    setBroker(brokerInstance);

    // Check balance
    const account = await brokerInstance.ledger.getLedger();
    setBalance(ethers.formatEther(account.balance));
  };

  // Fund account
  const fund = async () => {
    if (!broker) return;
    await broker.ledger.addLedger(ethers.parseEther('0.1'));
    const account = await broker.ledger.getLedger();
    setBalance(ethers.formatEther(account.balance));
  };

  // Discover services
  const discover = async () => {
    if (!broker) return;
    const servicesList = await broker.inference.listService();
    setServices(servicesList);
  };

  // Ask a question to a service
  const ask = async (service: any) => {
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
    <div className="p-4 bg-black text-white rounded-lg">
      <button onClick={connect} className="bg-blue-600 px-4 py-2 rounded">Connect Wallet</button>
      {broker && (
        <>
          <div className="mt-2">Balance: {balance} OG</div>
          <button onClick={fund} className="bg-green-600 px-4 py-2 rounded mt-2">Fund 0.1 OG</button>
          <button onClick={discover} className="bg-purple-600 px-4 py-2 rounded mt-2">Discover Services</button>
        </>
      )}
      {services.length > 0 && (
        <div className="mt-4">
          <h3>Available Services:</h3>
          <ul>
            {services.map((service) => (
              <li key={service.provider} className="mb-2">
                <div>
                  <b>{service.model}</b> ({service.provider})<br />
                  {service.description || ''}<br />
                  <button
                    onClick={() => ask(service)}
                    className="bg-blue-500 px-2 py-1 rounded mt-1"
                  >
                    Ask
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-4">
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          className="text-black px-2 py-1 rounded"
        />
      </div>
      {loading && <div>Loading...</div>}
      {answer && <div className="mt-4 bg-gray-800 p-2 rounded">Answer: {answer}</div>}
    </div>
  );
}