import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Developers() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Build the Future of <span className="text-[#824CFF]">AI</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Comprehensive tools, SDKs, and documentation to build verifiable AI applications on CARV
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#824CFF] hover:bg-[#9a5cff] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                Get Started
              </button>
              <button className="border border-[#824CFF] text-[#824CFF] hover:bg-[#824CFF] hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                View API Docs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Quick <span className="text-[#824CFF]">Start</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <div className="w-12 h-12 bg-[#824CFF] rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold mb-4">1. Install SDK</h3>
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <code className="text-[#824CFF]">npm install @carv/sdk</code>
              </div>
              <p className="text-gray-300">Get the latest CARV SDK for your preferred language</p>
            </div>
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <div className="w-12 h-12 bg-[#824CFF] rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔑</span>
              </div>
              <h3 className="text-xl font-bold mb-4">2. Get API Key</h3>
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <code className="text-[#824CFF]">carv.api_key = &quot;your_key&quot;</code>
              </div>
              <p className="text-gray-300">Register for a free API key in the developer portal</p>
            </div>
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <div className="w-12 h-12 bg-[#824CFF] rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold mb-4">3. Deploy Agent</h3>
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <code className="text-[#824CFF]">carv.deploy_agent(config)</code>
              </div>
              <p className="text-gray-300">Deploy your first AI agent on SVM Chain</p>
            </div>
          </div>
        </div>
      </section>

      {/* SDKs & Tools */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-[#824CFF]">SDKs</span> & Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* JavaScript/TypeScript */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6 hover:border-[#824CFF]/50 transition-colors duration-300">
              <div className="w-12 h-12 bg-[#824CFF] rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-bold mb-2">JavaScript/TypeScript</h3>
              <p className="text-gray-300 text-sm mb-4">Full-featured SDK for web and Node.js applications</p>
              <div className="flex justify-between items-center">
                <span className="text-[#824CFF] text-sm">v2.1.0</span>
                <button className="text-[#824CFF] hover:text-[#9a5cff] text-sm">View Docs</button>
              </div>
            </div>

            {/* Python */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6 hover:border-[#824CFF]/50 transition-colors duration-300">
              <div className="w-12 h-12 bg-[#824CFF] rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🐍</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Python</h3>
              <p className="text-gray-300 text-sm mb-4">Comprehensive SDK for AI/ML and data science workflows</p>
              <div className="flex justify-between items-center">
                <span className="text-[#824CFF] text-sm">v1.8.2</span>
                <button className="text-[#824CFF] hover:text-[#9a5cff] text-sm">View Docs</button>
              </div>
            </div>

            {/* Rust */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6 hover:border-[#824CFF]/50 transition-colors duration-300">
              <div className="w-12 h-12 bg-[#824CFF] rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🦀</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Rust</h3>
              <p className="text-gray-300 text-sm mb-4">High-performance SDK for systems programming</p>
              <div className="flex justify-between items-center">
                <span className="text-[#824CFF] text-sm">v0.9.1</span>
                <button className="text-[#824CFF] hover:text-[#9a5cff] text-sm">View Docs</button>
              </div>
            </div>

            {/* Go */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6 hover:border-[#824CFF]/50 transition-colors duration-300">
              <div className="w-12 h-12 bg-[#824CFF] rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🐹</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Go</h3>
              <p className="text-gray-300 text-sm mb-4">Efficient SDK for cloud-native applications</p>
              <div className="flex justify-between items-center">
                <span className="text-[#824CFF] text-sm">v1.2.0</span>
                <button className="text-[#824CFF] hover:text-[#9a5cff] text-sm">View Docs</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-[#824CFF]">Documentation</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4">📚 Getting Started</h3>
              <p className="text-gray-300 mb-4">Learn the basics of CARV and deploy your first AI agent</p>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li>• Quick start guide</li>
                <li>• Architecture overview</li>
                <li>• Basic concepts</li>
                <li>• First deployment</li>
              </ul>
              <button className="text-[#824CFF] hover:text-[#9a5cff] font-semibold">
                Read Guide →
              </button>
            </div>

            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4">🔧 API Reference</h3>
              <p className="text-gray-300 mb-4">Complete API documentation with examples and best practices</p>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li>• REST API endpoints</li>
                <li>• WebSocket connections</li>
                <li>• Authentication</li>
                <li>• Error handling</li>
              </ul>
              <button className="text-[#824CFF] hover:text-[#9a5cff] font-semibold">
                View API Docs →
              </button>
            </div>

            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4">🎯 Tutorials</h3>
              <p className="text-gray-300 mb-4">Step-by-step tutorials for building real-world applications</p>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li>• Data marketplace integration</li>
                <li>• Custom AI agent development</li>
                <li>• Zero-knowledge proofs</li>
                <li>• Reputation system</li>
              </ul>
              <button className="text-[#824CFF] hover:text-[#9a5cff] font-semibold">
                Browse Tutorials →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Tools */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Developer <span className="text-[#824CFF]">Tools</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4">🛠️ CARV CLI</h3>
              <p className="text-gray-300 mb-4">Command-line interface for managing agents, data, and deployments</p>
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <code className="text-[#824CFF]">npm install -g @carv/cli</code>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li>• Agent deployment and management</li>
                <li>• Data upload and verification</li>
                <li>• Network monitoring</li>
                <li>• Local development environment</li>
              </ul>
            </div>

            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4">🔍 CARV Explorer</h3>
              <p className="text-gray-300 mb-4">Blockchain explorer for viewing transactions, agents, and data provenance</p>
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <code className="text-[#824CFF]">explorer.carv.ai</code>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li>• Real-time transaction tracking</li>
                <li>• Agent performance metrics</li>
                <li>• Data provenance verification</li>
                <li>• Network analytics</li>
              </ul>
            </div>

            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4">🧪 Testnet Faucet</h3>
              <p className="text-gray-300 mb-4">Get test tokens for development and testing on CARV testnet</p>
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <code className="text-[#824CFF]">faucet.carv.ai</code>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li>• Free test tokens</li>
                <li>• Sandbox environment</li>
                <li>• No real costs</li>
                <li>• Production-like testing</li>
              </ul>
            </div>

            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4">📊 Analytics Dashboard</h3>
              <p className="text-gray-300 mb-4">Monitor your agents, data usage, and performance metrics</p>
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <code className="text-[#824CFF]">dashboard.carv.ai</code>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li>• Real-time monitoring</li>
                <li>• Performance analytics</li>
                <li>• Cost tracking</li>
                <li>• Usage insights</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Join the <span className="text-[#824CFF]">Community</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Connect with other developers, get help, and stay updated with the latest CARV developments
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <div className="w-16 h-16 bg-[#824CFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Discord</h3>
              <p className="text-gray-300 mb-4">Join our Discord server for real-time discussions and support</p>
              <button className="bg-[#824CFF] hover:bg-[#9a5cff] text-white px-6 py-2 rounded-lg">
                Join Discord
              </button>
            </div>
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <div className="w-16 h-16 bg-[#824CFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="text-xl font-bold mb-2">GitHub</h3>
              <p className="text-gray-300 mb-4">Contribute to open-source projects and view source code</p>
              <button className="bg-[#824CFF] hover:bg-[#9a5cff] text-white px-6 py-2 rounded-lg">
                View GitHub
              </button>
            </div>
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <div className="w-16 h-16 bg-[#824CFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Newsletter</h3>
              <p className="text-gray-300 mb-4">Stay updated with the latest features and announcements</p>
              <button className="bg-[#824CFF] hover:bg-[#9a5cff] text-white px-6 py-2 rounded-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 