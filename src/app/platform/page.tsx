'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Wave5Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '🔮' },
    { id: 'zk-queries', name: 'ZK Queries', icon: '🔐' },
    { id: 'reputation', name: 'Reputation', icon: '🆔' },
    { id: 'agents', name: 'AI Agents', icon: '🤖' },
    { id: 'composability', name: 'Composability', icon: '🔗' },
    { id: 'daos', name: 'Data DAOs', icon: '🏛️' },
    { id: 'enterprise', name: 'Enterprise', icon: '🏢' },
    { id: 'compute', name: 'Compute', icon: '🧠' },
    { id: 'prediction', name: 'Prediction', icon: '📊' },
    { id: 'pricing', name: 'Pricing', icon: '💰' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-4">🔮 Wave 5 Dashboard</h2>
              <p className="text-gray-300 text-lg mb-6">
                Welcome to the fully decentralized, self-sustaining economy with advanced AI capabilities, 
                privacy features, and enterprise-grade compliance.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black/50 rounded-lg p-6">
                  <div className="text-2xl font-bold text-blue-400 mb-2">9</div>
                  <div className="text-gray-300">Smart Contracts</div>
                </div>
                <div className="bg-black/50 rounded-lg p-6">
                  <div className="text-2xl font-bold text-green-400 mb-2">6,400+</div>
                  <div className="text-gray-300">Lines of Code</div>
                </div>
                <div className="bg-black/50 rounded-lg p-6">
                  <div className="text-2xl font-bold text-purple-400 mb-2">100%</div>
                  <div className="text-gray-300">Integration Complete</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">🚀 Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors duration-200">
                    Create ZK Query
                  </button>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors duration-200">
                    Register AI Agent
                  </button>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-colors duration-200">
                    Join Data DAO
                  </button>
                </div>
              </div>

              <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">📊 System Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">ZK Verifier</span>
                    <span className="text-green-400">✅ Online</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Reputation System</span>
                    <span className="text-green-400">✅ Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Agent Marketplace</span>
                    <span className="text-green-400">✅ Running</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">DAO Governance</span>
                    <span className="text-green-400">✅ Operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'zk-queries':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-4">🔐 Zero-Knowledge Queries</h2>
              <p className="text-gray-300 text-lg mb-6">
                Privacy-preserving data access with verifiable queries using Zero-Knowledge Proofs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Create ZK Query</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Data Asset ID</label>
                    <input 
                      type="number" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      placeholder="Enter data asset ID"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Query Hash</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      placeholder="Hash of your query"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Reward Amount (OG)</label>
                    <input 
                      type="number" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      placeholder="Amount in OG tokens"
                    />
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors duration-200">
                    Submit ZK Query
                  </button>
                </div>
              </div>

              <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Active ZK Queries</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">Query #1234</span>
                      <span className="text-green-400 text-sm">Active</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      <div>Data Asset: Financial Dataset</div>
                      <div>Reward: 50 OG</div>
                      <div>Expires: 2 hours</div>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">Query #1235</span>
                      <span className="text-yellow-400 text-sm">Pending</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      <div>Data Asset: Medical Records</div>
                      <div>Reward: 100 OG</div>
                      <div>Expires: 5 hours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'reputation':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-4">🆔 Reputation & Identity Layer</h2>
              <p className="text-gray-300 text-lg mb-6">
                DID + reputation scoring for datasets, agents & contributors
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Register DID</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">DID Document Hash</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      placeholder="IPFS hash or URL"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">DID Type</label>
                    <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white">
                      <option>user</option>
                      <option>dataset</option>
                      <option>agent</option>
                      <option>contributor</option>
                      <option>organization</option>
                    </select>
                  </div>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors duration-200">
                    Register DID
                  </button>
                </div>
              </div>

              <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Your Reputation</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">850</div>
                    <div className="text-gray-300">Reputation Score</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Positive Events</span>
                      <span className="text-green-400">45</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Negative Events</span>
                      <span className="text-red-400">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Verification Status</span>
                      <span className="text-green-400">✅ Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'agents':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-4">🤖 Autonomous AI Agents Marketplace</h2>
              <p className="text-gray-300 text-lg mb-6">
                Self-improving agents that stake & earn in autonomous marketplace
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Register AI Agent</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Agent Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      placeholder="Enter agent name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Description</label>
                    <textarea 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white h-20"
                      placeholder="Describe your agent"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Agent URI</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      placeholder="IPFS hash or URL"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Initial Price (OG)</label>
                    <input 
                      type="number" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      placeholder="Price in OG tokens"
                    />
                  </div>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-colors duration-200">
                    Register Agent
                  </button>
                </div>
              </div>

              <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Available Agents</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">Data Analysis Pro</span>
                      <span className="text-green-400 text-sm">500 OG</span>
                    </div>
                    <div className="text-sm text-gray-300 mb-2">
                      Advanced data analysis with ML capabilities
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-400">Reputation: 850</span>
                      <span className="text-green-400">✓ Verified</span>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">Content Creator AI</span>
                      <span className="text-green-400 text-sm">300 OG</span>
                    </div>
                    <div className="text-sm text-gray-300 mb-2">
                      Intelligent content generation for marketing
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-400">Reputation: 720</span>
                      <span className="text-green-400">✓ Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'composability':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-4">🔗 AI Agent Composability</h2>
              <p className="text-gray-300 text-lg mb-6">
                Chain multiple agents into pipelines for complex data processing workflows
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Create Pipeline</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Pipeline Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      placeholder="Enter pipeline name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Description</label>
                    <textarea 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white h-20"
                      placeholder="Describe your pipeline"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Agent IDs (comma-separated)</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      placeholder="1,2,3"
                    />
                  </div>
                  <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-3 rounded-lg transition-colors duration-200">
                    Create Pipeline
                  </button>
                </div>
              </div>

              <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Pipeline Templates</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="font-semibold mb-2">Data Processing Pipeline</div>
                    <div className="text-sm text-gray-300 mb-2">
                      Data Analysis → Content Generation → Quality Check
                    </div>
                    <div className="text-xs text-cyan-400">3 agents • 150 OG</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="font-semibold mb-2">Research Pipeline</div>
                    <div className="text-sm text-gray-300 mb-2">
                      Data Collection → Analysis → Report Generation
                    </div>
                    <div className="text-xs text-cyan-400">4 agents • 200 OG</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'daos':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-4">🏛️ Data DAOs</h2>
              <p className="text-gray-300 text-lg mb-6">
                Community-driven governance for datasets and agents with DAO voting systems
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Create Data DAO</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">DAO Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      placeholder="Enter DAO name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Description</label>
                    <textarea 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white h-20"
                      placeholder="Describe your DAO"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Token Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      placeholder="DAO token name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Initial Supply</label>
                    <input 
                      type="number" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      placeholder="Initial token supply"
                    />
                  </div>
                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg transition-colors duration-200">
                    Create DAO
                  </button>
                </div>
              </div>

              <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Available DAOs</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">Financial Data DAO</span>
                      <span className="text-green-400 text-sm">Active</span>
                    </div>
                    <div className="text-sm text-gray-300 mb-2">
                      Community governance for financial datasets
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-orange-400">Members: 45</span>
                      <span className="text-blue-400">Assets: 12</span>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">Medical Research DAO</span>
                      <span className="text-green-400 text-sm">Active</span>
                    </div>
                    <div className="text-sm text-gray-300 mb-2">
                      Governance for medical research datasets
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-orange-400">Members: 32</span>
                      <span className="text-blue-400">Assets: 8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-2xl font-bold mb-4">Feature Coming Soon</h2>
            <p className="text-gray-300">
              This feature is under development and will be available soon.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </div>

      <Footer />
    </div>
  );
}
