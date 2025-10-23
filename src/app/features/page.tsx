'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Wave5Features() {
  const [activeFeature, setActiveFeature] = useState('overview');

  const features = [
    {
      id: 'overview',
      name: 'Overview',
      icon: '🔮',
      title: 'Wave 5 Complete Implementation',
      description: 'Fully decentralized, self-sustaining economy with advanced AI capabilities',
      details: [
        '9 Smart Contracts deployed and integrated',
        '6,400+ lines of production-ready code',
        'Complete privacy-preserving data access',
        'Autonomous AI agent marketplace',
        'Community-driven governance through DAOs',
        'Enterprise-grade compliance frameworks',
        'Decentralized ML training infrastructure',
        'Prediction markets for data quality',
        'Dynamic pricing with staking rewards'
      ],
      status: '✅ Complete',
      color: 'purple'
    },
    {
      id: 'zk-queries',
      name: 'Zero-Knowledge Queries',
      icon: '🔐',
      title: 'Privacy-Preserving Data Access',
      description: 'Verifiable queries using Zero-Knowledge Proofs for complete privacy',
      details: [
        'ZK proof verification system',
        'Privacy-preserving data queries',
        'Query cost management and rewards',
        'Dataset access permissions',
        'Cryptographic verification',
        'Secure data asset registration'
      ],
      status: '✅ Deployed',
      color: 'blue'
    },
    {
      id: 'reputation',
      name: 'Reputation & Identity',
      icon: '🆔',
      title: 'DID + Reputation Scoring',
      description: 'Decentralized identity management with reputation scoring for all entities',
      details: [
        'Decentralized Identifier (DID) system',
        'Multi-category reputation tracking',
        'Attestation and trust relationships',
        'Identity verification system',
        'Reputation event recording',
        'Cross-platform reputation portability'
      ],
      status: '✅ Deployed',
      color: 'green'
    },
    {
      id: 'agents',
      name: 'Autonomous AI Agents',
      icon: '🤖',
      title: 'Self-Improving Agent Marketplace',
      description: 'Autonomous AI agents that stake, earn, and self-improve through marketplace interactions',
      details: [
        'Autonomous agent registration',
        'Self-improvement mechanisms',
        'Staking and earning systems',
        'Task assignment and execution',
        'Agent capability enhancement',
        'Marketplace-driven evolution'
      ],
      status: '✅ Deployed',
      color: 'purple'
    },
    {
      id: 'composability',
      name: 'Agent Composability',
      icon: '🔗',
      title: 'AI Agent Pipelines',
      description: 'Chain multiple agents into pipelines for complex data processing workflows',
      details: [
        'Agent pipeline creation',
        'Compatibility checking',
        'Role-based agent management',
        'Data transformation between agents',
        'Pipeline templates and execution',
        'Cost optimization'
      ],
      status: '✅ Deployed',
      color: 'cyan'
    },
    {
      id: 'daos',
      name: 'Data DAOs',
      icon: '🏛️',
      title: 'Community Governance',
      description: 'Community-driven governance for datasets and agents with DAO voting systems',
      details: [
        'DAO creation and management',
        'Community voting systems',
        'Dataset and agent curation',
        'Revenue sharing mechanisms',
        'Treasury management',
        'Governance token distribution'
      ],
      status: '✅ Deployed',
      color: 'orange'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Integration',
      icon: '🏢',
      title: 'Enterprise APIs & Compliance',
      description: 'Enterprise-grade APIs and compliance frameworks for large-scale adoption',
      details: [
        'Enterprise client registration',
        'Compliance framework management',
        'SLA (Service Level Agreement) system',
        'API key management',
        'Audit logging and tracking',
        'Enterprise data contracts'
      ],
      status: '✅ Deployed',
      color: 'indigo'
    },
    {
      id: 'compute',
      name: 'On-chain Compute',
      icon: '🧠',
      title: 'Decentralized ML Training',
      description: 'Secure ML model training on decentralized infrastructure with federated learning',
      details: [
        'Compute node registration',
        'Federated learning sessions',
        'Model creation and improvement',
        'Secure computation verification',
        'Distributed training coordination',
        'Model versioning and updates'
      ],
      status: '✅ Deployed',
      color: 'pink'
    },
    {
      id: 'prediction',
      name: 'Prediction Markets',
      icon: '📊',
      title: 'Data Quality Prediction',
      description: 'Prediction markets to incentivize verifiable predictions and boost data quality',
      details: [
        'Prediction market creation',
        'Oracle registration and verification',
        'Data quality prediction system',
        'Incentive mechanisms',
        'Verification and validation',
        'Market resolution and payouts'
      ],
      status: '✅ Deployed',
      color: 'yellow'
    },
    {
      id: 'pricing',
      name: 'Dynamic Pricing',
      icon: '💰',
      title: 'Market-Driven Pricing',
      description: 'Dynamic pricing with staking rewards, lending, leasing, and auction systems',
      details: [
        'Dynamic pricing algorithms',
        'Staking rewards system',
        'Lending and leasing mechanisms',
        'Auction systems',
        'Yield generation',
        'Market-driven price discovery'
      ],
      status: '✅ Deployed',
      color: 'emerald'
    }
  ];

  const activeFeatureData = features.find(f => f.id === activeFeature);

  const getColorClasses = (color: string) => {
    const colorMap = {
      purple: 'from-purple-900/20 to-purple-800/20 border-purple-500/30 text-purple-400',
      blue: 'from-blue-900/20 to-blue-800/20 border-blue-500/30 text-blue-400',
      green: 'from-green-900/20 to-green-800/20 border-green-500/30 text-green-400',
      cyan: 'from-cyan-900/20 to-cyan-800/20 border-cyan-500/30 text-cyan-400',
      orange: 'from-orange-900/20 to-orange-800/20 border-orange-500/30 text-orange-400',
      indigo: 'from-indigo-900/20 to-indigo-800/20 border-indigo-500/30 text-indigo-400',
      pink: 'from-pink-900/20 to-pink-800/20 border-pink-500/30 text-pink-400',
      yellow: 'from-yellow-900/20 to-yellow-800/20 border-yellow-500/30 text-yellow-400',
      emerald: 'from-emerald-900/20 to-emerald-800/20 border-emerald-500/30 text-emerald-400'
    };
    return colorMap[color] || colorMap.purple;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              🔮 <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Wave 5 Features</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Fully decentralized, self-sustaining economy with advanced AI capabilities, privacy features, and enterprise-grade compliance
            </p>
          </div>

          {/* Feature Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    activeFeature === feature.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-2">{feature.icon}</span>
                  {feature.name}
                </button>
              ))}
            </div>
          </div>

          {/* Feature Details */}
          {activeFeatureData && (
            <div className="space-y-8">
              <div className={`bg-gradient-to-r ${getColorClasses(activeFeatureData.color)} rounded-xl p-8`}>
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{activeFeatureData.icon}</span>
                  <div>
                    <h2 className="text-3xl font-bold">{activeFeatureData.title}</h2>
                    <div className="text-sm opacity-75">{activeFeatureData.status}</div>
                  </div>
                </div>
                <p className="text-gray-300 text-lg mb-6">{activeFeatureData.description}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {activeFeatureData.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-400 mr-3 mt-1">✓</span>
                        <span className="text-gray-300">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link 
                      href="/wave5" 
                      className="block w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 text-center"
                    >
                      Open Dashboard
                    </Link>
                    <Link 
                      href="/contract-testing" 
                      className="block w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 text-center"
                    >
                      Test Contracts
                    </Link>
                    <button className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors duration-200">
                      View Documentation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Integration Status */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">🚀 Integration Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black/50 rounded-lg p-6 text-center">
                  <div className="text-3xl mb-2">✅</div>
                  <div className="font-semibold text-green-400">Smart Contracts</div>
                  <div className="text-sm text-gray-300">9 contracts deployed</div>
                </div>
                <div className="bg-black/50 rounded-lg p-6 text-center">
                  <div className="text-3xl mb-2">✅</div>
                  <div className="font-semibold text-green-400">Integration Hub</div>
                  <div className="text-sm text-gray-300">All features connected</div>
                </div>
                <div className="bg-black/50 rounded-lg p-6 text-center">
                  <div className="text-3xl mb-2">✅</div>
                  <div className="font-semibold text-green-400">UI Interface</div>
                  <div className="text-sm text-gray-300">Fully functional</div>
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