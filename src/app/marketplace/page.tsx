'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface ResearchDataset {
  id: number;
  title: string;
  category: string;
  description: string;
  price: string;
  size: string;
  records: string;
  quality: string;
  provider: string;
  tags: string[];
  verified: boolean;
  downloads: number;
  rating: number;
}

interface AIAgent {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  calls: string;
  accuracy: string;
  provider: string;
  tags: string[];
  verified: boolean;
  users: number;
  rating: number;
}

interface ResearchTool {
  id: number;
  title: string;
  category: string;
  description: string;
  price: string;
  type: string;
  provider: string;
  tags: string[];
  verified: boolean;
  users: number;
  rating: number;
}

type MarketplaceItem = ResearchDataset | AIAgent | ResearchTool;

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', icon: '🔬' },
    { id: 'datasets', name: 'Datasets', icon: '📊' },
    { id: 'agents', name: 'AI Agents', icon: '🤖' },
    { id: 'tools', name: 'Research Tools', icon: '🛠️' },
    { id: 'models', name: 'AI Models', icon: '🧠' },
    { id: 'services', name: 'Services', icon: '⚡' },
  ];

  const researchDatasets = [
    {
      id: 1,
      title: 'Global Climate Data 2020-2024',
      category: 'Climate Science',
      description: 'Comprehensive climate dataset including temperature, precipitation, humidity, and atmospheric pressure from 150+ weather stations worldwide.',
      price: '2,500 OG',
      size: '15.2 GB',
      records: '2.3M',
      quality: '98.5%',
      provider: 'Climate Research Institute',
      tags: ['climate', 'weather', 'global', 'temperature', 'precipitation'],
      verified: true,
      downloads: 1247,
      rating: 4.8,
    },
    {
      id: 2,
      title: 'Human Genome Variants Database',
      category: 'Biotechnology',
      description: 'Annotated human genome variants with clinical significance, population frequencies, and disease associations.',
      price: '5,000 OG',
      size: '8.7 GB',
      records: '890K',
      quality: '99.2%',
      provider: 'Genomics Research Lab',
      tags: ['genomics', 'human', 'variants', 'clinical', 'disease'],
      verified: true,
      downloads: 892,
      rating: 4.9,
    },
    {
      id: 3,
      title: 'Quantum Computing Benchmark Results',
      category: 'Physics',
      description: 'Performance benchmarks for quantum algorithms across different quantum computing platforms and error correction methods.',
      price: '1,800 OG',
      size: '3.4 GB',
      records: '156K',
      quality: '97.8%',
      provider: 'Quantum Research Center',
      tags: ['quantum', 'computing', 'benchmarks', 'algorithms', 'performance'],
      verified: true,
      downloads: 567,
      rating: 4.7,
    },
  ];

  const aiAgents = [
    {
      id: 1,
      name: 'DataAnalyzer Pro',
      category: 'Data Analysis',
      description: 'Advanced statistical analysis agent with machine learning capabilities for research data processing and visualization.',
      price: '500 OG',
      calls: '0.05 OG per call',
      accuracy: '94.2%',
      provider: 'Data Science Lab',
      tags: ['analysis', 'statistics', 'ml', 'visualization', 'research'],
      verified: true,
      users: 2341,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'LiteratureReview Bot',
      category: 'Research Assistant',
      description: 'AI-powered literature review agent that summarizes research papers, identifies key findings, and suggests related works.',
      price: '300 OG',
      calls: '0.03 OG per call',
      accuracy: '91.5%',
      provider: 'Academic AI Lab',
      tags: ['literature', 'review', 'papers', 'summarization', 'academic'],
      verified: true,
      users: 1892,
      rating: 4.6,
    },
    {
      id: 3,
      name: 'CollaborationFinder',
      category: 'Networking',
      description: 'Intelligent agent that finds potential research collaborators based on expertise, interests, and project requirements.',
      price: '200 OG',
      calls: '0.02 OG per call',
      accuracy: '89.7%',
      provider: 'Research Network Lab',
      tags: ['collaboration', 'networking', 'researchers', 'matching', 'expertise'],
      verified: true,
      users: 1456,
      rating: 4.5,
    },
  ];

  const researchTools = [
    {
      id: 1,
      title: 'Research Workflow Manager',
      category: 'Productivity',
      description: 'Comprehensive tool for managing research projects, timelines, team collaboration, and progress tracking.',
      price: '800 OG',
      type: 'Software License',
      provider: 'Research Tools Inc.',
      tags: ['workflow', 'management', 'collaboration', 'tracking', 'productivity'],
      verified: true,
      users: 892,
      rating: 4.7,
    },
    {
      id: 2,
      title: 'Data Visualization Suite',
      category: 'Visualization',
      description: 'Advanced data visualization toolkit with interactive charts, graphs, and 3D modeling capabilities.',
      price: '600 OG',
      type: 'Software License',
      provider: 'Visual Analytics Lab',
      tags: ['visualization', 'charts', 'graphs', '3D', 'interactive'],
      verified: true,
      users: 1234,
      rating: 4.8,
    },
  ];

  const renderItems = (): MarketplaceItem[] => {
    switch (activeCategory) {
      case 'datasets':
        return researchDatasets;
      case 'agents':
        return aiAgents;
      case 'tools':
        return researchTools;
      default:
        return [...researchDatasets, ...aiAgents, ...researchTools];
    }
  };

  // Type guards
  const isDataset = (item: MarketplaceItem): item is ResearchDataset => 'size' in item;
  const isAgent = (item: MarketplaceItem): item is AIAgent => 'calls' in item;
  const isTool = (item: MarketplaceItem): item is ResearchTool => 'type' in item;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-6">
              🔬 Research Data Marketplace
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Research <span className="text-blue-500">Data & Tools</span> Marketplace
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover verified datasets, AI agents, and research tools. Buy, sell, and trade with OG tokens 
              to accelerate your research and scientific discoveries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                List Your Research
              </button>
              <button className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                Browse Categories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-black/50 border border-gray-800 text-gray-300 hover:border-blue-500/50 hover:text-blue-400'
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Items */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              {activeCategory === 'all' ? 'All Research Items' : 
               activeCategory === 'datasets' ? 'Research Datasets' :
               activeCategory === 'agents' ? 'AI Research Agents' :
               activeCategory === 'tools' ? 'Research Tools' : 'Research Items'}
            </h2>
            <div className="flex items-center gap-4">
              <select className="bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-white">
                <option>Sort by: Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
                <option>Downloads</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {renderItems().map((item) => (
              <div key={item.id} className="bg-black/50 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-xl">
                      {item.category === 'Data Analysis' || item.category === 'Research Assistant' || item.category === 'Networking' ? '🤖' :
                       item.category === 'Climate Science' ? '🌍' :
                       item.category === 'Biotechnology' ? '🧬' :
                       item.category === 'Physics' ? '🔬' :
                       item.category === 'Productivity' ? '⚡' :
                       item.category === 'Visualization' ? '📊' : '🔬'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-400">{item.price}</div>
                    <div className="text-sm text-gray-400">
                      {isAgent(item) ? item.calls : isTool(item) ? item.type : 'One-time purchase'}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3">
                  {isDataset(item) ? item.title : isAgent(item) ? item.name : item.title}
                </h3>
                <p className="text-gray-300 mb-4 text-sm line-clamp-3">{item.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  {isDataset(item) && (
                    <>
                      <div className="text-gray-400">
                        <span className="text-blue-400">Size:</span> {item.size}
                      </div>
                      <div className="text-gray-400">
                        <span className="text-blue-400">Records:</span> {item.records}
                      </div>
                      <div className="text-gray-400">
                        <span className="text-blue-400">Quality:</span> {item.quality}
                      </div>
                    </>
                  )}
                  {isAgent(item) && (
                    <div className="text-gray-400">
                      <span className="text-blue-400">Accuracy:</span> {item.accuracy}
                    </div>
                  )}
                </div>

                {/* Provider */}
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <span className="text-gray-400">Provider:</span>
                  <span className="text-blue-400 font-medium">{item.provider}</span>
                  {item.verified && (
                    <span className="text-green-400 text-xs">✓ Verified</span>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.slice(0, 4).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>⭐ {item.rating}</span>
                    <span>
                      {isDataset(item) ? `📥 ${item.downloads}` : `👥 ${item.users}`}
                    </span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                    {isAgent(item) ? 'Get Access' : 'Purchase'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Marketplace <span className="text-blue-500">Statistics</span>
            </h2>
            <p className="text-xl text-gray-300">Join thousands of researchers using our marketplace</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">15,000+</div>
              <p className="text-gray-300">Datasets Available</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500 mb-2">2,500+</div>
              <p className="text-gray-300">AI Agents</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-500 mb-2">8,000+</div>
              <p className="text-gray-300">Active Researchers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">$1.2M+</div>
              <p className="text-gray-300">OG Tokens Traded</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 