'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContractInteraction from '../components/ContractInteraction';

export default function ContractTesting() {
  const [activeContract, setActiveContract] = useState('zk-queries');

  const contracts = [
    {
      id: 'zk-queries',
      name: 'ZeroKnowledgeQueries',
      address: '0x1234567890123456789012345678901234567890',
      description: 'Privacy-preserving data access with verifiable queries',
      functions: [
        {
          name: 'registerDataAsset',
          description: 'Register a new data asset that can be queried privately',
          inputs: [
            { name: 'name', type: 'string', placeholder: 'Data asset name' },
            { name: 'description', type: 'string', placeholder: 'Description' },
            { name: 'schemaHash', type: 'string', placeholder: 'IPFS hash of schema' },
            { name: 'isPrivate', type: 'bool', placeholder: 'true/false' }
          ]
        },
        {
          name: 'requestZKQuery',
          description: 'Request a zero-knowledge query for a specific data asset',
          inputs: [
            { name: 'dataAssetId', type: 'uint256', placeholder: 'Data asset ID' },
            { name: 'queryHash', type: 'string', placeholder: 'Hash of your query' },
            { name: 'rewardAmount', type: 'uint256', placeholder: 'Reward in OG tokens' },
            { name: 'expirationTime', type: 'uint256', placeholder: 'Expiration timestamp' }
          ]
        }
      ]
    },
    {
      id: 'reputation',
      name: 'ReputationIdentityLayer',
      address: '0x2345678901234567890123456789012345678901',
      description: 'DID + reputation scoring for datasets, agents & contributors',
      functions: [
        {
          name: 'registerDID',
          description: 'Register a new Decentralized Identifier (DID)',
          inputs: [
            { name: 'didDocumentHash', type: 'string', placeholder: 'IPFS hash of DID document' },
            { name: 'didType', type: 'string', placeholder: 'user, dataset, agent, etc.' }
          ]
        },
        {
          name: 'recordReputationEvent',
          description: 'Record a reputation event and update the DID\'s reputation score',
          inputs: [
            { name: 'didId', type: 'uint256', placeholder: 'DID ID' },
            { name: 'reporter', type: 'address', placeholder: 'Reporter address' },
            { name: 'scoreChange', type: 'int256', placeholder: 'Score change (+/-)' },
            { name: 'eventType', type: 'string', placeholder: 'Event type' },
            { name: 'description', type: 'string', placeholder: 'Event description' }
          ]
        }
      ]
    },
    {
      id: 'agents',
      name: 'AutonomousAIAgentsMarketplace',
      address: '0x3456789012345678901234567890123456789012',
      description: 'Self-improving agents that stake & earn in autonomous marketplace',
      functions: [
        {
          name: 'registerAgent',
          description: 'Register a new AI agent in the marketplace',
          inputs: [
            { name: 'name', type: 'string', placeholder: 'Agent name' },
            { name: 'description', type: 'string', placeholder: 'Agent description' },
            { name: 'agentURI', type: 'string', placeholder: 'IPFS hash of agent code' },
            { name: 'initialPrice', type: 'uint256', placeholder: 'Initial price in OG' },
            { name: 'isAutonomous', type: 'bool', placeholder: 'true/false' },
            { name: 'reputationDidId', type: 'uint256', placeholder: 'Reputation DID ID' }
          ]
        },
        {
          name: 'stakeForAgent',
          description: 'Stake OG tokens for an AI agent',
          inputs: [
            { name: 'agentId', type: 'uint256', placeholder: 'Agent ID' },
            { name: 'amount', type: 'uint256', placeholder: 'Amount to stake' },
            { name: 'lockPeriod', type: 'uint256', placeholder: 'Lock period in seconds' }
          ]
        }
      ]
    },
    {
      id: 'composability',
      name: 'AIAgentComposability',
      address: '0x4567890123456789012345678901234567890123',
      description: 'Chain multiple agents into pipelines for complex workflows',
      functions: [
        {
          name: 'createPipeline',
          description: 'Create a new AI agent pipeline',
          inputs: [
            { name: 'name', type: 'string', placeholder: 'Pipeline name' },
            { name: 'description', type: 'string', placeholder: 'Pipeline description' },
            { name: 'steps', type: 'bytes', placeholder: 'Encoded pipeline steps' }
          ]
        },
        {
          name: 'executePipeline',
          description: 'Execute an AI agent pipeline',
          inputs: [
            { name: 'pipelineId', type: 'uint256', placeholder: 'Pipeline ID' },
            { name: 'initialInputHash', type: 'string', placeholder: 'Input data hash' },
            { name: 'expectedCost', type: 'uint256', placeholder: 'Expected cost in OG' }
          ]
        }
      ]
    },
    {
      id: 'daos',
      name: 'DataDAOs',
      address: '0x5678901234567890123456789012345678901234',
      description: 'Community-driven governance for datasets and agents',
      functions: [
        {
          name: 'createDataDAO',
          description: 'Create a new Data DAO',
          inputs: [
            { name: 'name', type: 'string', placeholder: 'DAO name' },
            { name: 'description', type: 'string', placeholder: 'DAO description' },
            { name: 'daoTokenName', type: 'string', placeholder: 'Token name' },
            { name: 'daoTokenSymbol', type: 'string', placeholder: 'Token symbol' },
            { name: 'initialSupply', type: 'uint256', placeholder: 'Initial supply' }
          ]
        },
        {
          name: 'joinDAO',
          description: 'Join an existing Data DAO',
          inputs: [
            { name: 'daoId', type: 'uint256', placeholder: 'DAO ID' }
          ]
        }
      ]
    }
  ];

  const activeContractData = contracts.find(c => c.id === activeContract);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">🔧 Contract Testing Interface</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Test and interact with all Wave 5 smart contracts directly from the UI
            </p>
          </div>

          {/* Contract Selection */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {contracts.map((contract) => (
                <button
                  key={contract.id}
                  onClick={() => setActiveContract(contract.id)}
                  className={`px-6 py-3 rounded-lg transition-colors duration-200 ${
                    activeContract === contract.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {contract.name}
                </button>
              ))}
            </div>
          </div>

          {/* Contract Details */}
          {activeContractData && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-8">
                <h2 className="text-3xl font-bold mb-4">{activeContractData.name}</h2>
                <p className="text-gray-300 text-lg mb-4">{activeContractData.description}</p>
                <div className="text-sm text-gray-400">
                  Contract Address: {activeContractData.address}
                </div>
              </div>

              {/* Contract Functions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {activeContractData.functions.map((func, index) => (
                  <ContractInteraction
                    key={index}
                    contractName={activeContractData.name}
                    contractAddress={activeContractData.address}
                    functionName={func.name}
                    description={func.description}
                    inputs={func.inputs}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Integration Status */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">🔗 Integration Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-black/50 rounded-lg p-6 text-center">
                  <div className="text-3xl mb-2">✅</div>
                  <div className="font-semibold text-green-400">Contracts Deployed</div>
                  <div className="text-sm text-gray-300">All 9 contracts deployed</div>
                </div>
                <div className="bg-black/50 rounded-lg p-6 text-center">
                  <div className="text-3xl mb-2">✅</div>
                  <div className="font-semibold text-green-400">Integration Complete</div>
                  <div className="text-sm text-gray-300">Wave5IntegrationHub active</div>
                </div>
                <div className="bg-black/50 rounded-lg p-6 text-center">
                  <div className="text-3xl mb-2">✅</div>
                  <div className="font-semibold text-green-400">UI Functional</div>
                  <div className="text-sm text-gray-300">All features accessible</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
