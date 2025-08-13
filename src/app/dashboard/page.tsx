'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'research', name: 'My Research', icon: '🔬' },
    { id: 'agents', name: 'AI Agents', icon: '🤖' },
    { id: 'collaborations', name: 'Collaborations', icon: '👥' },
    { id: 'data', name: 'Data Library', icon: '📁' },
    { id: 'grants', name: 'Grants', icon: '💰' },
  ];

  const researchProjects = [
    {
      id: 1,
      title: 'Climate Change Impact on Agricultural Yields',
      category: 'Climate Science',
      status: 'In Progress',
      collaborators: 5,
      progress: 75,
      lastUpdated: '2 days ago',
      funding: '$15,000',
    },
    {
      id: 2,
      title: 'AI-Powered Drug Discovery Pipeline',
      category: 'Biotechnology',
      status: 'Review',
      collaborators: 3,
      progress: 90,
      lastUpdated: '1 week ago',
      funding: '$25,000',
    },
    {
      id: 3,
      title: 'Quantum Computing for Optimization Problems',
      category: 'Physics',
      status: 'Planning',
      collaborators: 2,
      progress: 25,
      lastUpdated: '3 days ago',
      funding: '$10,000',
    },
  ];

  const aiAgents = [
    {
      id: 1,
      name: 'DataAnalyzer Pro',
      type: 'Data Analysis',
      status: 'Active',
      tasks: 47,
      accuracy: 94.2,
      lastUsed: '1 hour ago',
    },
    {
      id: 2,
      name: 'LiteratureReview Bot',
      type: 'Research Assistant',
      status: 'Training',
      tasks: 23,
      accuracy: 87.5,
      lastUsed: '3 hours ago',
    },
    {
      id: 3,
      name: 'CollaborationFinder',
      type: 'Networking',
      status: 'Active',
      tasks: 156,
      accuracy: 91.8,
      lastUsed: '30 minutes ago',
    },
  ];

  const stats = [
    { label: 'Active Projects', value: '8', change: '+2', changeType: 'positive' },
    { label: 'AI Agents', value: '12', change: '+3', changeType: 'positive' },
    { label: 'Collaborators', value: '24', change: '+5', changeType: 'positive' },
    { label: 'OG Tokens Earned', value: '2,450', change: '+180', changeType: 'positive' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Research Dashboard</h1>
            <p className="text-gray-400">Manage your research projects, AI agents, and collaborations</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-black/50 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-800 mb-8">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Recent Activity */}
                <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">🔬</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">New research proposal submitted</p>
                        <p className="text-sm text-gray-400">Climate Change Impact on Agricultural Yields</p>
                      </div>
                      <span className="text-sm text-gray-400">2 hours ago</span>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">🤖</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">AI Agent training completed</p>
                        <p className="text-sm text-gray-400">DataAnalyzer Pro achieved 94.2% accuracy</p>
                      </div>
                      <span className="text-sm text-gray-400">1 day ago</span>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">👥</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">New collaboration request</p>
                        <p className="text-sm text-gray-400">Dr. Sarah Chen wants to join your project</p>
                      </div>
                      <span className="text-sm text-gray-400">3 days ago</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button className="bg-blue-600 hover:bg-blue-700 p-6 rounded-xl text-left transition-colors duration-200">
                    <div className="text-2xl mb-2">🚀</div>
                    <h3 className="font-semibold mb-2">Start New Research</h3>
                    <p className="text-sm text-blue-100">Create a new research project</p>
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 p-6 rounded-xl text-left transition-colors duration-200">
                    <div className="text-2xl mb-2">🤖</div>
                    <h3 className="font-semibold mb-2">Build AI Agent</h3>
                    <p className="text-sm text-green-100">Create a custom AI tool</p>
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 p-6 rounded-xl text-left transition-colors duration-200">
                    <div className="text-2xl mb-2">👥</div>
                    <h3 className="font-semibold mb-2">Find Collaborators</h3>
                    <p className="text-sm text-purple-100">Connect with researchers</p>
                  </button>
                </div>
              </div>
            )}

            {/* Research Tab */}
            {activeTab === 'research' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">My Research Projects</h3>
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-200">
                    + New Project
                  </button>
                </div>
                <div className="grid gap-6">
                  {researchProjects.map((project) => (
                    <div key={project.id} className="bg-black/50 border border-gray-800 rounded-xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="bg-gray-700 px-2 py-1 rounded">{project.category}</span>
                            <span className={`px-2 py-1 rounded ${
                              project.status === 'In Progress' ? 'bg-blue-600/20 text-blue-400' :
                              project.status === 'Review' ? 'bg-yellow-600/20 text-yellow-400' :
                              'bg-gray-600/20 text-gray-400'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-green-400">{project.funding}</p>
                          <p className="text-sm text-gray-400">Funding</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                          <span>👥 {project.collaborators} collaborators</span>
                          <span>📅 {project.lastUpdated}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">Progress</span>
                            <div className="w-24 bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-400">{project.progress}%</span>
                          </div>
                          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                            View Details →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Agents Tab */}
            {activeTab === 'agents' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">My AI Agents</h3>
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-200">
                    + Build Agent
                  </button>
                </div>
                <div className="grid gap-6">
                  {aiAgents.map((agent) => (
                    <div key={agent.id} className="bg-black/50 border border-gray-800 rounded-xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold mb-2">{agent.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="bg-gray-700 px-2 py-1 rounded">{agent.type}</span>
                            <span className={`px-2 py-1 rounded ${
                              agent.status === 'Active' ? 'bg-green-600/20 text-green-400' :
                              'bg-yellow-600/20 text-yellow-400'
                            }`}>
                              {agent.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-blue-400">{agent.accuracy}%</p>
                          <p className="text-sm text-gray-400">Accuracy</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                          <span>📊 {agent.tasks} tasks completed</span>
                          <span>⏰ {agent.lastUsed}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                            Configure
                          </button>
                          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                            View Analytics →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Collaborations Tab */}
            {activeTab === 'collaborations' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Collaborations</h3>
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-200">
                    Find Collaborators
                  </button>
                </div>
                <div className="grid gap-6">
                  <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-4">Active Collaborations</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">SC</span>
                          </div>
                          <div>
                            <p className="font-medium">Dr. Sarah Chen</p>
                            <p className="text-sm text-gray-400">Climate Science • Stanford University</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">2 projects together</p>
                          <p className="text-xs text-gray-500">Last active: 1 day ago</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">MJ</span>
                          </div>
                          <div>
                            <p className="font-medium">Dr. Michael Johnson</p>
                            <p className="text-sm text-gray-400">AI & ML • MIT</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">1 project together</p>
                          <p className="text-xs text-gray-500">Last active: 3 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Data Library Tab */}
            {activeTab === 'data' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Data Library</h3>
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-200">
                    + Upload Data
                  </button>
                </div>
                <div className="grid gap-6">
                  <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-4">My Datasets</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">📊</span>
                          </div>
                          <div>
                            <p className="font-medium">Climate Data 2023</p>
                            <p className="text-sm text-gray-400">Temperature, precipitation, and yield data</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">2.3 GB • 15,000 records</p>
                          <p className="text-xs text-gray-500">Last updated: 1 week ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grants Tab */}
            {activeTab === 'grants' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Research Grants</h3>
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-200">
                    Apply for Grant
                  </button>
                </div>
                <div className="grid gap-6">
                  <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-4">Active Grants</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">💰</span>
                          </div>
                          <div>
                            <p className="font-medium">Climate Research Initiative</p>
                            <p className="text-sm text-gray-400">$25,000 • Deadline: Dec 15, 2024</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-sm">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}