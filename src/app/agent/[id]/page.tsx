'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AgentDetails() {
  const params = useParams();
  const agentId = params.id;
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // Mock agent data - in real app, this would come from API
  const agent = {
    id: agentId,
    name: 'DataAnalyzer Pro',
    category: 'Data Analysis',
    description: 'Advanced statistical analysis agent with machine learning capabilities for research data processing and visualization. Features real-time data processing, automated insights generation, and comprehensive reporting tools.',
    price: '20 OG',
    calls: '0.05 OG per call',
    accuracy: '94.2%',
    provider: 'Data Science Lab',
    tags: ['analysis', 'statistics', 'ml', 'visualization', 'research'],
    verified: true,
    users: 2341,
    rating: 4.8,
    reviews: 156,
    modelType: 'GPT-4 Fine-tuned',
    verificationType: 'TEE (Trusted Execution Environment)',
    responseTime: '500ms',
    maxRequests: '10,000 per day',
    supportedFormats: 'JSON, CSV, TXT, PDF, Excel',
    license: 'MIT',
    version: '2.1.0',
    githubRepo: 'https://github.com/datasciencelab/dataanalyzer-pro',
    documentation: 'https://docs.dataanalyzer-pro.com',
    apiEndpoint: 'https://api.dataanalyzer-pro.com/v2',
    website: 'https://dataanalyzer-pro.com',
    contactEmail: 'support@datasciencelab.com',
    useCases: [
      'Financial data analysis and forecasting',
      'Scientific research data processing',
      'Business intelligence and reporting',
      'Market research and trend analysis',
      'Quality control and anomaly detection'
    ],
    technicalRequirements: [
      'Minimum 4GB RAM',
      'Python 3.8+',
      'TensorFlow 2.0+',
      'Pandas, NumPy, Scikit-learn',
      'Internet connection for API calls'
    ],
    features: [
      'Real-time data processing',
      'Automated insights generation',
      'Interactive visualizations',
      'Custom report generation',
      'API integration',
      'Batch processing support',
      'Data validation and cleaning',
      'Statistical analysis suite'
    ],
    pricing: {
      basePrice: '20 OG',
      perCall: '0.05 OG',
      monthly: '500 OG',
      enterprise: 'Contact for pricing'
    },
    performance: {
      accuracy: 94.2,
      responseTime: 500,
      uptime: 99.9,
      throughput: '1000 requests/hour'
    },
    reviews: [
      {
        id: 1,
        user: 'Research Scientist',
        rating: 5,
        comment: 'Excellent tool for data analysis. Very accurate and fast.',
        date: '2024-01-15'
      },
      {
        id: 2,
        user: 'Data Analyst',
        rating: 4,
        comment: 'Great features but could use better documentation.',
        date: '2024-01-10'
      },
      {
        id: 3,
        user: 'ML Engineer',
        rating: 5,
        comment: 'Perfect for our research needs. Highly recommended!',
        date: '2024-01-08'
      }
    ]
  };

  const handlePurchase = () => {
    setShowPurchaseModal(true);
  };

  const confirmPurchase = () => {
    alert(`Purchase successful! You have bought ${agent.name} for ${agent.price}`);
    setShowPurchaseModal(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-400'}>
        ⭐
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">{agent.name}</h1>
                  <div className="flex items-center gap-4 text-gray-300">
                    <span className="bg-blue-600/20 border border-blue-500/30 px-3 py-1 rounded-full text-blue-400 text-sm">
                      {agent.category}
                    </span>
                    {agent.verified && (
                      <span className="bg-green-600/20 border border-green-500/30 px-3 py-1 rounded-full text-green-400 text-sm">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-xl text-gray-300 mb-8">{agent.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{agent.rating}</div>
                  <div className="text-sm text-gray-400">Rating</div>
                  <div className="flex justify-center mt-1">
                    {renderStars(agent.rating)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{agent.users.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{agent.accuracy}</div>
                  <div className="text-sm text-gray-400">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">{agent.responseTime}</div>
                  <div className="text-sm text-gray-400">Response Time</div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {agent.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-gray-300 text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Purchase Card */}
            <div className="lg:col-span-1">
              <div className="bg-black/50 border border-gray-800 rounded-xl p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{agent.price}</div>
                  <div className="text-gray-400">{agent.calls}</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Provider:</span>
                    <span className="text-blue-400">{agent.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Version:</span>
                    <span className="text-gray-300">{agent.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">License:</span>
                    <span className="text-gray-300">{agent.license}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Verification:</span>
                    <span className="text-green-400">{agent.verificationType}</span>
                  </div>
                </div>

                <button
                  onClick={handlePurchase}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200 mb-4"
                >
                  Purchase Agent
                </button>

                <div className="space-y-2">
                  <button className="w-full border border-gray-600 text-gray-300 hover:border-gray-500 py-2 rounded-lg transition-colors">
                    View Documentation
                  </button>
                  <button className="w-full border border-gray-600 text-gray-300 hover:border-gray-500 py-2 rounded-lg transition-colors">
                    Try Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="border-b border-gray-800">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', name: 'Overview' },
                { id: 'features', name: 'Features' },
                { id: 'pricing', name: 'Pricing' },
                { id: 'reviews', name: 'Reviews' },
                { id: 'technical', name: 'Technical' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Use Cases</h3>
                <ul className="space-y-3">
                  {agent.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span className="text-gray-300">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6">Performance Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Accuracy</span>
                      <span className="text-blue-400">{agent.performance.accuracy}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${agent.performance.accuracy}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Response Time</span>
                      <span className="text-green-400">{agent.performance.responseTime}ms</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Uptime</span>
                      <span className="text-purple-400">{agent.performance.uptime}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${agent.performance.uptime}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agent.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-black/50 border border-gray-800 rounded-lg">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Pricing Plans</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                  <h4 className="text-xl font-bold mb-4">Pay Per Use</h4>
                  <div className="text-3xl font-bold text-blue-400 mb-2">{agent.pricing.perCall}</div>
                  <p className="text-gray-400 mb-4">per API call</p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• No upfront cost</li>
                    <li>• Pay only for usage</li>
                    <li>• Perfect for testing</li>
                  </ul>
                </div>
                <div className="bg-black/50 border border-blue-500 rounded-xl p-6 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                    Popular
                  </div>
                  <h4 className="text-xl font-bold mb-4">Monthly Subscription</h4>
                  <div className="text-3xl font-bold text-blue-400 mb-2">{agent.pricing.monthly}</div>
                  <p className="text-gray-400 mb-4">per month</p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Up to 10,000 calls</li>
                    <li>• Priority support</li>
                    <li>• Advanced features</li>
                  </ul>
                </div>
                <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                  <h4 className="text-xl font-bold mb-4">Enterprise</h4>
                  <div className="text-3xl font-bold text-blue-400 mb-2">Custom</div>
                  <p className="text-gray-400 mb-4">contact for pricing</p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Unlimited calls</li>
                    <li>• Dedicated support</li>
                    <li>• Custom integration</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">User Reviews</h3>
              <div className="space-y-6">
                {agent.reviews.map((review) => (
                  <div key={review.id} className="bg-black/50 border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">{review.user}</h4>
                        <div className="flex items-center gap-2">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-400">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'technical' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Technical Specifications</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Model Type:</span>
                    <span className="text-blue-400">{agent.modelType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Verification:</span>
                    <span className="text-green-400">{agent.verificationType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Max Requests:</span>
                    <span className="text-gray-300">{agent.maxRequests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Supported Formats:</span>
                    <span className="text-gray-300">{agent.supportedFormats}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6">Technical Requirements</h3>
                <ul className="space-y-3">
                  {agent.technicalRequirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span className="text-gray-300">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Confirm Purchase</h3>
              <button 
                onClick={() => setShowPurchaseModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h4 className="font-semibold">{agent.name}</h4>
                  <p className="text-sm text-gray-400">{agent.category}</p>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Price:</span>
                  <span className="text-2xl font-bold text-blue-400">{agent.price}</span>
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {agent.calls}
                </div>
              </div>
              
              <div className="text-sm text-gray-300">
                <p>• Verified provider: {agent.provider}</p>
                <p>• Quality rating: ⭐ {agent.rating}</p>
                <p>• ✓ Verified and audited</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowPurchaseModal(false)}
                className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmPurchase}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
