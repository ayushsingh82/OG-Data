'use client';

import React, { useState } from 'react';
import { ZgFile, Indexer, Batcher, KvClient } from '@0glabs/0g-ts-sdk';
import { ethers } from 'ethers';

// Network constants
const RPC_URL = 'https://evmrpc-testnet.0g.ai/';
const INDEXER_RPC = 'https://indexer-storage-testnet-turbo.0g.ai';

// Never expose your private key in frontend/browser in production!
const PRIVATE_KEY = process.env.NEXT_PUBLIC_OG_PRIVATE_KEY as string;

// Initialize provider, signer, and indexer
const provider = new ethers.JsonRpcProvider(RPC_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const indexer = new Indexer(INDEXER_RPC);

export default function StorageClient() {
  const [rootHash, setRootHash] = useState('');
  const [kvValue, setKvValue] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Upload a file (browser-compatible: using Blob/File)
  const uploadFile = async (file: File) => {
    try {
      setUploading(true);

      // Convert File to ZgFile
      const zgFile = await ZgFile.fromBlob(file, file.name);

      const [tree, treeErr] = await zgFile.merkleTree();
      if (treeErr) throw new Error(`Merkle tree error: ${treeErr}`);

      const [tx, uploadErr] = await indexer.upload(zgFile, RPC_URL, signer);
      if (uploadErr) throw new Error(`Upload error: ${uploadErr}`);

      await zgFile.close();
      setRootHash(tree?.rootHash() || '');
      console.log('File uploaded! Root hash:', tree?.rootHash(), 'Tx:', tx);
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
      const [nodes, err] = await indexer.selectNodes(1);
      if (err) throw new Error(`Error selecting nodes: ${err}`);

      const batcher = new Batcher(1, nodes, flowContractAddress, RPC_URL);

      const keyBytes = Uint8Array.from(new TextEncoder().encode(key));
      const valueBytes = Uint8Array.from(new TextEncoder().encode(value));
      batcher.streamDataBuilder.set(streamId, keyBytes, valueBytes);

      const [tx, batchErr] = await batcher.exec();
      if (batchErr) throw new Error(`Batch execution error: ${batchErr}`);

      console.log('KV upload successful! TX:', tx);
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
      const value = await kvClient.getValue(streamId, ethers.encodeBase64(keyBytes));
      setKvValue(value || null);
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    }
  };

  return (
    <div className="p-4 bg-black text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">0G Storage Client</h2>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {/* File upload input */}
      <input
        type="file"
        accept="*/*"
        onChange={e => e.target.files && uploadFile(e.target.files[0])}
        className="mb-2"
      />
      {uploading && <p>Uploading...</p>}

      {rootHash && (
        <div className="mt-2">
          <p>Root Hash: {rootHash}</p>
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={() => uploadToKV('stream1', 'myKey', 'myValue', '0xYourFlowContractAddress')}
          className="bg-purple-600 px-4 py-2 rounded mb-2"
        >
          Upload KV
        </button>
        <button
          onClick={() => downloadFromKV('stream1', 'myKey')}
          className="bg-yellow-600 px-4 py-2 rounded ml-2"
        >
          Download KV
        </button>
        {kvValue && <p className="mt-2">KV Value: {kvValue}</p>}
      </div>
    </div>
  );
}
