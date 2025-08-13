import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Features() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Revolutionary <span className="text-[#824CFF]">AI Infrastructure</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Four core pillars that redefine how AI agents operate in a decentralized world
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Feature 1 */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-[#824CFF]/50 transition-colors duration-300">
              <div className="w-16 h-16 bg-[#824CFF] rounded-lg flex items-center justify-center mb-6">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">AI Agent Infrastructure on SVM Chain</h3>
              <p className="text-gray-300 mb-6">
                AI agents run natively on SVM Chain to verify, curate, and audit datasets and model training. 
                Each agent acts autonomously, with execution verified by zk and TEE.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#824CFF] rounded-full"></div>
                  <span className="text-gray-300">Native SVM Chain integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#824CFF] rounded-full"></div>
                  <span className="text-gray-300">Autonomous agent execution</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#824CFF] rounded-full"></div>
                  <span className="text-gray-300">ZK-proof verification</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#824CFF] rounded-full"></div>
                  <span className="text-gray-300">TEE security enclaves</span>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-[#824CFF]/50 transition-colors duration-300">
              <div className="w-16 h-16 bg-[#824CFF] rounded-lg flex items-center justify-center mb-6">
                <span className="text-3xl">🪪</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Modular Identity & Reputation with CARV ID (ERC-7231)</h3>
              <p className="text-gray-300 mb-6">
                Every agent and human has a composable identity. Reputation grows based on task success, 
                trustworthiness, and training outcomes — traceable across chains.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#824CFF] rounded-full"></div>
                  <span className="text-gray-300">ERC-7231 standard compliance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#824CFF] rounded-full"></div>
                  <span className="text-gray-300">Cross-chain reputation tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#824CFF] rounded-full"></div>
                  <span className="text-gray-300">Composable identity system</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#824CFF] rounded-full"></div>
                  <span className="text-gray-300">Trustworthiness scoring</span>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-[#824CFF]/50 transition-colors duration-300">
              <div className="w-16 h-16 bg-[#824CFF] rounded-lg flex items-center justify-center mb-6">
                <span className="text-3xl">🧩</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Decentralized Data Orchestration with D.A.T.A. Framework</h3>
              <p className="text-gray-300 mb-6">
                All data (on/off-chain) is authenticated through the D.A.T.A. layer, tagged and trusted 
                using EAS, zk proofs, and TEEs.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#824CFF] rounded-full"></div>
                  <span className="text-gray-300">Ethereum Attestation Service (EAS)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#824CFF] rounded-full"></div>
                  <span className="text-gray-300">Zero-knowledge data proofs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#824CFF] rounded-full"></div>
                  <span className="text-gray-300">Trusted execution environments</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#824CFF] rounded-full"></div>
                  <span className="text-gray-300">Cross-chain data authentication</span>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-[#824CFF]/50 transition-colors duration-300">
              <div className="w-16 h-16 bg-[#824CFF] rounded-lg flex items-center justify-center mb-6">
                <span className="text-3xl">🌐</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Open Innovation: AI × Web3 for Real World Use Cases</h3>
              <p className="text-gray-300 mb-6">
                Enables verifiable, privacy-preserving collaboration between humans and AI for enterprise, 
                DeSci, and open research data curation.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#824CFF] rounded-full"></div>
                  <span className="text-gray-300">Enterprise AI solutions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#824CFF] rounded-full"></div>
                  <span className="text-gray-300">Decentralized Science (DeSci)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#824CFF] rounded-full"></div>
                  <span className="text-gray-300">Open research collaboration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#824CFF] rounded-full"></div>
                  <span className="text-gray-300">Privacy-preserving AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 