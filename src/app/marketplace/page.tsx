'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PaymentModal from '../components/PaymentModal';

// Enhanced interfaces for Wave 3 & 4 features
interface ResearchDataset {
  id: number;
  title: string;
  category: string;
  description: string;
  price: string;
  provider: string;
  downloads: number;
  tags: string[];
  verified: boolean;
  users: number;
  rating: number;
  // Wave 3 additions
  version: string;
  versionHistory: string[];
  lastUpdated: string;
  trustScore: number;
  verificationScore: number;
  communityScore: number;
  // Wave 4 additions
  nftId?: number;
  isNFT: boolean;
  royalties: number;
  stakingAmount: number;
  governanceVotes: number;
}

interface AIAgent {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  provider: string;
  users: number;
  tags: string[];
  verified: boolean;
  rating: number;
  // Wave 3 additions
  version: string;
  versionHistory: string[];
  lastUpdated: string;
  trustScore: number;
  verificationScore: number;
  communityScore: number;
  // Wave 4 additions
  nftId?: number;
  isNFT: boolean;
  royalties: number;
  stakingAmount: number;
  governanceVotes: number;
}

interface ResearchTool {
  id: number;
  title: string;
  category: string;
  description: string;
  price: string;
  provider: string;
  users: number;
  tags: string[];
  verified: boolean;
  rating: number;
  type: string;
  // Wave 3 additions
  version: string;
  versionHistory: string[];
  lastUpdated: string;
  trustScore: number;
  verificationScore: number;
  communityScore: number;
  // Wave 4 additions
  nftId?: number;
  isNFT: boolean;
  royalties: number;
  stakingAmount: number;
  governanceVotes: number;
}

type MarketplaceItem = ResearchDataset | AIAgent | ResearchTool;

// Type guards
const isDataset = (item: MarketplaceItem): item is ResearchDataset => {
  return 'downloads' in item;
};

