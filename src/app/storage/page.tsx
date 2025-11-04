'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StorageClient from '../components/storage';

// Dynamically import components that use 0g-serving-broker with SSR disabled
const InferenceClient = dynamic(() => import('../components/interferance'), {
  ssr: false,
  loading: () => <div className="text-center py-8 text-gray-400">Loading inference client...</div>
});

const FineTuningClient = dynamic(() => import('../components/finetuning'), {
  ssr: false,
  loading: () => <div className="text-center py-8 text-gray-400">Loading fine-tuning client...</div>
});

export default function StorageInferencePage() {
  const [activeTab, setActiveTab] = useState('storage');

  useEffect(() => {
    // Check URL parameters on mount
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab === 'finetuning') {
        setActiveTab('finetuning');
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6">
              💾 0G Network Storage & Inference
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Storage & AI Inference
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Leverage 0G Storage SDK for massive data storage and AI Inference SDK for deploying verifiable AI agents
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setActiveTab('storage')}
                className={`px-6 py-3 rounded-lg transition-colors duration-200 ${
                  activeTab === 'storage'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">💾</span>
                Storage
              </button>
              <button
                onClick={() => setActiveTab('inference')}
                className={`px-6 py-3 rounded-lg transition-colors duration-200 ${
                  activeTab === 'inference'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">🧠</span>
                AI Inference
              </button>
              <button
                onClick={() => setActiveTab('finetuning')}
                className={`px-6 py-3 rounded-lg transition-colors duration-200 ${
                  activeTab === 'finetuning'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">🎯</span>
                Fine-Tuning
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'storage' && (
              <div className="space-y-8">
                {/* Storage Section Header */}
                <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-xl p-8">
                  <h2 className="text-3xl font-bold mb-4">0G Storage SDK</h2>
                  <p className="text-gray-300 text-lg mb-6">
                    Store, retrieve, and manage massive datasets using 0G Storage SDK with Merkle tree verification
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-black/50 rounded-lg p-6">
                      <div className="text-2xl font-bold text-cyan-400 mb-2">Merkle Tree</div>
                      <div className="text-gray-300 text-sm">Cryptographic verification for data integrity</div>
                    </div>
                    <div className="bg-black/50 rounded-lg p-6">
                      <div className="text-2xl font-bold text-cyan-400 mb-2">Key-Value</div>
                      <div className="text-gray-300 text-sm">Fast access to structured data</div>
                    </div>
                    <div className="bg-black/50 rounded-lg p-6">
                      <div className="text-2xl font-bold text-cyan-400 mb-2">Scalable</div>
                      <div className="text-gray-300 text-sm">Handle massive datasets efficiently</div>
                    </div>
                  </div>
                </div>

                {/* Storage Client Component */}
                <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
                  <StorageClient />
                </div>

                {/* Storage Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4">File Storage</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-cyan-400 mr-3">✓</span>
                        <span>Merkle tree verification for data integrity</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-400 mr-3">✓</span>
                        <span>Scalable storage for massive datasets</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-400 mr-3">✓</span>
                        <span>Efficient upload/download operations</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-400 mr-3">✓</span>
                        <span>Stream processing capabilities</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4">Key-Value Storage</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-cyan-400 mr-3">✓</span>
                        <span>Fast access to structured data</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-400 mr-3">✓</span>
                        <span>Batch operations for efficiency</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-400 mr-3">✓</span>
                        <span>Real-time data streaming</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-400 mr-3">✓</span>
                        <span>Optimized for AI applications</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'inference' && (
              <div className="space-y-8">
                {/* Inference Section Header */}
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-8">
                  <h2 className="text-3xl font-bold mb-4">AI Inference SDK</h2>
                  <p className="text-gray-300 text-lg mb-6">
                    Deploy AI agents with TEE verification and cost optimization using 0G AI Inference SDK
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-black/50 rounded-lg p-6">
                      <div className="text-2xl font-bold text-blue-400 mb-2">TEE Verification</div>
                      <div className="text-gray-300 text-sm">Trusted Execution Environment verification</div>
                    </div>
                    <div className="bg-black/50 rounded-lg p-6">
                      <div className="text-2xl font-bold text-blue-400 mb-2">Cost Optimized</div>
                      <div className="text-gray-300 text-sm">Efficient pricing and resource management</div>
                    </div>
                    <div className="bg-black/50 rounded-lg p-6">
                      <div className="text-2xl font-bold text-blue-400 mb-2">Verifiable</div>
                      <div className="text-gray-300 text-sm">Proof of Execution for AI operations</div>
                    </div>
                  </div>
                </div>

                {/* Inference Client Component */}
                <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
                  <InferenceClient />
                </div>

                {/* Inference Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4">Service Discovery</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-3">✓</span>
                        <span>Discover available AI inference services</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-3">✓</span>
                        <span>Compare pricing and capabilities</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-3">✓</span>
                        <span>View service metadata and models</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-3">✓</span>
                        <span>Verify provider authenticity</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4">AI Agent Execution</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-3">✓</span>
                        <span>Execute AI inference requests</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-3">✓</span>
                        <span>Ledger-based payment system</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-3">✓</span>
                        <span>Automatic cost calculation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-3">✓</span>
                        <span>Verifiable execution proofs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'finetuning' && (
              <div className="space-y-8">
                {/* Fine-Tuning Section Header */}
                <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-8">
                  <h2 className="text-3xl font-bold mb-4">Model Fine-Tuning SDK</h2>
                  <p className="text-gray-300 text-lg mb-6">
                    Fine-tune AI models on the 0G Compute Network with verifiable training and secure model delivery
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-black/50 rounded-lg p-6">
                      <div className="text-2xl font-bold text-purple-400 mb-2">Secure Training</div>
                      <div className="text-gray-300 text-sm">Verifiable training with encrypted model delivery</div>
                    </div>
                    <div className="bg-black/50 rounded-lg p-6">
                      <div className="text-2xl font-bold text-purple-400 mb-2">Provider Network</div>
                      <div className="text-gray-300 text-sm">Access to multiple fine-tuning providers</div>
                    </div>
                    <div className="bg-black/50 rounded-lg p-6">
                      <div className="text-2xl font-bold text-purple-400 mb-2">Cost Optimized</div>
                      <div className="text-gray-300 text-sm">Pay only for successful training tasks</div>
                    </div>
                  </div>
                </div>

                {/* Fine-Tuning Client Component */}
                <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
                  <FineTuningClient />
                </div>

                {/* Fine-Tuning Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4">Task Management</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-3">✓</span>
                        <span>Create fine-tuning tasks with custom datasets</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-3">✓</span>
                        <span>Monitor task progress in real-time</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-3">✓</span>
                        <span>View detailed training logs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-3">✓</span>
                        <span>Track task status and completion</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4">Model Delivery</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-3">✓</span>
                        <span>Secure encrypted model delivery</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-3">✓</span>
                        <span>Download fine-tuned models</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-3">✓</span>
                        <span>Decrypt models with your private key</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-3">✓</span>
                        <span>Integration with 0G Storage</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Integration Info */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">0G Network Integration</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-cyan-400">Storage Integration</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Seamless integration with 0G Storage SDK</li>
                    <li>• Merkle tree verification for data integrity</li>
                    <li>• Key-value and file storage support</li>
                    <li>• Optimized for AI and ML workloads</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-blue-400">Inference Integration</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Direct integration with 0G AI Inference SDK</li>
                    <li>• TEE verification for secure execution</li>
                    <li>• Cost-optimized pricing model</li>
                    <li>• Proof of Execution (PoE) support</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-purple-400">Fine-Tuning Integration</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Fine-tune models on 0G Compute Network</li>
                    <li>• Secure encrypted model delivery</li>
                    <li>• Provider network for training</li>
                    <li>• Verifiable training process</li>
                  </ul>
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

