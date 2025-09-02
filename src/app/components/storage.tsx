import { ZgFile, Indexer, Batcher, KvClient } from '@0glabs/0g-ts-sdk';
import { ethers } from 'ethers';

// Network Constants
const RPC_URL = 'https://evmrpc-testnet.0g.ai/';
const INDEXER_RPC = 'https://indexer-storage-testnet-turbo.0g.ai';

// WARNING: Never expose your private key in frontend/browser code!
const privateKey = process.env.OG_PRIVATE_KEY as string;
const provider = new ethers.JsonRpcProvider(RPC_URL);
const signer = new ethers.Wallet(privateKey, provider);

// Initialize indexer (reuse for all operations)
const indexer = new Indexer(INDEXER_RPC);

// File Upload
export async function uploadFile(filePath: string) {
  const file = await ZgFile.fromFilePath(filePath);
  const [tree, treeErr] = await file.merkleTree();
  if (treeErr !== null) throw new Error(`Error generating Merkle tree: ${treeErr}`);
  console.log('File Root Hash:', tree?.rootHash());
  const [tx, uploadErr] = await indexer.upload(file, RPC_URL, signer);
  if (uploadErr !== null) throw new Error(`Upload error: ${uploadErr}`);
  await file.close();
  return { rootHash: tree?.rootHash(), txHash: tx };
}

// File Download
export async function downloadFile(rootHash: string, outputPath: string) {
  const err = await indexer.download(rootHash, outputPath, true);
  if (err !== null) throw new Error(`Download error: ${err}`);
  console.log('Download successful!');
}

// Key-Value Storage: Upload
export async function uploadToKV(streamId: string, key: string, value: string, flowContract: string) {
  const [nodes, err] = await indexer.selectNodes(1);
  if (err !== null) throw new Error(`Error selecting nodes: ${err}`);
  const batcher = new Batcher(1, nodes, flowContract, RPC_URL);
  const keyBytes = Uint8Array.from(Buffer.from(key, 'utf-8'));
  const valueBytes = Uint8Array.from(Buffer.from(value, 'utf-8'));
  batcher.streamDataBuilder.set(streamId, keyBytes, valueBytes);
  const [tx, batchErr] = await batcher.exec();
  if (batchErr !== null) throw new Error(`Batch execution error: ${batchErr}`);
  console.log('KV upload successful! TX:', tx);
}

// Key-Value Storage: Download
export async function downloadFromKV(streamId: string, key: string) {
  const kvClient = new KvClient('http://3.101.147.150:6789');
  const keyBytes = Uint8Array.from(Buffer.from(key, 'utf-8'));
  const value = await kvClient.getValue(streamId, ethers.encodeBase64(keyBytes));
  return value;
}

// Stream Support (Node.js)
import { Readable } from 'stream';
import fs from 'fs';

export async function uploadStream() {
  const stream = new Readable();
  stream.push('Hello, 0G Storage!');
  stream.push(null);
  const file = await ZgFile.fromStream(stream, 'hello.txt');
  const [, err] = await indexer.upload(file, RPC_URL, signer);
  if (err === null) console.log('Stream uploaded!');
}

export async function downloadStream(rootHash: string) {
  const stream = await indexer.downloadFileAsStream(rootHash);
  stream.pipe(fs.createWriteStream('output.txt'));
}

// Best Practices:
// - Never expose private keys in browser code. Use environment variables and server-side logic.
// - Reuse the indexer for multiple operations.
// - Always close files after upload/download.
// - Handle errors for all network operations.
// - Use ZgFile.fromFilePath for Node.js, Blob for browsers.



