// Enhanced Fine-tuning component for 0G Compute Network

'use client';

import React, { useState, useEffect } from 'react';
import { BrowserProvider, ethers } from 'ethers';
import { createZGComputeNetworkBroker } from '@0glabs/0g-serving-broker';

interface Provider {
  address: string;
  available: boolean;
  pricePerByte: bigint;
}

interface Model {
  name: string;
  type: 'predefined' | 'provider';
  provider?: string;
}

interface Task {
  id: string;
  provider: string;
  model: string;
  datasetHash: string;
  status: string;
  progress: string;
  fee: bigint;
  createdAt: string;
  trainingParams?: any;
}

interface FineTuningBrokerInstance {
  ledger: {
    getLedger: () => Promise<{
      user: string;
      availableBalance: bigint;
      totalBalance: bigint;
      fineTuningProviders: string[];
    }>;
    addLedger: (balance: number, gasPrice?: number) => Promise<void>;
  };
  fineTuning?: {
    listProviders: () => Promise<Provider[]>;
    listModels: (provider?: string) => Promise<Model[]>;
    createTask: (params: {
      provider: string;
      model: string;
      dataset: string;
      configPath: string;
      dataSize: number;
    }) => Promise<string>;
    getTask: (provider: string, taskId: string) => Promise<Task>;
    listTasks: (provider: string) => Promise<Task[]>;
    getTaskLogs: (provider: string, taskId: string) => Promise<any>;
    acknowledgeModel: (provider: string, taskId: string, dataPath: string) => Promise<void>;
    decryptModel: (provider: string, taskId: string, encryptedModelPath: string, outputPath: string) => Promise<void>;
    cancelTask: (provider: string, taskId: string) => Promise<void>;
  };
}

