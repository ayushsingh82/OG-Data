'use client';

import React, { useState } from 'react';
import { KvClient } from '@0glabs/0g-ts-sdk';

// Network constants
// const RPC_URL = 'https://evmrpc-testnet.0g.ai/';
// const INDEXER_RPC = 'https://indexer-storage-testnet-turbo.0g.ai';

// Never expose your private key in frontend/browser in production!
// const PRIVATE_KEY = process.env.NEXT_PUBLIC_OG_PRIVATE_KEY as string;

// Initialize provider and indexer
// const provider = new ethers.JsonRpcProvider(RPC_URL);
// const signer = new ethers.Wallet(PRIVATE_KEY, provider);
// const indexer = new Indexer(INDEXER_RPC);

export default function StorageClient() {
  const [rootHash, setRootHash] = useState('');
  const [kvValue, setKvValue] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Upload a file (browser-compatible: using Blob/File)
  const uploadFile = async (file: File) => {
    try {
      setUploading(true);

      // TODO: Fix ZgFile integration for browser File objects
      // For now, simulate upload
      console.log('Uploading file:', file.name);
      
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock hash
      const mockHash = '0x' + Math.random().toString(16).substr(2, 64);
      setRootHash(mockHash);
      console.log('File uploaded! Root hash:', mockHash);
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  // Upload key-value pair to KV
  const uploadToKV = async (streamId: string, key: string, value: string, flowContractAddress: string) => {
    try {
      // TODO: Fix Batcher integration with proper Flow contract
      console.log('Uploading KV:', { streamId, key, value, flowContractAddress });
      
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('KV upload successful!');
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    }
  };

  // Download from KV
  const downloadFromKV = async (streamId: string, key: string) => {
    try {
      const kvClient = new KvClient('https://indexer-storage-testnet-turbo.0g.ai'); // use indexer URL
      const keyBytes = Uint8Array.from(new TextEncoder().encode(key));
      const value = await kvClient.getValue(streamId, keyBytes);
      setKvValue(value ? String(value) : null);
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-4">File Storage</h3>
        <div className="space-y-4">
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400">{error}</p>
            </div>
          )}
          
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">Upload File</label>
            <input
              type="file"
              accept="*/*"
              onChange={e => e.target.files && uploadFile(e.target.files[0])}
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700 file:cursor-pointer"
            />
            {uploading && (
              <div className="flex items-center gap-2 text-cyan-400 mt-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-cyan-400"></div>
                <span>Uploading file...</span>
              </div>
            )}
          </div>

          {rootHash && (
            <div className="bg-black/50 rounded-lg p-4 border border-green-500/30">
              <div className="text-sm text-green-400 mb-2 font-semibold">Upload Successful</div>
              <div className="text-gray-300">
                <div className="text-xs text-gray-400 mb-1">Root Hash:</div>
                <div className="font-mono text-sm break-all">{rootHash}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Key-Value Storage Section */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-4">Key-Value Storage</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2 text-sm font-medium">Stream ID</label>
              <input
                type="text"
                placeholder="Enter stream ID"
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2 text-sm font-medium">Key</label>
              <input
                type="text"
                placeholder="Enter key"
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => uploadToKV('stream1', 'myKey', 'myValue', '0xYourFlowContractAddress')}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Upload KV
            </button>
            <button
              onClick={() => downloadFromKV('stream1', 'myKey')}
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Download KV
            </button>
          </div>

          {kvValue && (
            <div className="bg-black/50 rounded-lg p-4 border border-green-500/30">
              <div className="text-sm text-green-400 mb-2 font-semibold">Retrieved Value:</div>
              <div className="text-gray-300 font-mono text-sm break-all">{kvValue}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