// const isAgent = (item: MarketplaceItem): item is AIAgent => {
//   return 'name' in item && !('type' in item);
// };

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
  // const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showCommunityReviews, setShowCommunityReviews] = useState(false);
  const [showGovernance, setShowGovernance] = useState(false);

  const categories = [
    { id: 'all', name: 'All', icon: '🔬' },
    { id: 'datasets', name: 'Datasets', icon: '📊' },
    { id: 'agents', name: 'AI Agents', icon: '🤖' },
    { id: 'tools', name: 'Research Tools', icon: '🛠️' },
    { id: 'models', name: 'AI Models', icon: '🧠' },
    { id: 'services', name: 'Services', icon: '⚡' },
  ];

  // Enhanced sample data with Wave 3 & 4 features
  const researchDatasets: ResearchDataset[] = [
    {
      id: 1,
      title: 'Genomic Sequencing Dataset v2.1',
      category: 'Biotechnology',
      description: 'Comprehensive genomic data with enhanced privacy protection and updated annotations.',
      price: '25 OG',
      provider: 'BioGen Labs',
      downloads: 1250,
      tags: ['genomics', 'biotech', 'medical', 'privacy-enhanced'],
      verified: true,
      users: 89,
      rating: 4.8,
      version: '2.1.0',
      versionHistory: ['1.0.0', '1.5.0', '2.0.0', '2.1.0'],
      lastUpdated: '2024-01-15',
      trustScore: 95,
      verificationScore: 98,
      communityScore: 92,
      nftId: 1001,
      isNFT: true,
      royalties: 5,
      stakingAmount: 5000,
      governanceVotes: 156
    },
    {
      id: 2,
      title: 'Climate Change Models v1.3',
      category: 'Climate Science',
      description: 'Advanced climate modeling data with improved accuracy and extended time series.',
      price: '18 OG',
      provider: 'ClimateAI',
      downloads: 890,
      tags: ['climate', 'environment', 'modeling', 'sustainability'],
      verified: true,
      users: 67,
      rating: 4.6,
      version: '1.3.0',
      versionHistory: ['1.0.0', '1.1.0', '1.2.0', '1.3.0'],
      lastUpdated: '2024-01-12',
      trustScore: 88,
      verificationScore: 90,
      communityScore: 85,
      nftId: 1002,
      isNFT: true,
      royalties: 3,
      stakingAmount: 3200,
      governanceVotes: 98
    },
    {
      id: 3,
      title: 'Quantum Computing Benchmarks v3.0',
      category: 'Physics',
      description: 'Latest quantum computing performance benchmarks across multiple platforms.',
      price: '35 OG',
      provider: 'QuantumTech',
      downloads: 456,
      tags: ['quantum', 'computing', 'benchmarks', 'physics'],
      verified: true,
      users: 34,
      rating: 4.9,
      version: '3.0.0',
      versionHistory: ['1.0.0', '2.0.0', '2.5.0', '3.0.0'],
      lastUpdated: '2024-01-18',
      trustScore: 92,
      verificationScore: 95,
      communityScore: 89,
      nftId: 1003,
      isNFT: true,
      royalties: 7,
      stakingAmount: 7500,
      governanceVotes: 203
    }
  ];

  const aiAgents: AIAgent[] = [
    {
      id: 1,
      name: 'DeFi Analysis Bot v2.2',
      category: 'Blockchain Analytics',
      description: 'Advanced DeFi protocol analysis with enhanced risk assessment capabilities.',
      price: '15 OG',
      provider: 'DeFiInsights',
      users: 234,
      tags: ['defi', 'blockchain', 'analytics', 'risk-assessment'],
      verified: true,
      rating: 4.7,
      version: '2.2.0',
      versionHistory: ['1.0.0', '1.5.0', '2.0.0', '2.1.0', '2.2.0'],
      lastUpdated: '2024-01-16',
      trustScore: 91,
      verificationScore: 93,
      communityScore: 88,
      nftId: 2001,
      isNFT: true,
      royalties: 4,
      stakingAmount: 2800,
      governanceVotes: 127
    },
    {
      id: 2,
      name: 'Medical Research Assistant v1.8',
      category: 'Medical AI',
      description: 'AI assistant for medical research with improved accuracy and new disease models.',
      price: '22 OG',
      provider: 'MedAI Solutions',
      users: 156,
      tags: ['medical', 'research', 'ai', 'healthcare'],
      verified: true,
      rating: 4.8,
      version: '1.8.0',
      versionHistory: ['1.0.0', '1.2.0', '1.4.0', '1.6.0', '1.8.0'],
      lastUpdated: '2024-01-14',
      trustScore: 94,
      verificationScore: 96,
      communityScore: 91,
      nftId: 2002,
      isNFT: true,
      royalties: 6,
      stakingAmount: 4200,
      governanceVotes: 189
    }
  ];

  const researchTools: ResearchTool[] = [
    {
      id: 1,
      title: 'Data Visualization Suite v4.1',
      category: 'Analytics',
      description: 'Comprehensive data visualization tools with new chart types and export options.',
      price: '12 OG',
      provider: 'VizTech',
      users: 445,
      tags: ['visualization', 'analytics', 'charts', 'data'],
      verified: true,
      rating: 4.5,
      type: 'Software',
      version: '4.1.0',
      versionHistory: ['3.0.0', '3.5.0', '4.0.0', '4.1.0'],
      lastUpdated: '2024-01-13',
      trustScore: 87,
      verificationScore: 89,
      communityScore: 84,
      nftId: 3001,
      isNFT: true,
      royalties: 2,
      stakingAmount: 1800,
      governanceVotes: 76
    }
  ];

  const allItems: MarketplaceItem[] = [...researchDatasets, ...aiAgents, ...researchTools];
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
      case 'trust-score':
        items.sort((a, b) => b.trustScore - a.trustScore);
        break;
      case 'downloads':
        items.sort((a, b) => {
          const aCount = isDataset(a) ? a.downloads : a.users;
          const bCount = isDataset(b) ? b.downloads : b.users;
          return bCount - aCount;
        });
        break;
      case 'recent':
        items.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      default:
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

  const renderTrustScore = (item: MarketplaceItem) => {
    const getScoreColor = (score: number) => {
      if (score >= 90) return 'text-green-400';
      if (score >= 80) return 'text-yellow-400';
      if (score >= 70) return 'text-orange-400';
      return 'text-red-400';
    };

    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-400">Trust:</span>
          <span className={`text-sm font-semibold ${getScoreColor(item.trustScore)}`}>
            {item.trustScore}%
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-400">Verification:</span>
          <span className={`text-sm font-semibold ${getScoreColor(item.verificationScore)}`}>
            {item.verificationScore}%
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-400">Community:</span>
          <span className={`text-sm font-semibold ${getScoreColor(item.communityScore)}`}>
            {item.communityScore}%
          </span>
        </div>
      </div>
    );
  };

  const renderVersionInfo = (item: MarketplaceItem) => (
    <div className="flex items-center space-x-2 text-xs text-gray-400">
      <span>v{item.version}</span>
      <span>•</span>
      <span>Updated {item.lastUpdated}</span>
      <button
        onClick={() => console.log('View version history')}
        className="text-blue-400 hover:text-blue-300 underline"
      >
        View History
      </button>
    </div>
  );

  const renderNFTInfo = (item: MarketplaceItem) => (
    <div className="flex items-center space-x-2 text-xs">
      {item.isNFT && (
        <div className="flex items-center space-x-1">
          <span className="text-purple-400">🖼️</span>
          <span className="text-purple-400">NFT #{item.nftId}</span>
        </div>
      )}
      <div className="flex items-center space-x-1">
        <span className="text-green-400">💰</span>
        <span className="text-green-400">{item.royalties}% royalties</span>
      </div>
      <div className="flex items-center space-x-1">
        <span className="text-blue-400">🔒</span>
        <span className="text-blue-400">{item.stakingAmount} OG staked</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            OG-Data Marketplace
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Verifiable AI Data & Agent Marketplace with Community Governance
          </p>
          
          {/* Wave 3 & 4 Features Banner */}
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-green-400">✅</span>
                <span>Version Tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">🔍</span>
                <span>Community Curation</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">🛡️</span>
                <span>Cryptographic Verification</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">🖼️</span>
                <span>NFT Tokenization</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-red-400">🏛️</span>
                <span>DAO Governance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search datasets, agents, and tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Filters
            </button>
            <button
              onClick={() => setShowCommunityReviews(!showCommunityReviews)}
              className="px-4 py-3 bg-blue-600 border border-blue-500 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Community Reviews
            </button>
            <button
              onClick={() => setShowGovernance(!showGovernance)}
              className="px-4 py-3 bg-purple-600 border border-purple-500 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Governance
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 100 }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="trust-score">Trust Score</option>
                  <option value="downloads">Downloads/Users</option>
                  <option value="recent">Recently Updated</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Verification</label>
                <select
                  value={verificationFilter}
                  onChange={(e) => setVerificationFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                >
                  <option value="all">All Items</option>
                  <option value="verified">Verified Only</option>
                  <option value="unverified">Unverified Only</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems().map(item => {
            const title = isDataset(item) || isTool(item) ? item.title : item.name;
            const downloads = isDataset(item) ? item.downloads : item.users;
            
            return (
              <div key={item.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                  {item.verified && (
                    <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                      ✓ Verified
                    </span>
                  )}
                </div>
                
                <p className="text-gray-300 mb-4 line-clamp-3">{item.description}</p>
                
                <div className="space-y-2 mb-4">
                  {renderVersionInfo(item)}
                  {renderTrustScore(item)}
                  {renderNFTInfo(item)}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>⭐ {item.rating}</span>
                    <span>👥 {downloads}</span>
                    <span>🏷️ {item.category}</span>
                  </div>
                  <div className="text-lg font-bold text-purple-400">{item.price}</div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="text-gray-500 text-xs">+{item.tags.length - 3} more</span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePurchase(item)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Purchase
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems().length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No items found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        item={selectedItem}
        onSuccess={confirmPurchase}
      />

      <Footer />
    </div>
  );
}