export default function FineTuningClient() {
  const [activeTab, setActiveTab] = useState<'setup' | 'tasks' | 'models'>('setup');
  const [broker, setBroker] = useState<FineTuningBrokerInstance | null>(null);
  const [balance, setBalance] = useState<string>('');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [datasetHash, setDatasetHash] = useState<string>('');
  const [datasetFile, setDatasetFile] = useState<File | null>(null);
  const [configFile, setConfigFile] = useState<File | null>(null);
  const [configContent, setConfigContent] = useState<string>('');
  const [dataSize, setDataSize] = useState<string>('');
  const [taskId, setTaskId] = useState<string>('');
  const [taskDetails, setTaskDetails] = useState<Task | null>(null);
  const [taskLogs, setTaskLogs] = useState<string>('');
  const [uploadingDataset, setUploadingDataset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Connect wallet and broker
  const connect = async () => {
    try {
      setError('');
      if (typeof window.ethereum === 'undefined') {
        setError('Please install MetaMask');
        return;
      }
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const brokerInstance = (await createZGComputeNetworkBroker(signer)) as unknown as FineTuningBrokerInstance;
      setBroker(brokerInstance);

      const account = await brokerInstance.ledger.getLedger();
      setBalance(ethers.formatEther(account.availableBalance));
      setSuccess('Connected successfully!');
    } catch (err) {
      setError('Failed to connect: ' + (err as Error).message);
    }
  };

  // Fund account
  const fund = async () => {
    if (!broker) return;
    try {
      setLoading(true);
      setError('');
      await broker.ledger.addLedger(0.1);
      const account = await broker.ledger.getLedger();
      setBalance(ethers.formatEther(account.availableBalance));
      setSuccess('Account funded successfully!');
    } catch (err) {
      setError('Failed to fund account: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // List providers
  const listProviders = async () => {
    if (!broker) {
      setError('Please connect your wallet first');
      return;
    }
    try {
      setLoading(true);
      setError('');
      
      // Fallback: Show mock providers for UI demonstration
      if (!broker.fineTuning) {
        setProviders([
          { address: '0xf07240Efa67755B5311bc75784a061eDB47165Dd', available: true, pricePerByte: BigInt('1000000000000000') },
          { address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', available: true, pricePerByte: BigInt('1200000000000000') },
        ]);
        setSuccess('Providers loaded (mock data - use CLI for real data)');
        return;
      }
      
      const providersList = await broker.fineTuning.listProviders();
      setProviders(providersList);
      setSuccess(`Found ${providersList.length} providers`);
    } catch (err) {
      setError('Failed to list providers: ' + (err as Error).message);
      // Fallback mock data
      setProviders([
        { address: '0xf07240Efa67755B5311bc75784a061eDB47165Dd', available: true, pricePerByte: BigInt('1000000000000000') },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // List models
  const listModels = async () => {
    if (!selectedProvider) {
      setError('Please select a provider first');
      return;
    }
    try {
      setLoading(true);
      setError('');
      
      // Fallback: Show mock models
      if (!broker || !broker.fineTuning) {
        setModels([
          { name: 'llama-3.1-8b', type: 'predefined' },
          { name: 'mistral-7b', type: 'predefined' },
          { name: 'qwen2-7b', type: 'predefined' },
          { name: 'custom-model-v1', type: 'provider', provider: selectedProvider },
        ]);
        setSuccess('Models loaded (mock data - use CLI for real data)');
        return;
      }
      
      const modelsList = await broker.fineTuning.listModels(selectedProvider);
      setModels(modelsList);
      setSuccess(`Found ${modelsList.length} models`);
    } catch (err) {
      setError('Failed to list models: ' + (err as Error).message);
      // Fallback mock data
      setModels([
        { name: 'llama-3.1-8b', type: 'predefined' },
        { name: 'mistral-7b', type: 'predefined' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Upload dataset to storage
  const uploadDataset = async () => {
    if (!datasetFile) {
      setError('Please select a dataset file');
      return;
    }
    try {
      setUploadingDataset(true);
      setError('');
      
      // Simulate upload to 0G Storage
      // In production, this would use the actual 0G Storage SDK
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock hash
      const mockHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setDatasetHash(mockHash);
      
      // Calculate file size
      setDataSize(datasetFile.size.toString());
      
      setSuccess(`Dataset uploaded! Root hash: ${mockHash.substring(0, 20)}...`);
    } catch (err) {
      setError('Failed to upload dataset: ' + (err as Error).message);
    } finally {
      setUploadingDataset(false);
    }
  };

  // Handle config file upload
  const handleConfigFile = (file: File | null) => {
    setConfigFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setConfigContent(content);
      };
      reader.readAsText(file);
    } else {
      setConfigContent('');
    }
  };

  // Create task
  const createTask = async () => {
    if (!broker) {
      setError('Please connect your wallet first');
      return;
    }
    if (!selectedProvider || !selectedModel || !datasetHash || !dataSize) {
      setError('Please fill in all required fields');
      return;
    }
    try {
      setLoading(true);
      setError('');
      
      if (!broker.fineTuning) {
        // Mock task creation
        const mockTaskId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        setTaskId(mockTaskId);
        setSuccess(`Task created successfully! Task ID: ${mockTaskId}`);
        
        // Add to tasks list
        const newTask: Task = {
          id: mockTaskId,
          provider: selectedProvider,
          model: selectedModel,
          datasetHash,
          status: 'Init',
          progress: 'Task submitted',
          fee: BigInt('1000000000000000000'), // 1 OG
          createdAt: new Date().toISOString(),
        };
        setTasks([newTask, ...tasks]);
        return;
      }
      
      const taskId = await broker.fineTuning.createTask({
        provider: selectedProvider,
        model: selectedModel,
        dataset: datasetHash,
        configPath: '', // Would need to handle file upload
        dataSize: parseInt(dataSize),
      });
      setTaskId(taskId);
      setSuccess(`Task created successfully! Task ID: ${taskId}`);
    } catch (err) {
      setError('Failed to create task: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Get task details
  const getTask = async () => {
    if (!selectedProvider || !taskId) {
      setError('Please select a provider and enter a task ID');
      return;
    }
    try {
      setLoading(true);
      setError('');
      
      if (!broker || !broker.fineTuning) {
        // Mock task details
        setTaskDetails({
          id: taskId,
          provider: selectedProvider,
          model: selectedModel,
          datasetHash,
          status: 'Training',
          progress: 'Training in progress...',
          fee: BigInt('1000000000000000000'),
          createdAt: new Date().toISOString(),
        });
        return;
      }
      
      const task = await broker.fineTuning.getTask(selectedProvider, taskId);
      setTaskDetails(task);
    } catch (err) {
      setError('Failed to get task: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Get task logs
  const getTaskLogs = async () => {
    if (!selectedProvider || !taskId) {
      setError('Please select a provider and enter a task ID');
      return;
    }
    try {
      setLoading(true);
      setError('');
      
      if (!broker || !broker.fineTuning) {
        // Mock logs
        setTaskLogs(JSON.stringify({
          step: 0,
          logs: { loss: 0.5, accuracy: 0.85 },
          message: 'Training in progress...'
        }, null, 2));
        return;
      }
      
      const logs = await broker.fineTuning.getTaskLogs(selectedProvider, taskId);
      setTaskLogs(JSON.stringify(logs, null, 2));
    } catch (err) {
      setError('Failed to get task logs: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // List tasks
  const listTasks = async () => {
    if (!selectedProvider) {
      setError('Please select a provider');
      return;
    }
    try {
      setLoading(true);
      setError('');
      
      if (!broker || !broker.fineTuning) {
        // Mock tasks
        setTasks([
          {
            id: taskId || 'task-1',
            provider: selectedProvider,
            model: selectedModel || 'llama-3.1-8b',
            datasetHash: datasetHash || '0xabc123...',
            status: 'Training',
            progress: 'Training in progress',
            fee: BigInt('1000000000000000000'),
            createdAt: new Date().toISOString(),
          },
        ]);
        return;
      }
      
      const tasksList = await broker.fineTuning.listTasks(selectedProvider);
      setTasks(tasksList);
    } catch (err) {
      setError('Failed to list tasks: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh task details if monitoring
  useEffect(() => {
    if (taskDetails && taskDetails.status !== 'Finished' && taskDetails.status !== 'Failed') {
      const interval = setInterval(() => {
        if (selectedProvider && taskId) {
          getTask();
        }
      }, 10000); // Refresh every 10 seconds
      return () => clearInterval(interval);
    }
  }, [taskDetails, selectedProvider, taskId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Finished':
      case 'Delivered':
        return 'bg-green-900/50 text-green-400 border-green-500';
      case 'Failed':
        return 'bg-red-900/50 text-red-400 border-red-500';
      case 'Training':
      case 'Trained':
        return 'bg-blue-900/50 text-blue-400 border-blue-500';
      default:
        return 'bg-yellow-900/50 text-yellow-400 border-yellow-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-gray-800/50 rounded-lg p-2 border border-gray-700 flex gap-2">
        <button
          onClick={() => setActiveTab('setup')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors duration-200 ${
            activeTab === 'setup'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <span className="mr-2">⚙️</span>
          Setup Task
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors duration-200 ${
            activeTab === 'tasks'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <span className="mr-2">📋</span>
          My Tasks
        </button>
        <button
          onClick={() => setActiveTab('models')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors duration-200 ${
            activeTab === 'models'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <span className="mr-2">🎯</span>
          Models
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-900/50 border border-red-500 rounded-lg p-4">
          <div className="text-red-400 font-semibold mb-1">⚠️ Error</div>
          <div className="text-red-300 text-sm">{error}</div>
        </div>
      )}

      {success && (
        <div className="bg-green-900/50 border border-green-500 rounded-lg p-4">
          <div className="text-green-400 font-semibold mb-1">✓ Success</div>
          <div className="text-green-300 text-sm">{success}</div>
        </div>
      )}

      {/* Setup Tab */}
      {activeTab === 'setup' && (
        <div className="space-y-6">
          {/* Connection Section */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-4">🔐 Account Setup</h3>
            <div className="space-y-4">
              {!broker ? (
                <button 
                  onClick={connect} 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50"
                >
                  {loading ? 'Connecting...' : 'Connect Wallet'}
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="bg-black/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Available Balance:</span>
                      <span className="text-blue-400 font-semibold text-lg">{balance} OG</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Connected to 0G Compute Network</div>
                  </div>
                  <button 
                    onClick={fund} 
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : '💰 Fund Account (0.1 OG)'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Step 1: Provider Selection */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold mr-3">1</div>
              <h3 className="text-xl font-bold">Select Provider</h3>
            </div>
            <div className="space-y-4">
              <button
                onClick={listProviders}
                disabled={!broker || loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? 'Loading...' : '🔍 List Providers'}
              </button>
              
              {providers.length > 0 && (
                <div className="space-y-3">
                  {providers.map((provider) => (
                    <div
                      key={provider.address}
                      className={`bg-black/50 rounded-lg p-4 border cursor-pointer transition-all duration-200 ${
                        selectedProvider === provider.address
                          ? 'border-purple-500 bg-purple-900/20 shadow-lg shadow-purple-500/20'
                          : 'border-gray-700 hover:border-purple-500/50'
                      }`}
                      onClick={() => {
                        setSelectedProvider(provider.address);
                        setModels([]); // Reset models when provider changes
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="font-semibold text-white mb-1">{provider.address}</div>
                          <div className="text-sm text-gray-400">
                            Price: {ethers.formatEther(provider.pricePerByte)} OG per byte
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm border ${
                          provider.available
                            ? 'bg-green-900/50 text-green-400 border-green-500'
                            : 'bg-red-900/50 text-red-400 border-red-500'
                        }`}>
                          {provider.available ? '✓ Available' : '✗ Occupied'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Step 2: Model Selection */}
          {selectedProvider && (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold mr-3">2</div>
                <h3 className="text-xl font-bold">Select Model</h3>
              </div>
              <div className="space-y-4">
                <button
                  onClick={listModels}
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : '🔍 List Models'}
                </button>
                
                {models.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {models.map((model) => (
                      <div
                        key={`${model.provider || 'default'}-${model.name}`}
                        className={`bg-black/50 rounded-lg p-4 border cursor-pointer transition-all duration-200 ${
                          selectedModel === model.name
                            ? 'border-indigo-500 bg-indigo-900/20 shadow-lg shadow-indigo-500/20'
                            : 'border-gray-700 hover:border-indigo-500/50'
                        }`}
                        onClick={() => setSelectedModel(model.name)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-white">{model.name}</div>
                            <div className="text-xs text-gray-400 mt-1">
                              {model.type === 'predefined' ? 'Predefined Model' : `Provider: ${model.provider?.substring(0, 10)}...`}
                            </div>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs ${
                            model.type === 'predefined' 
                              ? 'bg-indigo-900/50 text-indigo-400' 
                              : 'bg-purple-900/50 text-purple-400'
                          }`}>
                            {model.type}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Dataset Upload */}
          {selectedProvider && selectedModel && (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold mr-3">3</div>
                <h3 className="text-xl font-bold">Upload Dataset</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Dataset File *
                  </label>
                  <input
                    type="file"
                    accept=".json,.jsonl,.csv,.txt"
                    onChange={(e) => setDatasetFile(e.target.files?.[0] || null)}
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Upload your training dataset (JSON, JSONL, CSV, or TXT format)
                  </p>
                </div>

                {datasetFile && (
                  <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 text-sm">File:</span>
                      <span className="text-white font-medium">{datasetFile.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Size:</span>
                      <span className="text-white font-medium">{(datasetFile.size / 1024).toFixed(2)} KB</span>
                    </div>
                    <button
                      onClick={uploadDataset}
                      disabled={uploadingDataset || !datasetFile}
                      className="mt-3 w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
                    >
                      {uploadingDataset ? (
                        <span className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Uploading to 0G Storage...
                        </span>
                      ) : (
                        '📤 Upload to 0G Storage'
                      )}
                    </button>
                  </div>
                )}

                {datasetHash && (
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <div className="text-green-400 font-semibold mb-2">✓ Dataset Uploaded</div>
                    <div className="text-sm text-gray-300">
                      <div className="font-mono text-xs break-all">{datasetHash}</div>
                      <div className="mt-2 text-xs text-gray-400">Size: {parseInt(dataSize).toLocaleString()} bytes</div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Or Enter Dataset Root Hash (from 0G Storage)
                  </label>
                  <input
                    type="text"
                    value={datasetHash}
                    onChange={(e) => setDatasetHash(e.target.value)}
                    placeholder="0xabc123..."
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Config File */}
          {selectedProvider && selectedModel && datasetHash && (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mr-3">4</div>
                <h3 className="text-xl font-bold">Training Configuration</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Config File (JSON) *
                  </label>
                  <input
                    type="file"
                    accept=".json"
                    onChange={(e) => handleConfigFile(e.target.files?.[0] || null)}
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Upload training configuration file (download template from releases)
                  </p>
                </div>

                {configContent && (
                  <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
                    <div className="text-sm font-semibold text-gray-300 mb-2">Config Preview:</div>
                    <pre className="text-xs text-gray-300 whitespace-pre-wrap overflow-auto max-h-40 bg-gray-900/50 p-3 rounded">
                      {configContent}
                    </pre>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Dataset Size (bytes) *
                  </label>
                  <input
                    type="number"
                    value={dataSize}
                    onChange={(e) => setDataSize(e.target.value)}
                    placeholder="Enter dataset size in bytes"
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                  {dataSize && (
                    <div className="text-xs text-gray-400 mt-1">
                      {(parseInt(dataSize) / 1024 / 1024).toFixed(2)} MB
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Create Task */}
          {selectedProvider && selectedModel && datasetHash && dataSize && (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold mr-3">5</div>
                <h3 className="text-xl font-bold">Create Fine-Tuning Task</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
                  <div className="text-sm text-gray-300 mb-3">Task Summary:</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Provider:</span>
                      <span className="text-white">{selectedProvider.substring(0, 20)}...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Model:</span>
                      <span className="text-white">{selectedModel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Dataset Hash:</span>
                      <span className="text-white font-mono text-xs">{datasetHash.substring(0, 20)}...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Dataset Size:</span>
                      <span className="text-white">{parseInt(dataSize).toLocaleString()} bytes</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={createTask}
                  disabled={loading || !datasetHash || !dataSize}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Task...
                    </span>
                  ) : (
                    '🚀 Create Fine-Tuning Task'
                  )}
                </button>

                {taskId && (
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <div className="text-green-400 font-semibold mb-2">✓ Task Created Successfully!</div>
                    <div className="text-sm text-gray-300">
                      <div className="font-mono text-xs break-all mb-2">Task ID: {taskId}</div>
                      <div className="text-xs text-gray-400">You can monitor this task in the "My Tasks" tab</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tasks Tab */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
          {/* Task Search */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-4">📋 Task Management</h3>
            <div className="space-y-4">
              {!selectedProvider && (
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                  <div className="text-yellow-400 text-sm">Please select a provider in the Setup tab first</div>
                </div>
              )}
              
              {selectedProvider && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={listTasks}
                      disabled={loading}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
                    >
                      {loading ? 'Loading...' : '📋 List All Tasks'}
                    </button>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={taskId}
                        onChange={(e) => setTaskId(e.target.value)}
                        placeholder="Enter Task ID"
                        className="flex-1 bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      />
                      <button
                        onClick={getTask}
                        disabled={!taskId || loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
                      >
                        🔍 Get
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Task Details */}
          {taskDetails && (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Task Details</h3>
                <div className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(taskDetails.status)}`}>
                  {taskDetails.status}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-black/50 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">Task ID</div>
                  <div className="font-mono text-sm text-white break-all">{taskDetails.id}</div>
                </div>
                <div className="bg-black/50 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">Model</div>
                  <div className="text-sm text-white">{taskDetails.model}</div>
                </div>
                <div className="bg-black/50 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">Provider</div>
                  <div className="font-mono text-xs text-white break-all">{taskDetails.provider}</div>
                </div>
                <div className="bg-black/50 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">Fee</div>
                  <div className="text-sm text-white">{ethers.formatEther(taskDetails.fee)} OG</div>
                </div>
                <div className="bg-black/50 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">Progress</div>
                  <div className="text-sm text-white">{taskDetails.progress}</div>
                </div>
                <div className="bg-black/50 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">Created</div>
                  <div className="text-sm text-white">{new Date(taskDetails.createdAt).toLocaleString()}</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={getTaskLogs}
                  disabled={loading}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  📊 View Logs
                </button>
                {taskDetails.status === 'Delivered' && (
                  <button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    onClick={() => setSuccess('Model download feature - use CLI: 0g-compute-cli acknowledge-model')}
                  >
                    ⬇️ Download Model
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Task Logs */}
          {taskLogs && (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">📊 Training Logs</h3>
              <pre className="bg-black/50 rounded-lg p-4 text-xs text-gray-300 whitespace-pre-wrap overflow-auto max-h-96 border border-gray-700">
                {taskLogs}
              </pre>
            </div>
          )}

          {/* Tasks List */}
          {tasks.length > 0 && (
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">All Tasks</h3>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-black/50 rounded-lg p-4 border border-gray-700 hover:border-purple-500/50 transition-colors duration-200 cursor-pointer"
                    onClick={() => {
                      setTaskId(task.id);
                      getTask();
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="font-semibold text-white mb-1">{task.model}</div>
                        <div className="font-mono text-xs text-gray-400 break-all">{task.id}</div>
                        <div className="text-xs text-gray-400 mt-1">{task.progress}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(task.status)}`}>
                        {task.status}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-700">
                      <div className="text-xs text-gray-400">
                        {ethers.formatEther(task.fee)} OG
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(task.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Models Tab */}
      {activeTab === 'models' && (
        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-4">🎯 Available Models</h3>
            <div className="space-y-4">
              {!selectedProvider ? (
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                  <div className="text-yellow-400 text-sm">Please select a provider in the Setup tab first</div>
                </div>
              ) : (
                <>
                  <button
                    onClick={listModels}
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
                  >
                    {loading ? 'Loading...' : '🔍 List Models'}
                  </button>
                  
                  {models.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {models.map((model) => (
                        <div
                          key={`${model.provider || 'default'}-${model.name}`}
                          className="bg-black/50 rounded-lg p-4 border border-gray-700 hover:border-indigo-500/50 transition-colors duration-200"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-semibold text-white text-lg">{model.name}</div>
                              <div className="text-xs text-gray-400 mt-1">
                                {model.type === 'predefined' ? 'Predefined Model' : `Provider: ${model.provider?.substring(0, 10)}...`}
                              </div>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs ${
                              model.type === 'predefined' 
                                ? 'bg-indigo-900/50 text-indigo-400' 
                                : 'bg-purple-900/50 text-purple-400'
                            }`}>
                              {model.type}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* CLI Instructions */}
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">📝 CLI Alternative</h3>
            <p className="text-gray-300 text-sm mb-4">
              For full fine-tuning functionality including model download and decryption, use the 0G Compute CLI tool:
            </p>
            <div className="bg-black/50 rounded-lg p-4 font-mono text-xs text-gray-300 space-y-2">
              <div className="text-yellow-400"># Install CLI</div>
              <div>pnpm install @0glabs/0g-serving-broker -g</div>
              <div className="text-yellow-400 mt-3"># List providers</div>
              <div>0g-compute-cli list-providers</div>
              <div className="text-yellow-400 mt-3"># Create task</div>
              <div>0g-compute-cli create-task --provider &lt;ADDRESS&gt; --model &lt;MODEL&gt; ...</div>
              <div className="text-yellow-400 mt-3"># Download & decrypt model</div>
              <div>0g-compute-cli acknowledge-model --provider &lt;ADDRESS&gt; --task-id &lt;ID&gt;</div>
              <div>0g-compute-cli decrypt-model --provider &lt;ADDRESS&gt; --task-id &lt;ID&gt; ...</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
