import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Verifiable <span className="text-[#824CFF]">AI Data Marketplace</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Featured AI Agents */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured <span className="text-[#824CFF]">AI Agents</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AI Agent 1 */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-[#824CFF]/50 transition-colors duration-300">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-[#824CFF] rounded-lg flex items-center justify-center">
                  <span className="text-3xl">🧠</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#824CFF]">0.15 CARV</div>
                  <div className="text-sm text-gray-400">per call</div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-3">DataAgent Pro</h3>
              <p className="text-gray-300 mb-4">
                Advanced data analysis agent specializing in on-chain analytics and DeFi insights. 
                Provides real-time market analysis and trading signals.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-[#824CFF]">📚</span>
                  <span className="text-gray-300">System Role: Data Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[#824CFF]">🎯</span>
                  <span className="text-gray-300">Primary Goal: Alert whale moves, detect pump-and-dump tokens</span>
                </div>

              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-[#824CFF]/20 border border-[#824CFF]/40 rounded-full text-[#824CFF] text-sm">on-chain</span>
                <span className="px-3 py-1 bg-[#824CFF]/20 border border-[#824CFF]/40 rounded-full text-[#824CFF] text-sm">DeFi</span>
                <span className="px-3 py-1 bg-[#824CFF]/20 border border-[#824CFF]/40 rounded-full text-[#824CFF] text-sm">trading</span>
                <span className="px-3 py-1 bg-[#824CFF]/20 border border-[#824CFF]/40 rounded-full text-[#824CFF] text-sm">analytics</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#824CFF] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">C</span>
                  </div>
                  <span className="text-gray-300">CARV ID: 543</span>
                </div>
                <button className="px-6 py-2 bg-[#824CFF] text-white rounded-lg hover:bg-[#9a5cff] transition-colors">
                  Buy Agent
                </button>
              </div>
            </div>

            {/* AI Agent 2 */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-[#824CFF]/50 transition-colors duration-300">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-[#824CFF] rounded-lg flex items-center justify-center">
                  <span className="text-3xl">🔍</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#824CFF]">0.25 CARV</div>
                  <div className="text-sm text-gray-400">per call</div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-3">SocialInsight Bot</h3>
              <p className="text-gray-300 mb-4">
                Social media sentiment analysis agent that monitors Twitter, Reddit, and Discord 
                for crypto trends and community sentiment.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-[#824CFF]">📚</span>
                  <span className="text-gray-300">System Role: Social Insights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[#824CFF]">🎯</span>
                  <span className="text-gray-300">Primary Goal: Monitor social sentiment and detect trending topics</span>
                </div>

              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-[#824CFF]/20 border border-[#824CFF]/40 rounded-full text-[#824CFF] text-sm">social</span>
                <span className="px-3 py-1 bg-[#824CFF]/20 border border-[#824CFF]/40 rounded-full text-[#824CFF] text-sm">sentiment</span>
                <span className="px-3 py-1 bg-[#824CFF]/20 border border-[#824CFF]/40 rounded-full text-[#824CFF] text-sm">trending</span>
                <span className="px-3 py-1 bg-[#824CFF]/20 border border-[#824CFF]/40 rounded-full text-[#824CFF] text-sm">monitoring</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#824CFF] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">C</span>
                  </div>
                  <span className="text-gray-300">CARV ID: 656</span>
                </div>
                <button className="px-6 py-2 bg-[#824CFF] text-white rounded-lg hover:bg-[#9a5cff] transition-colors">
                  Buy Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 