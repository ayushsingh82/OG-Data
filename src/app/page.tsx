import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left">
              <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-6">
                🤖 Powered by 0G Network
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
                Verifiable{' '}
                <span className="text-blue-500">AI Data Marketplace</span>
                <br />
                Powered by OG Network
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 mb-8">
                Buy, sell, and deploy verifiable AI agents with massive data storage. 
                Leverage 0G Storage SDK and AI Inference capabilities for intelligent automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center gap-2">
                  <span>🚀</span>
                  Browse AI Agents
                </button>
                <button className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                  Explore Marketplace
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

      {/* Wave 3 Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium mb-6">
              🚀 Wave 3 Features - LIVE!
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Wave 3 Implementation</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Implement update mechanisms for both datasets and AI agents, ensuring continuous improvement and version tracking
            </p>
          </div>

          <div className="space-y-8">
            {/* Completed Features */}
            <div>
              <h3 className="text-2xl font-semibold text-green-400 mb-6 flex items-center">
                <span className="mr-3">✅</span>
                Completed Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
                  <div className="text-green-400 font-semibold mb-2 text-lg">✅ Version Tracking</div>
                  <div className="text-sm text-gray-300">Continuous updates & rollbacks for datasets and AI agents</div>
                </div>
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
                  <div className="text-green-400 font-semibold mb-2 text-lg">✅ Community Curation</div>
                  <div className="text-sm text-gray-300">Peer reviews & validation systems</div>
                </div>
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
                  <div className="text-green-400 font-semibold mb-2 text-lg">✅ Trust Layer</div>
                  <div className="text-sm text-gray-300">Cryptographic verification</div>
                </div>
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
                  <div className="text-green-400 font-semibold mb-2 text-lg">✅ Performance</div>
                  <div className="text-sm text-gray-300">Optimized for scale</div>
                </div>
              </div>
            </div>

            {/* Planned Features */}
            <div>
              <h3 className="text-2xl font-semibold text-purple-400 mb-6 flex items-center">
                <span className="mr-3">🚀</span>
                Planned Features
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
                  <div className="text-purple-400 font-semibold mb-3 text-lg">🔄 Update Mechanisms</div>
                  <div className="text-gray-300">Implement update mechanisms for both datasets and AI agents, ensuring continuous improvement and version tracking</div>
                </div>
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
                  <div className="text-purple-400 font-semibold mb-3 text-lg">👥 Community-Driven Curation</div>
                  <div className="text-gray-300">Roll out community-driven curation tools for ranking, reviewing, and validating datasets and agents</div>
                </div>
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
                  <div className="text-purple-400 font-semibold mb-3 text-lg">⚡ Scalability & Performance</div>
                  <div className="text-gray-300">Optimize scalability and performance, making the marketplace capable of handling large datasets and high query volumes</div>
                </div>
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
                  <div className="text-purple-400 font-semibold mb-3 text-lg">🛡️ Verification & Trust Layer</div>
                  <div className="text-gray-300">Strengthen the verification and trust layer, using cryptographic proofs to validate dataset authenticity and AI agent outputs</div>
                </div>
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
                  <div className="text-purple-400 font-semibold mb-3 text-lg">🏪 Decentralized Marketplace</div>
                  <div className="text-gray-300">Move towards a fully functional decentralized marketplace with support for monetization, governance, and broader ecosystem integrations</div>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Contracts Showcase */}
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-center mb-8">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Smart Contracts</span> Powering Wave 3
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-black/50 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-lg">🔄</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">VersionedAgent.sol</h4>
                    <p className="text-purple-400 text-sm">Version Tracking</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  AI agent version management with update policies and rollback capabilities.
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-purple-400">383 lines</span>
                  <span className="text-green-400">✅ Deployed</span>
                </div>
              </div>

              <div className="bg-black/50 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-lg">📊</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">VersionedDataset.sol</h4>
                    <p className="text-purple-400 text-sm">Data Versioning</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Dataset version tracking with access control and update policies.
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-purple-400">488 lines</span>
                  <span className="text-green-400">✅ Deployed</span>
                </div>
              </div>

              <div className="bg-black/50 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-lg">👥</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">CommunityCuration.sol</h4>
                    <p className="text-purple-400 text-sm">Community Governance</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Community-driven curation with reviews, ratings, and verification.
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-purple-400">475 lines</span>
                  <span className="text-green-400">✅ Deployed</span>
                </div>
              </div>

              <div className="bg-black/50 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-lg">🛡️</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">VerificationTrustLayer.sol</h4>
                    <p className="text-purple-400 text-sm">Cryptographic Verification</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Cryptographic proofs for dataset authenticity and AI agent verification.
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-purple-400">475 lines</span>
                  <span className="text-green-400">✅ Deployed</span>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-6 inline-block">
                <div className="text-2xl font-bold text-white mb-2">1,821+ Lines of Code</div>
                <div className="text-gray-300">4 Smart Contracts • Wave 3 Complete • Ready for Deployment</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agent Marketplace Section */}
      <section id="agents" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Verifiable <span className="text-blue-500">AI Agent Marketplace</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover, purchase, and deploy AI agents with Proof of Execution (PoE) verification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Data Analysis Agent */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Data Analysis Pro</h3>
              <p className="text-gray-300 mb-4">
                Advanced data analysis agent with machine learning capabilities. Perfect for business intelligence and research.
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-blue-400 font-semibold">500 OG</span>
                <span className="text-green-400 text-sm">✓ Verified</span>
              </div>
              <div className="flex items-center text-blue-400 text-sm">
                <span>Buy Now</span>
                <span className="ml-2">→</span>
              </div>
            </div>

            {/* Content Generation Agent */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">✍️</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Content Creator AI</h3>
              <p className="text-gray-300 mb-4">
                Intelligent content generation agent for articles, marketing copy, and creative writing projects.
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-semibold">300 OG</span>
                <span className="text-green-400 text-sm">✓ Verified</span>
              </div>
              <div className="flex items-center text-green-400 text-sm">
                <span>Buy Now</span>
                <span className="ml-2">→</span>
              </div>
            </div>

            {/* Research Assistant Agent */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Research Assistant</h3>
              <p className="text-gray-300 mb-4">
                AI-powered research assistant for literature review, data synthesis, and academic writing.
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-purple-400 font-semibold">400 OG</span>
                <span className="text-green-400 text-sm">✓ Verified</span>
              </div>
              <div className="flex items-center text-purple-400 text-sm">
                <span>Buy Now</span>
                <span className="ml-2">→</span>
              </div>
            </div>

            {/* Coming Soon - List Your Agent */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold mb-4">List Your Agent</h3>
              <p className="text-gray-300 mb-4">
                Coming Soon! Deploy and monetize your own AI agents. Earn OG tokens from usage and licensing.
              </p>
              <div className="flex items-center text-orange-400 text-sm">
                <span>Coming Soon</span>
                <span className="ml-2">→</span>
              </div>
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

      {/* Stats Section */}
      <section id="stats" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">500+</div>
              <p className="text-gray-300">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500 mb-2">1,200+</div>
              <p className="text-gray-300">AI Agents Available</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-500 mb-2">50+</div>
              <p className="text-gray-300">Verified Datasets</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">$2.5M+</div>
              <p className="text-gray-300">OG Tokens Traded</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="get-started" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Deploy <span className="text-blue-500">AI Agents</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the verifiable AI data marketplace powered by 0G Network
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
              Start Using AI Agents
            </button>
            <button className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
              Join Marketplace
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
