// Fine-tuning component for 0G Compute Network

'use client';

import React, { useState } from 'react';
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
  const [broker, setBroker] = useState<FineTuningBrokerInstance | null>(null);
  const [balance, setBalance] = useState<string>('');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [datasetHash, setDatasetHash] = useState<string>('');
  const [configFile, setConfigFile] = useState<File | null>(null);
  const [dataSize, setDataSize] = useState<string>('');
  const [taskId, setTaskId] = useState<string>('');
  const [taskDetails, setTaskDetails] = useState<Task | null>(null);
  const [taskLogs, setTaskLogs] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Connect wallet and broker
  const connect = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask');
        return;
      }
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const brokerInstance = (await createZGComputeNetworkBroker(signer)) as unknown as FineTuningBrokerInstance;
      setBroker(brokerInstance);

      // Check balance
      const account = await brokerInstance.ledger.getLedger();
      setBalance(ethers.formatEther(account.availableBalance));
    } catch (err) {
      setError('Failed to connect: ' + (err as Error).message);
    }
  };

  // Fund account
  const fund = async () => {
    if (!broker) return;
    try {
      setLoading(true);
      await broker.ledger.addLedger(0.1);
      const account = await broker.ledger.getLedger();
      setBalance(ethers.formatEther(account.availableBalance));
    } catch (err) {
      setError('Failed to fund account: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // List providers
  const listProviders = async () => {
    if (!broker || !broker.fineTuning) {
      setError('Fine-tuning features not available in this SDK version. Please use the CLI tool.');
      return;
    }
    try {
      setLoading(true);
      const providersList = await broker.fineTuning.listProviders();
      setProviders(providersList);
    } catch (err) {
      setError('Failed to list providers: ' + (err as Error).message);
      // Fallback: Show mock providers for UI demonstration
      setProviders([
        { address: '0xf07240Efa67755B5311bc75784a061eDB47165Dd', available: true, pricePerByte: BigInt('1000000000000000') },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // List models
  const listModels = async () => {
    if (!broker || !broker.fineTuning) {
      setError('Fine-tuning features not available in this SDK version. Please use the CLI tool.');
      // Fallback: Show mock models
      setModels([
        { name: 'llama-3.1-8b', type: 'predefined' },
        { name: 'mistral-7b', type: 'predefined' },
        { name: 'qwen2-7b', type: 'predefined' },
      ]);
      return;
    }
    try {
      setLoading(true);
      const modelsList = await broker.fineTuning.listModels(selectedProvider || undefined);
      setModels(modelsList);
    } catch (err) {
      setError('Failed to list models: ' + (err as Error).message);
      // Fallback: Show mock models
      setModels([
        { name: 'llama-3.1-8b', type: 'predefined' },
        { name: 'mistral-7b', type: 'predefined' },
        { name: 'qwen2-7b', type: 'predefined' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Create task
  const createTask = async () => {
    if (!broker || !broker.fineTuning) {
      setError('Fine-tuning features not available in this SDK version. Please use the CLI tool: 0g-compute-cli create-task');
      return;
    }
    if (!selectedProvider || !selectedModel || !datasetHash || !dataSize) {
      setError('Please fill in all required fields');
      return;
    }
    try {
      setLoading(true);
      setError('');
      // Note: Config file would need to be uploaded to storage first
      const taskId = await broker.fineTuning.createTask({
        provider: selectedProvider,
        model: selectedModel,
        dataset: datasetHash,
        configPath: '', // Would need to handle file upload
        dataSize: parseInt(dataSize),
      });
      setTaskId(taskId);
      alert(`Task created successfully! Task ID: ${taskId}`);
    } catch (err) {
      setError('Failed to create task: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Get task details
  const getTask = async () => {
    if (!broker || !broker.fineTuning || !selectedProvider || !taskId) {
      setError('Please select a provider and enter a task ID');
      return;
    }
    try {
      setLoading(true);
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
    if (!broker || !broker.fineTuning || !selectedProvider || !taskId) {
      setError('Please select a provider and enter a task ID');
      return;
    }
    try {
      setLoading(true);
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
    if (!broker || !broker.fineTuning || !selectedProvider) {
      setError('Please select a provider');
      return;
    }
    try {
      setLoading(true);
      const tasksList = await broker.fineTuning.listTasks(selectedProvider);
      setTasks(tasksList);
    } catch (err) {
      setError('Failed to list tasks: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Error Display */}
      {error && (
        <div className="bg-red-900/50 border border-red-500 rounded-lg p-4">
          <div className="text-red-400 font-semibold mb-2">⚠️ Error</div>
          <div className="text-red-300 text-sm">{error}</div>
        </div>
      )}

      {/* Connection Section */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-4">Connect to 0G Fine-Tuning Network</h3>
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
                  <span className="text-blue-400 font-semibold">{balance} OG</span>
                </div>
              </div>
              <button 
                onClick={fund} 
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Fund 0.1 OG'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Providers Section */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-4">Fine-Tuning Providers</h3>
        <div className="space-y-4">
          <button
            onClick={listProviders}
            disabled={!broker || loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'List Providers'}
          </button>
          
          {providers.length > 0 && (
            <div className="space-y-3">
              {providers.map((provider) => (
                <div
                  key={provider.address}
                  className={`bg-black/50 rounded-lg p-4 border cursor-pointer transition-colors duration-200 ${
                    selectedProvider === provider.address
                      ? 'border-purple-500 bg-purple-900/20'
                      : 'border-gray-700 hover:border-purple-500/50'
                  }`}
                  onClick={() => setSelectedProvider(provider.address)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-white">{provider.address}</div>
                      <div className="text-sm text-gray-400">
                        Price: {ethers.formatEther(provider.pricePerByte)} OG per byte
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      provider.available
                        ? 'bg-green-900/50 text-green-400'
                        : 'bg-red-900/50 text-red-400'
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

      {/* Models Section */}
      {selectedProvider && (
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-bold mb-4">Available Models</h3>
          <div className="space-y-4">
            <button
              onClick={listModels}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'List Models'}
            </button>
            
            {models.length > 0 && (
              <div className="space-y-3">
                {models.map((model) => (
                  <div
                    key={`${model.provider || 'default'}-${model.name}`}
                    className={`bg-black/50 rounded-lg p-4 border cursor-pointer transition-colors duration-200 ${
                      selectedModel === model.name
                        ? 'border-indigo-500 bg-indigo-900/20'
                        : 'border-gray-700 hover:border-indigo-500/50'
                    }`}
                    onClick={() => setSelectedModel(model.name)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-white">{model.name}</div>
                        <div className="text-sm text-gray-400">
                          {model.type === 'predefined' ? 'Predefined Model' : `Provider: ${model.provider}`}
                        </div>
                      </div>
                      <div className="px-3 py-1 rounded-full text-sm bg-indigo-900/50 text-indigo-400">
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

      {/* Create Task Section */}
      {selectedProvider && selectedModel && (
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-bold mb-4">Create Fine-Tuning Task</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Dataset Root Hash (from 0G Storage) *
              </label>
              <input
                type="text"
                value={datasetHash}
                onChange={(e) => setDatasetHash(e.target.value)}
                placeholder="0xabc123..."
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Config File (JSON) *
              </label>
              <input
                type="file"
                accept=".json"
                onChange={(e) => setConfigFile(e.target.files?.[0] || null)}
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              <p className="text-xs text-gray-400 mt-1">
                Upload training configuration file (download template from releases)
              </p>
            </div>

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
            </div>

            <button
              onClick={createTask}
              disabled={!datasetHash || !dataSize || loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Task...' : 'Create Fine-Tuning Task'}
            </button>

            {taskId && (
              <div className="bg-green-900/50 border border-green-500 rounded-lg p-4">
                <div className="text-green-400 font-semibold mb-2">✓ Task Created</div>
                <div className="text-sm text-gray-300">Task ID: {taskId}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Task Management Section */}
      {selectedProvider && (
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-bold mb-4">Task Management</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={listTasks}
                disabled={loading}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                List All Tasks
              </button>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={taskId}
                  onChange={(e) => setTaskId(e.target.value)}
                  placeholder="Task ID"
                  className="flex-1 bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={getTask}
                  disabled={!taskId || loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  Get Task
                </button>
              </div>
            </div>

            {taskDetails && (
              <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
                <h4 className="font-semibold mb-3">Task Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-white">{taskDetails.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Progress:</span>
                    <span className="text-white">{taskDetails.progress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fee:</span>
                    <span className="text-white">{ethers.formatEther(taskDetails.fee)} OG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created:</span>
                    <span className="text-white">{new Date(taskDetails.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={getTaskLogs}
                  disabled={loading}
                  className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  View Logs
                </button>
              </div>
            )}

            {taskLogs && (
              <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
                <h4 className="font-semibold mb-3">Task Logs</h4>
                <pre className="text-xs text-gray-300 whitespace-pre-wrap overflow-auto max-h-64">
                  {taskLogs}
                </pre>
              </div>
            )}

            {tasks.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold">All Tasks</h4>
                {tasks.map((task) => (
                  <div key={task.id} className="bg-black/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold text-white">{task.id}</div>
                        <div className="text-sm text-gray-400">{task.model}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        task.status === 'Finished' || task.status === 'Delivered'
                          ? 'bg-green-900/50 text-green-400'
                          : task.status === 'Failed'
                          ? 'bg-red-900/50 text-red-400'
                          : 'bg-yellow-900/50 text-yellow-400'
                      }`}>
                        {task.status}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      {task.progress} • {ethers.formatEther(task.fee)} OG
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CLI Instructions */}
      <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-yellow-400">📝 CLI Alternative</h3>
        <p className="text-gray-300 text-sm mb-4">
          For full fine-tuning functionality, use the 0G Compute CLI tool:
        </p>
        <div className="bg-black/50 rounded-lg p-4 font-mono text-xs text-gray-300 space-y-2">
          <div>pnpm install @0glabs/0g-serving-broker -g</div>
          <div>0g-compute-cli list-providers</div>
          <div>0g-compute-cli create-task --provider &lt;ADDRESS&gt; --model &lt;MODEL&gt; ...</div>
        </div>
      </div>
    </div>
  );
}

