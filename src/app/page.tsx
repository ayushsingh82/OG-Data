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
                🔬 Powered by 0G Labs
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
                Decentralized{' '}
                <span className="text-blue-500">Research Tools</span>
                <br />
                with Collaborative AI
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 mb-8">
                Build, collaborate, and discover with AI agents on the 0G network. 
                Create research workflows, share datasets, and accelerate scientific discovery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center gap-2">
                  <span>🚀</span>
                  Start Researching
                </button>
                <button className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                  Explore Tools
                </button>
              </div>
            </div>

            {/* Right Column - Research Network Visualization */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                {/* Research Network Nodes */}
                <div className="absolute inset-0">
                  {/* Central Research Hub */}
                  <div className="absolute inset-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50">
                    <div className="text-white font-bold text-xl text-center">
                      <div>🔬</div>
                      <div>Research</div>
                      <div>Hub</div>
                    </div>
                  </div>
                  
                  {/* Floating Research Nodes */}
                  <div className="absolute top-8 left-8 w-16 h-16 bg-green-500/80 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-white text-lg">📊</span>
                  </div>
                  <div className="absolute top-12 right-12 w-12 h-12 bg-purple-500/80 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
                    <span className="text-white text-sm">🧠</span>
                  </div>
                  <div className="absolute bottom-8 left-12 w-14 h-14 bg-orange-500/80 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1s' }}>
                    <span className="text-white text-lg">🔍</span>
                  </div>
                  <div className="absolute bottom-12 right-8 w-10 h-10 bg-red-500/80 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1.5s' }}>
                    <span className="text-white text-sm">📈</span>
                  </div>
                  
                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
                    <defs>
                      <linearGradient id="researchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6"/>
                        <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3"/>
                      </linearGradient>
                    </defs>
                    <line x1="80" y1="80" x2="240" y2="240" stroke="url(#researchGradient)" strokeWidth="2" className="animate-pulse"/>
                    <line x1="240" y1="80" x2="80" y2="240" stroke="url(#researchGradient)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.5s' }}/>
                    <line x1="160" y1="40" x2="160" y2="280" stroke="url(#researchGradient)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '1s' }}/>
                    <line x1="40" y1="160" x2="280" y2="160" stroke="url(#researchGradient)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '1.5s' }}/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Tools Section */}
      <section id="tools" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Research <span className="text-blue-500">Tools & Features</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to conduct decentralized research with AI collaboration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Agent Builder */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold mb-4">AI Agent Builder</h3>
              <p className="text-gray-300 mb-4">
                Create custom AI agents for specific research tasks. Train them on your datasets and deploy them to the network.
              </p>
              <div className="flex items-center text-blue-400 text-sm">
                <span>Build Now</span>
                <span className="ml-2">→</span>
              </div>
            </div>

            {/* Collaborative Workspaces */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Collaborative Workspaces</h3>
              <p className="text-gray-300 mb-4">
                Work together with researchers worldwide. Share data, models, and insights in real-time.
              </p>
              <div className="flex items-center text-green-400 text-sm">
                <span>Join Workspace</span>
                <span className="ml-2">→</span>
              </div>
            </div>

            {/* Data Marketplace */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Data Marketplace</h3>
              <p className="text-gray-300 mb-4">
                Access verified datasets from the community. Buy, sell, and trade research data with OG tokens.
              </p>
              <div className="flex items-center text-purple-400 text-sm">
                <span>Browse Data</span>
                <span className="ml-2">→</span>
              </div>
            </div>

            {/* Research Analytics */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Research Analytics</h3>
              <p className="text-gray-300 mb-4">
                Track your research impact, citations, and collaboration network. Visualize your research journey.
              </p>
              <div className="flex items-center text-orange-400 text-sm">
                <span>View Analytics</span>
                <span className="ml-2">→</span>
              </div>
            </div>

            {/* Peer Review System */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Peer Review System</h3>
              <p className="text-gray-300 mb-4">
                Get your research reviewed by experts. Earn reputation and OG tokens for quality reviews.
              </p>
              <div className="flex items-center text-red-400 text-sm">
                <span>Submit for Review</span>
                <span className="ml-2">→</span>
              </div>
            </div>

            {/* Funding & Grants */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Funding & Grants</h3>
              <p className="text-gray-300 mb-4">
                Apply for research funding. Community-driven grant distribution using DAO governance.
              </p>
              <div className="flex items-center text-cyan-400 text-sm">
                <span>Apply for Grant</span>
                <span className="ml-2">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Categories Section */}
      <section id="categories" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Research <span className="text-blue-500">Categories</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore diverse research areas and find collaborators in your field
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-black/30 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-colors duration-300">
              <div className="text-4xl mb-4">🧬</div>
              <h3 className="text-lg font-semibold mb-2">Biotechnology</h3>
              <p className="text-gray-300 text-sm">Genomics, drug discovery, bioinformatics</p>
            </div>
            <div className="text-center p-6 bg-black/30 rounded-xl border border-gray-800 hover:border-green-500/50 transition-colors duration-300">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-lg font-semibold mb-2">Climate Science</h3>
              <p className="text-gray-300 text-sm">Climate modeling, sustainability, energy</p>
            </div>
            <div className="text-center p-6 bg-black/30 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-colors duration-300">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-lg font-semibold mb-2">AI & ML</h3>
              <p className="text-gray-300 text-sm">Machine learning, neural networks, AI ethics</p>
            </div>
            <div className="text-center p-6 bg-black/30 rounded-xl border border-gray-800 hover:border-orange-500/50 transition-colors duration-300">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-lg font-semibold mb-2">Physics</h3>
              <p className="text-gray-300 text-sm">Quantum computing, particle physics, cosmology</p>
            </div>
            <div className="text-center p-6 bg-black/30 rounded-xl border border-gray-800 hover:border-red-500/50 transition-colors duration-300">
              <div className="text-4xl mb-4">💊</div>
              <h3 className="text-lg font-semibold mb-2">Medicine</h3>
              <p className="text-gray-300 text-sm">Clinical trials, epidemiology, public health</p>
            </div>
            <div className="text-center p-6 bg-black/30 rounded-xl border border-gray-800 hover:border-cyan-500/50 transition-colors duration-300">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-lg font-semibold mb-2">Agriculture</h3>
              <p className="text-gray-300 text-sm">Crop science, food security, sustainable farming</p>
            </div>
            <div className="text-center p-6 bg-black/30 rounded-xl border border-gray-800 hover:border-yellow-500/50 transition-colors duration-300">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="text-lg font-semibold mb-2">Engineering</h3>
              <p className="text-gray-300 text-sm">Robotics, materials science, infrastructure</p>
            </div>
            <div className="text-center p-6 bg-black/30 rounded-xl border border-gray-800 hover:border-pink-500/50 transition-colors duration-300">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-lg font-semibold mb-2">Social Sciences</h3>
              <p className="text-gray-300 text-sm">Economics, psychology, sociology, education</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How <span className="text-blue-500">Research Collaboration</span> Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A step-by-step guide to decentralized research with AI collaboration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
              <h3 className="text-lg font-semibold mb-2">Create Research</h3>
              <p className="text-gray-300">Start a new research project or join existing ones</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
              <h3 className="text-lg font-semibold mb-2">Build AI Agents</h3>
              <p className="text-gray-300">Create AI tools to help with data analysis and research</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
              <h3 className="text-lg font-semibold mb-2">Collaborate</h3>
              <p className="text-gray-300">Work with researchers and AI agents worldwide</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">4</div>
              <h3 className="text-lg font-semibold mb-2">Publish & Earn</h3>
              <p className="text-gray-300">Share findings and earn OG tokens for contributions</p>
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
              <p className="text-gray-300">Active Researchers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500 mb-2">1,200+</div>
              <p className="text-gray-300">AI Agents Deployed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-500 mb-2">50+</div>
              <p className="text-gray-300">Research Projects</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">$2.5M+</div>
              <p className="text-gray-300">OG Tokens Distributed</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="get-started" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform <span className="text-blue-500">Research</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the decentralized research revolution powered by 0G Labs and collaborative AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
              Start Your Research Journey
            </button>
            <button className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
              Join Research Community
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
