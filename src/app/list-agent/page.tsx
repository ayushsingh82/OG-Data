'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ListAgent() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    modelType: '',
    accuracy: '',
    provider: '',
    tags: '',
    githubRepo: '',
    documentation: '',
    apiEndpoint: '',
    verificationType: 'TEE',
    maxRequests: '',
    responseTime: '',
    supportedFormats: '',
    useCases: '',
    technicalRequirements: '',
    license: 'MIT',
    version: '1.0.0',
    contactEmail: '',
    website: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    'Data Analysis',
    'Research Assistant', 
    'Networking',
    'Natural Language Processing',
    'Computer Vision',
    'Machine Learning',
    'Blockchain Analytics',
    'Scientific Computing',
    'Business Intelligence',
    'Other'
  ];

  const verificationTypes = [
    'TEE (Trusted Execution Environment)',
    'Zero-Knowledge Proof',
    'Consensus Verification',
    'Hybrid Verification'
  ];

  const licenses = [
    'MIT',
    'Apache 2.0',
    'GPL v3',
    'BSD 3-Clause',
    'Commercial',
    'Custom'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      // Here you would integrate with your backend API
      console.log('Submitting agent:', formData);
      console.log('Uploaded files:', uploadedFiles);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Agent successfully listed on the marketplace!');
      
      // Reset form
      setFormData({
        name: '',
        category: '',
        description: '',
        price: '',
        modelType: '',
        accuracy: '',
        provider: '',
        tags: '',
        githubRepo: '',
        documentation: '',
        apiEndpoint: '',
        verificationType: 'TEE',
        maxRequests: '',
        responseTime: '',
        supportedFormats: '',
        useCases: '',
        technicalRequirements: '',
        license: 'MIT',
        version: '1.0.0',
        contactEmail: '',
        website: ''
      });
      setUploadedFiles([]);
      
    } catch (error) {
      console.error('Error listing agent:', error);
      alert('Error listing agent. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-6">
              🚀 List Your AI Agent
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              List Your <span className="text-blue-500">AI Agent</span> on OG-Data
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Monetize your AI models and reach thousands of users. Get paid in OG tokens 
              with verifiable execution and transparent pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-blue-400">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Agent Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., DataAnalyzer Pro"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Describe what your AI agent does, its capabilities, and use cases..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price (OG Tokens) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., 20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Provider/Organization *</label>
                  <input
                    type="text"
                    name="provider"
                    value={formData.provider}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., Data Science Lab"
                  />
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-blue-400">Technical Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Model Type</label>
                  <input
                    type="text"
                    name="modelType"
                    value={formData.modelType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., GPT-4, Llama-3, Custom Model"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Accuracy (%)</label>
                  <input
                    type="number"
                    name="accuracy"
                    value={formData.accuracy}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., 94.2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Verification Type *</label>
                  <select
                    name="verificationType"
                    value={formData.verificationType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    {verificationTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Response Time (ms)</label>
                  <input
                    type="number"
                    name="responseTime"
                    value={formData.responseTime}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., 500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Max Requests per Day</label>
                  <input
                    type="number"
                    name="maxRequests"
                    value={formData.maxRequests}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., 10000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Supported Formats</label>
                  <input
                    type="text"
                    name="supportedFormats"
                    value={formData.supportedFormats}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., JSON, CSV, TXT, PDF"
                  />
                </div>
              </div>
            </div>

            {/* Links and Documentation */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-blue-400">Links & Documentation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">GitHub Repository</label>
                  <input
                    type="url"
                    name="githubRepo"
                    value={formData.githubRepo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Documentation URL</label>
                  <input
                    type="url"
                    name="documentation"
                    value={formData.documentation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="https://docs.example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">API Endpoint</label>
                  <input
                    type="url"
                    name="apiEndpoint"
                    value={formData.apiEndpoint}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="https://api.example.com/v1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-blue-400">Additional Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., nlp, analysis, research, automation"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Use Cases</label>
                  <textarea
                    name="useCases"
                    value={formData.useCases}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Describe specific use cases and applications..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Technical Requirements</label>
                  <textarea
                    name="technicalRequirements"
                    value={formData.technicalRequirements}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Describe any technical requirements or dependencies..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">License</label>
                    <select
                      name="license"
                      value={formData.license}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      {licenses.map(license => (
                        <option key={license} value={license}>{license}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Version</label>
                    <input
                      type="text"
                      name="version"
                      value={formData.version}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="1.0.0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Contact Email</label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="contact@example.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-blue-400">Upload Files (Optional)</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Model Files, Documentation, Examples</label>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
                    accept=".zip,.tar,.gz,.pdf,.md,.txt,.json,.py,.js,.ts"
                  />
                  <p className="text-sm text-gray-400 mt-2">
                    Supported formats: ZIP, TAR, GZ, PDF, MD, TXT, JSON, PY, JS, TS
                  </p>
                </div>
                {uploadedFiles.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Uploaded Files:</h3>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                          <span className="text-sm">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isUploading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
              >
                {isUploading ? 'Listing Agent...' : 'List Agent on Marketplace'}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
