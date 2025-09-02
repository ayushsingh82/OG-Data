// 'use client';

// import React, { useState } from 'react';
// import { ZgFile, Indexer, Batcher, KvClient } from '@0glabs/0g-ts-sdk';
// import { ethers } from 'ethers';
// import fs from 'fs';
// import { Readable } from 'stream';

// // Network constants
// const RPC_URL = 'https://evmrpc-testnet.0g.ai/';
// const INDEXER_RPC = 'https://indexer-storage-testnet-turbo.0g.ai';

// // Never expose your private key in frontend/browser in production!
// const PRIVATE_KEY = process.env.OG_PRIVATE_KEY as string;

// // Initialize provider, signer, and indexer
// const provider = new ethers.JsonRpcProvider(RPC_URL);
// const signer = new ethers.Wallet(PRIVATE_KEY, provider);
// const indexer = new Indexer(INDEXER_RPC);

// export default function StorageClient() {
//   const [rootHash, setRootHash] = useState('');
//   const [kvValue, setKvValue] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState('');

//   // Upload a local file
//   const uploadFile = async (filePath: string) => {
//     try {
//       setUploading(true);
//       const file = await ZgFile.fromFilePath(filePath);
//       const [tree, treeErr] = await file.merkleTree();
//       if (treeErr) throw new Error(`Merkle tree error: ${treeErr}`);

//       const [tx, uploadErr] = await indexer.upload(file, RPC_URL, signer);
//       if (uploadErr) throw new Error(`Upload error: ${uploadErr}`);

//       await file.close();
//       setRootHash(tree?.rootHash() || '');
//       console.log('File uploaded! Root hash:', tree?.rootHash(), 'Tx:', tx);
//     } catch (err) {
//       console.error(err);
//       setError((err as Error).message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Download a file by root hash
//   const downloadFile = async (root: string, outputPath: string) => {
//     try {
//       await indexer.download(root, outputPath, true);
//       console.log('File downloaded to', outputPath);
//     } catch (err) {
//       console.error(err);
//       setError((err as Error).message);
//     }
//   };

//   // Upload key-value pair to KV
//   const uploadToKV = async (streamId: string, key: string, value: string, flowContractAddress: string) => {
//     try {
//       const [nodes, err] = await indexer.selectNodes(1);
//       if (err) throw new Error(`Error selecting nodes: ${err}`);

//       // Pass contract address directly instead of FixedPriceFlow
//       const batcher = new Batcher(1, nodes, flowContractAddress, RPC_URL);

//       const keyBytes = Uint8Array.from(Buffer.from(key, 'utf-8'));
//       const valueBytes = Uint8Array.from(Buffer.from(value, 'utf-8'));
//       batcher.streamDataBuilder.set(streamId, keyBytes, valueBytes);

//       const [tx, batchErr] = await batcher.exec();
//       if (batchErr) throw new Error(`Batch execution error: ${batchErr}`);

//       console.log('KV upload successful! TX:', tx);
//     } catch (err) {
//       console.error(err);
//       setError((err as Error).message);
//     }
//   };

//   // Download from KV
//   const downloadFromKV = async (streamId: string, key: string) => {
//     try {
//       const kvClient = new KvClient('http://3.101.147.150:6789');
//       const keyBytes = Uint8Array.from(Buffer.from(key, 'utf-8'));
//       const value = await kvClient.getValue(streamId, ethers.encodeBase64(keyBytes));
//       setKvValue(value || null);
//     } catch (err) {
//       console.error(err);
//       setError((err as Error).message);
//     }
//   };

//   // Example: Upload a simple stream
//   const uploadStreamExample = async () => {
//     try {
//       const stream = new Readable();
//       stream.push('Hello, 0G Storage!');
//       stream.push(null);

//       const file = await ZgFile.fromStream(stream, 'hello.txt');
//       const [, err] = await indexer.upload(file, RPC_URL, signer);
//       if (err === null) console.log('Stream uploaded!');
//       await file.close();
//     } catch (err) {
//       console.error(err);
//       setError((err as Error).message);
//     }
//   };

//   return (
//     <div className="p-4 bg-black text-white rounded-lg">
//       <h2 className="text-xl font-bold mb-4">0G Storage Client</h2>

//       {error && <p className="text-red-400 mb-4">{error}</p>}

//       <button
//         onClick={() => uploadFile('./sample.txt')}
//         className="bg-blue-600 px-4 py-2 rounded mb-2"
//         disabled={uploading}
//       >
//         {uploading ? 'Uploading...' : 'Upload File'}
//       </button>

//       {rootHash && (
//         <div className="mt-2">
//           <p>Root Hash: {rootHash}</p>
//           <button
//             onClick={() => downloadFile(rootHash, './downloaded_sample.txt')}
//             className="bg-green-600 px-4 py-2 rounded mt-2"
//           >
//             Download File
//           </button>
//         </div>
//       )}

//       <div className="mt-4">
//         <button
//           onClick={() => uploadToKV('stream1', 'myKey', 'myValue', '0xYourFlowContractAddress')}
//           className="bg-purple-600 px-4 py-2 rounded mb-2"
//         >
//           Upload KV
//         </button>
//         <button
//           onClick={() => downloadFromKV('stream1', 'myKey')}
//           className="bg-yellow-600 px-4 py-2 rounded ml-2"
//         >
//           Download KV
//         </button>
//         {kvValue && <p className="mt-2">KV Value: {kvValue}</p>}
//       </div>

//       <div className="mt-4">
//         <button
//           onClick={uploadStreamExample}
//           className="bg-pink-600 px-4 py-2 rounded"
//         >
//           Upload Stream Example
//         </button>
//       </div>
//     </div>
//   );
// }
