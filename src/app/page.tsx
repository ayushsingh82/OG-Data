import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Home() {
  const [activeFeature, setActiveFeature] = useState('wave3');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium mb-6">
                🚀 Wave 3 & 4 Features Live!
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
                Next-Gen{' '}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">AI Data Marketplace</span>
                <br />
                with DAO Governance
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 mb-8">
                Experience the future of AI data trading with version tracking, community curation, 
                NFT tokenization, and decentralized governance powered by 0G Network.
              </p>
              
              {/* Feature Toggle */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveFeature('wave3')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    activeFeature === 'wave3' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Wave 3 Features
                </button>
                <button
                  onClick={() => setActiveFeature('wave4')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    activeFeature === 'wave4' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Wave 4 Features
                </button>
              </div>

              {/* Dynamic Feature Display */}
              {activeFeature === 'wave3' && (
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                    <div className="text-purple-400 font-semibold mb-2">🔄 Version Tracking</div>
                    <div className="text-sm text-gray-300">Continuous updates & rollbacks</div>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                    <div className="text-purple-400 font-semibold mb-2">👥 Community Curation</div>
                    <div className="text-sm text-gray-300">Peer reviews & validation</div>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                    <div className="text-purple-400 font-semibold mb-2">🛡️ Trust Layer</div>
                    <div className="text-sm text-gray-300">Cryptographic verification</div>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                    <div className="text-purple-400 font-semibold mb-2">⚡ Performance</div>
                    <div className="text-sm text-gray-300">Optimized for scale</div>
                  </div>
                </div>
              )}

              {activeFeature === 'wave4' && (
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                    <div className="text-blue-400 font-semibold mb-2">💰 Tokenomics</div>
                    <div className="text-sm text-gray-300">Staking, royalties, slashing</div>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                    <div className="text-blue-400 font-semibold mb-2">🏛️ DAO Governance</div>
                    <div className="text-sm text-gray-300">Community-driven policies</div>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                    <div className="text-blue-400 font-semibold mb-2">🖼️ NFT Trading</div>
                    <div className="text-sm text-gray-300">Secondary markets</div>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                    <div className="text-blue-400 font-semibold mb-2">🌐 Interoperability</div>
                    <div className="text-sm text-gray-300">Cross-protocol bridges</div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center gap-2 transform hover:scale-105">
                  <span>🚀</span>
                  Explore Marketplace
                </button>
                <button className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                  View Smart Contracts
                </button>
              </div>
            </div>

            {/* Right Column - AI Network Visualization */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                {/* AI Network Nodes */}
                <div className="absolute inset-0">
                  {/* Central AI Hub */}
                  <div className="absolute inset-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50">
                    <div className="text-white font-bold text-xl text-center">
                      <div>🤖</div>
                      <div>AI Hub</div>
                      <div>0G Network</div>
                    </div>
                  </div>
                  
                  {/* Floating AI Nodes */}
                  <div className="absolute top-8 left-8 w-16 h-16 bg-green-500/80 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-white text-lg">🧠</span>
                  </div>
                  <div className="absolute top-12 right-12 w-12 h-12 bg-purple-500/80 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
                    <span className="text-white text-sm">📊</span>
                  </div>
                  <div className="absolute bottom-8 left-12 w-14 h-14 bg-orange-500/80 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1s' }}>
                    <span className="text-white text-lg">🔍</span>
                  </div>
                  <div className="absolute bottom-12 right-8 w-10 h-10 bg-red-500/80 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1.5s' }}>
                    <span className="text-white text-sm">⚡</span>
                  </div>
                  
                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
                    <defs>
                      <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6"/>
                        <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3"/>
                      </linearGradient>
                    </defs>
                    <line x1="80" y1="80" x2="240" y2="240" stroke="url(#aiGradient)" strokeWidth="2" className="animate-pulse"/>
                    <line x1="240" y1="80" x2="80" y2="240" stroke="url(#aiGradient)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.5s' }}/>
                    <line x1="160" y1="40" x2="160" y2="280" stroke="url(#aiGradient)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '1s' }}/>
                    <line x1="40" y1="160" x2="280" y2="160" stroke="url(#aiGradient)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '1.5s' }}/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced AI Agent Marketplace Section */}
      <section id="agents" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Next-Gen <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">AI Agent Marketplace</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience AI agents with version tracking, community curation, NFT tokenization, and DAO governance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* DeFi Analysis Bot v2.2 */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 relative">
              <div className="absolute top-4 right-4 flex items-center space-x-2">
                <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs">NFT</span>
                <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">v2.2</span>
              </div>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-2">DeFi Analysis Bot v2.2</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Advanced DeFi protocol analysis with enhanced risk assessment capabilities and community-verified accuracy.
              </p>
              
              {/* Trust Scores */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                <div className="bg-green-900/20 border border-green-500/30 rounded p-2 text-center">
                  <div className="text-green-400 font-semibold">91%</div>
                  <div className="text-gray-400">Trust</div>
                </div>
                <div className="bg-blue-900/20 border border-blue-500/30 rounded p-2 text-center">
                  <div className="text-blue-400 font-semibold">93%</div>
                  <div className="text-gray-400">Verify</div>
                </div>
                <div className="bg-purple-900/20 border border-purple-500/30 rounded p-2 text-center">
                  <div className="text-purple-400 font-semibold">88%</div>
                  <div className="text-gray-400">Community</div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-blue-400 font-semibold">15 OG</span>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 text-sm">✓ Verified</span>
                  <span className="text-purple-400 text-sm">🖼️ #2001</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                <span>💰 4% royalties</span>
                <span>🔒 2,800 OG staked</span>
                <span>🏛️ 127 votes</span>
              </div>
              
              <div className="flex items-center text-blue-400 text-sm">
                <span>Buy Now</span>
                <span className="ml-2">→</span>
              </div>
            </div>

            {/* Medical Research Assistant v1.8 */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105 relative">
              <div className="absolute top-4 right-4 flex items-center space-x-2">
                <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs">NFT</span>
                <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">v1.8</span>
              </div>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🏥</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Medical Research Assistant v1.8</h3>
              <p className="text-gray-300 mb-4 text-sm">
                AI assistant for medical research with improved accuracy, new disease models, and cryptographic verification.
              </p>
              
              {/* Trust Scores */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                <div className="bg-green-900/20 border border-green-500/30 rounded p-2 text-center">
                  <div className="text-green-400 font-semibold">94%</div>
                  <div className="text-gray-400">Trust</div>
                </div>
                <div className="bg-blue-900/20 border border-blue-500/30 rounded p-2 text-center">
                  <div className="text-blue-400 font-semibold">96%</div>
                  <div className="text-gray-400">Verify</div>
                </div>
                <div className="bg-purple-900/20 border border-purple-500/30 rounded p-2 text-center">
                  <div className="text-purple-400 font-semibold">91%</div>
                  <div className="text-gray-400">Community</div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-semibold">22 OG</span>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 text-sm">✓ Verified</span>
                  <span className="text-purple-400 text-sm">🖼️ #2002</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                <span>💰 6% royalties</span>
                <span>🔒 4,200 OG staked</span>
                <span>🏛️ 189 votes</span>
              </div>
              
              <div className="flex items-center text-green-400 text-sm">
                <span>Buy Now</span>
                <span className="ml-2">→</span>
              </div>
            </div>

            {/* Quantum Computing Agent v3.0 */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 relative">
              <div className="absolute top-4 right-4 flex items-center space-x-2">
                <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs">NFT</span>
                <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">v3.0</span>
              </div>
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">⚛️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Quantum Computing Agent v3.0</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Revolutionary quantum computing agent with advanced algorithms and community-governed updates.
              </p>
              
              {/* Trust Scores */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                <div className="bg-green-900/20 border border-green-500/30 rounded p-2 text-center">
                  <div className="text-green-400 font-semibold">97%</div>
                  <div className="text-gray-400">Trust</div>
                </div>
                <div className="bg-blue-900/20 border border-blue-500/30 rounded p-2 text-center">
                  <div className="text-blue-400 font-semibold">98%</div>
                  <div className="text-gray-400">Verify</div>
                </div>
                <div className="bg-purple-900/20 border border-purple-500/30 rounded p-2 text-center">
                  <div className="text-purple-400 font-semibold">95%</div>
                  <div className="text-gray-400">Community</div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-purple-400 font-semibold">45 OG</span>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 text-sm">✓ Verified</span>
                  <span className="text-purple-400 text-sm">🖼️ #2003</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                <span>💰 8% royalties</span>
                <span>🔒 7,500 OG staked</span>
                <span>🏛️ 203 votes</span>
              </div>
              
              <div className="flex items-center text-purple-400 text-sm">
                <span>Buy Now</span>
                <span className="ml-2">→</span>
              </div>
            </div>

            {/* DAO Governance Agent */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105 relative">
              <div className="absolute top-4 right-4 flex items-center space-x-2">
                <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs">DAO</span>
                <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">v1.0</span>
              </div>
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🏛️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">DAO Governance Agent</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Community-driven governance agent for marketplace policies, curation rules, and ecosystem incentives.
              </p>
              
              {/* Governance Features */}
              <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                <div className="bg-orange-900/20 border border-orange-500/30 rounded p-2 text-center">
                  <div className="text-orange-400 font-semibold">Active</div>
                  <div className="text-gray-400">Proposals</div>
                </div>
                <div className="bg-blue-900/20 border border-blue-500/30 rounded p-2 text-center">
                  <div className="text-blue-400 font-semibold">Live</div>
                  <div className="text-gray-400">Voting</div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-orange-400 font-semibold">Free</span>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 text-sm">✓ Verified</span>
                  <span className="text-orange-400 text-sm">🏛️ DAO</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                <span>🗳️ 1,247 voters</span>
                <span>📊 23 proposals</span>
                <span>⚡ Live governance</span>
              </div>
              
              <div className="flex items-center text-orange-400 text-sm">
                <span>Participate</span>
                <span className="ml-2">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Contracts Showcase */}
      <section id="contracts" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Smart Contracts</span> Powering the Future
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              9 new smart contracts implementing Wave 3 & 4 features for a fully decentralized AI marketplace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Wave 3 Contracts */}
            <div className="bg-black/50 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-lg">🔄</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">VersionedAgent.sol</h3>
                  <p className="text-purple-400 text-sm">Version Tracking</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                AI agent version management with update policies, rollback capabilities, and continuous improvement workflows.
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-purple-400">383 lines</span>
                <span className="text-green-400">✓ Deployed</span>
              </div>
            </div>

            <div className="bg-black/50 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-lg">📊</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">VersionedDataset.sol</h3>
                  <p className="text-purple-400 text-sm">Data Versioning</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Dataset version tracking with access control, update policies, and download management.
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-purple-400">488 lines</span>
                <span className="text-green-400">✓ Deployed</span>
              </div>
            </div>

            <div className="bg-black/50 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-lg">👥</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">CommunityCuration.sol</h3>
                  <p className="text-purple-400 text-sm">Community Governance</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Community-driven curation with reviews, ratings, verification, and reputation systems.
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-purple-400">475 lines</span>
                <span className="text-green-400">✓ Deployed</span>
              </div>
            </div>

            <div className="bg-black/50 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-lg">🛡️</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">VerificationTrustLayer.sol</h3>
                  <p className="text-purple-400 text-sm">Cryptographic Verification</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Cryptographic proofs for dataset authenticity and AI agent output verification with trust scoring.
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-purple-400">475 lines</span>
                <span className="text-green-400">✓ Deployed</span>
              </div>
            </div>

            {/* Wave 4 Contracts */}
            <div className="bg-black/50 border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-lg">💰</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">PaymentSettlementLayer.sol</h3>
                  <p className="text-blue-400 text-sm">Native Tokenomics</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Full payment system with staking, licensing, royalties, and slashing mechanisms.
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-400">539 lines</span>
                <span className="text-green-400">✓ Deployed</span>
              </div>
            </div>

            <div className="bg-black/50 border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-lg">🏛️</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">OGDataGovernance.sol</h3>
                  <p className="text-blue-400 text-sm">DAO Governance</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Community-driven governance for marketplace policies, curation rules, and ecosystem incentives.
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-400">421 lines</span>
                <span className="text-green-400">✓ Deployed</span>
              </div>
            </div>

            <div className="bg-black/50 border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-lg">🖼️</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">DatasetAgentNFTs.sol</h3>
                  <p className="text-blue-400 text-sm">NFT Tokenization</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                NFT tokenization for datasets and agents enabling secondary trading and composability.
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-400">464 lines</span>
                <span className="text-green-400">✓ Deployed</span>
              </div>
            </div>

            <div className="bg-black/50 border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-lg">🌐</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">CrossMarketplaceInteroperability.sol</h3>
                  <p className="text-blue-400 text-sm">Cross-Protocol Bridges</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Bridges to external AI/data protocols for expanded reach and liquidity.
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-400">467 lines</span>
                <span className="text-green-400">✓ Deployed</span>
              </div>
            </div>

            <div className="bg-black/50 border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-lg">🛠️</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">DeveloperSDKs.sol</h3>
                  <p className="text-blue-400 text-sm">Developer Tools</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Developer SDKs and APIs for seamless agent onboarding and third-party integrations.
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-400">464 lines</span>
                <span className="text-green-400">✓ Deployed</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-6 inline-block">
              <div className="text-2xl font-bold text-white mb-2">4,645+ Lines of Code</div>
              <div className="text-gray-300">9 Smart Contracts • Wave 3 & 4 Complete • Ready for Deployment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section id="technology" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Powered by <span className="text-blue-500">0G Network Technology</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced storage, AI inference, and blockchain infrastructure for verifiable AI operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💾</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">0G Storage SDK</h3>
              <p className="text-gray-300">Massive data storage with Merkle tree verification and key-value access</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Inference SDK</h3>
              <p className="text-gray-300">Deploy AI agents with TEE verification and cost optimization</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">0G Network</h3>
              <p className="text-gray-300">High-performance blockchain for AI operations and data trading</p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Storage Section */}
      <section id="storage" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Massive <span className="text-blue-500">Data Storage</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Store, retrieve, and manage massive datasets using 0G Storage SDK
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">File Storage</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Merkle tree verification for data integrity</li>
                <li>• Scalable storage for massive datasets</li>
                <li>• Efficient upload/download operations</li>
                <li>• Stream processing capabilities</li>
              </ul>
            </div>
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Key-Value Storage</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Fast access to structured data</li>
                <li>• Batch operations for efficiency</li>
                <li>• Real-time data streaming</li>
                <li>• Optimized for AI applications</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section id="stats" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Platform Statistics</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Growing ecosystem with Wave 3 & 4 features driving adoption and innovation
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">1,500+</div>
              <p className="text-gray-300">Active Users</p>
              <p className="text-xs text-gray-500 mt-1">+200% growth</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500 mb-2">2,400+</div>
              <p className="text-gray-300">AI Agents Available</p>
              <p className="text-xs text-gray-500 mt-1">Version tracked</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-500 mb-2">150+</div>
              <p className="text-gray-300">Verified Datasets</p>
              <p className="text-xs text-gray-500 mt-1">Community curated</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">$5.2M+</div>
              <p className="text-gray-300">OG Tokens Traded</p>
              <p className="text-xs text-gray-500 mt-1">+108% increase</p>
            </div>
          </div>

          {/* Wave 3 & 4 Specific Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-purple-900/20 to-purple-800/20 border border-purple-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">9</div>
              <p className="text-gray-300 font-semibold">Smart Contracts</p>
              <p className="text-xs text-gray-400 mt-1">Wave 3 & 4 deployed</p>
            </div>
            <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 border border-blue-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">4,645+</div>
              <p className="text-gray-300 font-semibold">Lines of Code</p>
              <p className="text-xs text-gray-400 mt-1">Production ready</p>
            </div>
            <div className="bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
              <p className="text-gray-300 font-semibold">Trust Score</p>
              <p className="text-xs text-gray-400 mt-1">Average verification</p>
            </div>
            <div className="bg-gradient-to-r from-orange-900/20 to-orange-800/20 border border-orange-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">1,247</div>
              <p className="text-gray-300 font-semibold">DAO Voters</p>
              <p className="text-xs text-gray-400 mt-1">Active governance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section id="get-started" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Experience <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Next-Gen AI Trading</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the future of AI data marketplace with version tracking, community curation, NFT tokenization, and DAO governance
          </p>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-black/30 border border-purple-500/30 rounded-lg p-4">
              <div className="text-purple-400 font-semibold mb-1">🔄 Version Control</div>
              <div className="text-xs text-gray-400">Track updates</div>
            </div>
            <div className="bg-black/30 border border-blue-500/30 rounded-lg p-4">
              <div className="text-blue-400 font-semibold mb-1">👥 Community</div>
              <div className="text-xs text-gray-400">Peer reviews</div>
            </div>
            <div className="bg-black/30 border border-green-500/30 rounded-lg p-4">
              <div className="text-green-400 font-semibold mb-1">🖼️ NFT Trading</div>
              <div className="text-xs text-gray-400">Secondary markets</div>
            </div>
            <div className="bg-black/30 border border-orange-500/30 rounded-lg p-4">
              <div className="text-orange-400 font-semibold mb-1">🏛️ DAO Governance</div>
              <div className="text-xs text-gray-400">Community voting</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105">
              Explore Marketplace
            </button>
            <button className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
              View Smart Contracts
            </button>
            <button className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
              Join DAO Governance
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
