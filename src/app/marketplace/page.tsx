'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PaymentModal from '../components/PaymentModal';

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

// Type guards
const isDataset = (item: MarketplaceItem): item is ResearchDataset => {
  return 'size' in item;
};

const isAgent = (item: MarketplaceItem): item is AIAgent => {
  return 'calls' in item;
};

const isTool = (item: MarketplaceItem): item is ResearchTool => {
  return 'type' in item;
};

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [verificationFilter, setVerificationFilter] = useState('all');

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
      price: '18 OG',
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
      price: '25 OG',
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
      price: '15 OG',
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
      price: '20 OG',
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
      price: '18 OG',
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
      price: '22 OG',
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
      price: '30 OG',
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
      price: '28 OG',
      type: 'Software License',
      provider: 'Visual Analytics Lab',
      tags: ['visualization', 'charts', 'graphs', '3D', 'interactive'],
      verified: true,
      users: 1234,
      rating: 4.8,
    },
  ];

  const allItems = [...researchDatasets, ...aiAgents, ...researchTools];
  const allTags = Array.from(new Set(allItems.flatMap(item => item.tags)));

  const filteredItems = () => {
    let items = allItems;

    // Category filter
    switch (activeCategory) {
      case 'datasets':
        items = researchDatasets;
        break;
      case 'agents':
        items = aiAgents;
        break;
      case 'tools':
        items = researchTools;
        break;
      default:
        items = allItems;
    }

    // Search filter
    if (searchQuery) {
      items = items.filter(item => {
        const title = isDataset(item) || isTool(item) ? item.title : item.name;
        return title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
               item.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
               item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      });
    }

    // Price filter
    items = items.filter(item => {
      const price = parseInt(item.price.replace(' OG', ''));
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Tags filter
    if (selectedTags.length > 0) {
      items = items.filter(item => 
        selectedTags.some(tag => item.tags.includes(tag))
      );
    }

    // Verification filter
    if (verificationFilter !== 'all') {
      items = items.filter(item => item.verified === (verificationFilter === 'verified'));
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        items.sort((a, b) => parseInt(a.price.replace(' OG', '')) - parseInt(b.price.replace(' OG', '')));
        break;
      case 'price-high':
        items.sort((a, b) => parseInt(b.price.replace(' OG', '')) - parseInt(a.price.replace(' OG', '')));
        break;
      case 'rating':
        items.sort((a, b) => b.rating - a.rating);
        break;
      case 'downloads':
        items.sort((a, b) => {
          const aCount = isDataset(a) ? a.downloads : a.users;
          const bCount = isDataset(b) ? b.downloads : b.users;
          return bCount - aCount;
        });
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return items;
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handlePurchase = (item: MarketplaceItem) => {
    setSelectedItem(item);
    setShowPurchaseModal(true);
  };

  const confirmPurchase = () => {
    console.log('Purchase completed:', selectedItem);
    setShowPurchaseModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-6">
              🤖 AI Agent Marketplace
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Verifiable <span className="text-blue-500">AI Agents</span> Marketplace
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover, purchase, and deploy AI agents with Proof of Execution (PoE) verification. 
              All agents priced in OG tokens for transparent trading.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                Browse AI Agents
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search agents, datasets, tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-black/50 border border-gray-800 rounded-lg focus:border-blue-500 focus:outline-none text-white placeholder-gray-400"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
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
              
          {/* Filter Toggle */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-blue-500 transition-colors"
            >
              <span>🔧</span>
              Advanced Filters
              <span className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium mb-3">Price Range (OG)</label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 100 }))}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                      />
                    </div>
                    <div className="text-xs text-gray-400">
                      Range: {priceRange.min} - {priceRange.max} OG
                    </div>
                  </div>
                </div>

                {/* Verification Filter */}
                <div>
                  <label className="block text-sm font-medium mb-3">Verification</label>
                  <select
                    value={verificationFilter}
                    onChange={(e) => setVerificationFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                  >
                    <option value="all">All Items</option>
                    <option value="verified">Verified Only</option>
                    <option value="unverified">Unverified Only</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium mb-3">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                    <option value="downloads">Popularity</option>
                  </select>
              </div>
              </div>
              
              {/* Tags Filter */}
              <div className="mt-6">
                <label className="block text-sm font-medium mb-3">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {allTags.slice(0, 20).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
                {selectedTags.length > 0 && (
                  <div className="mt-3">
                    <button
                      onClick={() => setSelectedTags([])}
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      Clear all tags
                </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Marketplace Items */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">
                {activeCategory === 'all' ? 'All AI Agents & Tools' : 
                 activeCategory === 'datasets' ? 'Research Datasets' :
                 activeCategory === 'agents' ? 'AI Agents' :
                 activeCategory === 'tools' ? 'Research Tools' : 'AI Items'}
              </h2>
              <p className="text-gray-400 mt-2">
                {filteredItems().length} items found
                {searchQuery && ` for "${searchQuery}"`}
                {selectedTags.length > 0 && ` with tags: ${selectedTags.join(', ')}`}
              </p>
                </div>
            <div className="flex items-center gap-4">
              <a
                href="/list-agent"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                + List Your Agent
              </a>
                </div>
              </div>
              
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredItems().map((item) => {
              // Create unique key based on item type and ID
              const itemType = isDataset(item) ? 'dataset' : isAgent(item) ? 'agent' : 'tool';
              const uniqueKey = `${itemType}-${item.id}`;
              
              return (
              <div key={uniqueKey} className="bg-black/50 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
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
                  <a 
                    href={`/agent/${item.id}`}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {isDataset(item) || isTool(item) ? item.title : item.name}
                  </a>
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
                  <button 
                    onClick={() => handlePurchase(item)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Purchase
                  </button>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

            {/* Payment Modal */}
      <PaymentModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        item={selectedItem}
        onSuccess={confirmPurchase}
      />

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Marketplace <span className="text-blue-500">Statistics</span>
            </h2>
            <p className="text-xl text-gray-300">Join thousands of users trading AI agents and data</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">500+</div>
              <p className="text-gray-300">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500 mb-2">1,200+</div>
              <p className="text-gray-300">AI Agents</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-500 mb-2">8,000+</div>
              <p className="text-gray-300">Transactions</p>
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