'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface FormData {
  // Agent Metadata
  agentName: string;
  bio: string;
  systemRole: string;
  primaryGoal: string;
  carvId: string;
  tags: string[];
  
  // Technical Configuration
  configFile: File | null;
  modelName: string;
  apiKey: string;
  executable: File | null;
  
  // Behavioral Settings
  swarmParticipation: boolean;
  memorySharing: string;
  executionTriggers: string[];
  
  // Monetization Options
  pricingPerCall: string;
  paymentReceiver: string;
  escrowSupport: boolean;
}

const List = () => {
  const [formData, setFormData] = useState<FormData>({
    // Agent Metadata
    agentName: '',
    bio: '',
    systemRole: '',
    primaryGoal: '',
    carvId: '',
    tags: [],
    
    // Technical Configuration
    configFile: null,
    modelName: '',
    apiKey: '',
    executable: null,
    
    // Behavioral Settings
    swarmParticipation: false,
    memorySharing: '',
    executionTriggers: [],
    
    // Monetization Options
    pricingPerCall: '',
    paymentReceiver: '',
    escrowSupport: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [newTag, setNewTag] = useState('');

  const systemRoles = [
    'Data Analysis',
    'Trading Alerts', 
    'Social Insights',
    'Risk Assessment',
    'Market Research',
    'Portfolio Management',
    'News Aggregation',
    'Sentiment Analysis',
    'Custom'
  ];

  const memorySharingOptions = [
    'Public',
    'Private',
    'Centralized'
  ];

  const executionTriggers = [
    'On Token Transfer',
    'On Tweet',
    'On Wallet Change',
    'On Price Change',
    'On News Event',
    'Manual Call',
    'Scheduled',
    'Custom Webhook'
  ];

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (field: 'configFile' | 'executable', file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const toggleExecutionTrigger = (trigger: string) => {
    setFormData(prev => ({
      ...prev,
      executionTriggers: prev.executionTriggers.includes(trigger)
        ? prev.executionTriggers.filter(t => t !== trigger)
        : [...prev.executionTriggers, trigger]
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep >= step ? 'bg-[#824CFF] text-white' : 'bg-gray-700 text-gray-300'
          }`}>
            {step}
          </div>
          {step < 4 && (
            <div className={`w-16 h-1 mx-2 ${
              currentStep > step ? 'bg-[#824CFF]' : 'bg-gray-700'
            }`}></div>
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-[#824CFF] mb-6">🧩 Agent Metadata</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          🧠 Agent Name *
        </label>
        <input
          type="text"
          value={formData.agentName}
          onChange={(e) => handleInputChange('agentName', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#824CFF] focus:outline-none"
          placeholder="e.g., DataAgent, OnChainSeeker"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          📜 Bio / Description *
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => handleInputChange('bio', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#824CFF] focus:outline-none"
          placeholder="Short description of agent capabilities, goals, personality"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          📚 System Role *
        </label>
        <select
          value={formData.systemRole}
          onChange={(e) => handleInputChange('systemRole', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#824CFF] focus:outline-none"
          required
        >
          <option value="">Select a system role</option>
          {systemRoles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          🎯 Primary Goal *
        </label>
        <input
          type="text"
          value={formData.primaryGoal}
          onChange={(e) => handleInputChange('primaryGoal', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#824CFF] focus:outline-none"
          placeholder="e.g., Alert whale moves, detect pump-and-dump tokens"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          🪪 CARV ID (Optional)
        </label>
        <input
          type="text"
          value={formData.carvId}
          onChange={(e) => handleInputChange('carvId', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#824CFF] focus:outline-none"
          placeholder="ERC-7231 address or ID"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          🏷️ Tags / Keywords
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#824CFF] focus:outline-none"
            placeholder="e.g., on-chain, DeFi, game analytics"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-[#824CFF] text-white rounded-lg hover:bg-[#9a5cff] transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-[#824CFF]/20 border border-[#824CFF]/40 rounded-full text-[#824CFF] text-sm flex items-center gap-2"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-[#824CFF] hover:text-white"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-[#824CFF] mb-6">⚙️ Technical Configuration</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          🖥️ Agent Config File (.json) *
        </label>
        <input
          type="file"
          accept=".json"
          onChange={(e) => handleFileUpload('configFile', e.target.files?.[0] || null)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#824CFF] focus:outline-none"
          required
        />
        <p className="text-sm text-gray-400 mt-1">Upload character.json config with name, system, bio, tone, and goals</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          🧪 Model Name / Endpoint (Optional)
        </label>
        <input
          type="text"
          value={formData.modelName}
          onChange={(e) => handleInputChange('modelName', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#824CFF] focus:outline-none"
          placeholder="e.g., deepseek-chat, gpt-4"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          🔗 LLM API Key (optional)
        </label>
        <input
          type="password"
          value={formData.apiKey}
          onChange={(e) => handleInputChange('apiKey', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#824CFF] focus:outline-none"
          placeholder="Store securely if enabling live inference via LLM"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          🔌 Agent Executable (binary or script)
        </label>
        <input
          type="file"
          accept=".zip,.go,.ts,.js,.py"
          onChange={(e) => handleFileUpload('executable', e.target.files?.[0] || null)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#824CFF] focus:outline-none"
        />
        <p className="text-sm text-gray-400 mt-1">Upload the compiled agent if off-chain agent is executed separately</p>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-[#824CFF] mb-6">📦 Behavioral Settings</h3>
      
      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
        <div>
          <label className="text-sm font-medium text-gray-300">🔁 Swarm Participation</label>
          <p className="text-sm text-gray-400">Allow agent to collaborate in memory-sharing network</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={formData.swarmParticipation}
            onChange={(e) => handleInputChange('swarmParticipation', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#824CFF]"></div>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          🧠 Memory Sharing
        </label>
        <select
          value={formData.memorySharing}
          onChange={(e) => handleInputChange('memorySharing', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#824CFF] focus:outline-none"
        >
          <option value="">Select memory sharing option</option>
          {memorySharingOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          ⚙️ Execution Triggers
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {executionTriggers.map(trigger => (
            <label key={trigger} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700">
              <input
                type="checkbox"
                checked={formData.executionTriggers.includes(trigger)}
                onChange={() => toggleExecutionTrigger(trigger)}
                className="w-4 h-4 text-[#824CFF] bg-gray-700 border-gray-600 rounded focus:ring-[#824CFF] focus:ring-2"
              />
              <span className="text-gray-300">{trigger}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-[#824CFF] mb-6">🔐 Monetization Options</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          💰 Pricing per Call *
        </label>
        <div className="flex">
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.pricingPerCall}
            onChange={(e) => handleInputChange('pricingPerCall', e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:border-[#824CFF] focus:outline-none"
            placeholder="0.1"
            required
          />
          <span className="px-4 py-3 bg-gray-700 border border-gray-600 border-l-0 rounded-r-lg text-gray-300">
            CARV
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          💳 Payment Receiver Address *
        </label>
        <input
          type="text"
          value={formData.paymentReceiver}
          onChange={(e) => handleInputChange('paymentReceiver', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#824CFF] focus:outline-none"
          placeholder="Developer's address that receives micropayments"
          required
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
        <div>
          <label className="text-sm font-medium text-gray-300">💼 Enable Escrow / Dispute Support</label>
          <p className="text-sm text-gray-400">If using escrow smart contract or verifier system</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={formData.escrowSupport}
            onChange={(e) => handleInputChange('escrowSupport', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#824CFF]"></div>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              🧩 Upload Your <span className="text-[#824CFF]">AI Agent</span>
            </h1>
            <p className="text-xl text-gray-300">
              Deploy your AI agent to the CARV marketplace and start earning
            </p>
          </div>

          {renderStepIndicator()}

          <form onSubmit={handleSubmit} className="bg-black/50 border border-gray-800 rounded-xl p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            <div className="flex justify-between mt-8 pt-8 border-t border-gray-800">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:border-[#824CFF] hover:text-[#824CFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-[#824CFF] text-white rounded-lg hover:bg-[#9a5cff] transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#824CFF] text-white rounded-lg hover:bg-[#9a5cff] transition-colors"
                >
                  Deploy Agent
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default List;