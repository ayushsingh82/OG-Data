'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useBalance, useWriteContract } from 'wagmi';

interface MarketplaceItem {
  id: number;
  title?: string;
  name?: string;
  category: string;
  description: string;
  price: string;
  provider: string;
  tags: string[];
  verified: boolean;
  rating: number;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MarketplaceItem | null;
  onSuccess: () => void;
}

// Mock OG token contract address - replace with actual contract
const OG_TOKEN_CONTRACT = '0x1234567890123456789012345678901234567890';

export default function PaymentModal({ isOpen, onClose, item, onSuccess }: PaymentModalProps) {
  const { address, isConnected } = useAccount();
  const [paymentMethod, setPaymentMethod] = useState<'og' | 'usdc'>('og');

  const [step, setStep] = useState<'confirm' | 'processing' | 'success' | 'error'>('confirm');
  const [error, setError] = useState<string>('');

  // Get user's OG token balance
  const { data: ogBalance } = useBalance({
    address: address,
    token: OG_TOKEN_CONTRACT,
  });

  // Contract write for OG token transfer
  const { writeContract: transferOG, isPending, isSuccess, isError, error: contractError } = useWriteContract();

  // Handle contract write states
  useEffect(() => {
    if (isSuccess) {
      setStep('success');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    }
    if (isError && contractError) {
      setError(contractError.message);
      setStep('error');
    }
  }, [isSuccess, isError, contractError, onSuccess, onClose]);

  const handlePayment = async () => {
    if (!isConnected) {
      setError('Please connect your wallet first');
      setStep('error');
      return;
    }

    setStep('processing');

    try {
      if (paymentMethod === 'og') {
        // Execute OG token transfer
        transferOG({
          address: OG_TOKEN_CONTRACT,
          abi: [
            {
              name: 'transfer',
              type: 'function',
              stateMutability: 'nonpayable',
              inputs: [
                { name: 'to', type: 'address' },
                { name: 'amount', type: 'uint256' }
              ],
              outputs: [{ name: '', type: 'bool' }]
            }
          ],
          functionName: 'transfer',
          args: [
            '0x0000000000000000000000000000000000000000', // Marketplace contract address
            BigInt(parseInt((item?.price || '0 OG').replace(' OG', '')) * 10 ** 18) // Convert to wei
          ]
        });
      } else {
        // Handle USDC payment (mock implementation)
        await new Promise(resolve => setTimeout(resolve, 3000));
        setStep('success');
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 2000);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Payment failed';
      setError(errorMessage);
      setStep('error');
    }
  };

  const formatBalance = (balance: { formatted: string } | undefined) => {
    if (!balance) return '0';
    return Number(balance.formatted).toFixed(2);
  };

  const getPriceInUSD = (ogPrice: string) => {
    // Mock conversion rate - in real app, get from price oracle
    const ogAmount = parseInt(ogPrice.replace(' OG', ''));
    return (ogAmount * 0.1).toFixed(2); // Assuming 1 OG = $0.10
  };

  if (!isOpen) return null;

  const isInsufficientBalance =
    paymentMethod === 'og' &&
    ogBalance &&
    item &&
    Number(ogBalance.formatted) < parseInt(item.price.replace(' OG', ''));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">
            {step === 'confirm' && 'Confirm Purchase'}
            {step === 'processing' && 'Processing Payment'}
            {step === 'success' && 'Payment Successful'}
            {step === 'error' && 'Payment Failed'}
          </h3>
          {step !== 'processing' && (
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Content */}
        {step === 'confirm' && (
          <div>
            {/* Item Details */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h4 className="font-semibold">{item?.title || item?.name}</h4>
                <p className="text-sm text-gray-400">{item?.category}</p>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Payment Method</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg cursor-pointer hover:border-blue-500">
                  <input
                    type="radio"
                    name="payment"
                    value="og"
                    checked={paymentMethod === 'og'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'og')}
                    className="text-blue-500"
                  />
                  <div className="flex-1">
                    <div className="font-medium">OG Tokens</div>
                    <div className="text-sm text-gray-400">
                      Balance: {formatBalance(ogBalance)} OG
                    </div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg cursor-pointer hover:border-blue-500">
                  <input
                    type="radio"
                    name="payment"
                    value="usdc"
                    checked={paymentMethod === 'usdc'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'usdc')}
                    className="text-blue-500"
                  />
                  <div className="flex-1">
                    <div className="font-medium">USDC</div>
                    <div className="text-sm text-gray-400">
                      Equivalent: ${getPriceInUSD(item?.price || '0 OG')}
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Price:</span>
                <span className="text-2xl font-bold text-blue-400">{item?.price}</span>
              </div>
              <div className="text-sm text-gray-400">
                {paymentMethod === 'og' ? 'Paid in OG tokens' : `~$${getPriceInUSD(item?.price || '0 OG')} USDC`}
              </div>
            </div>

            {/* Wallet Connection Status */}
            {!isConnected && (
              <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-3 mb-6">
                <p className="text-yellow-400 text-sm">
                  ⚠️ Please connect your wallet to proceed with payment
                </p>
              </div>
            )}

            {/* Insufficient Balance Warning */}
            {isConnected && isInsufficientBalance && (
              <div className="bg-red-600/20 border border-red-500/30 rounded-lg p-3 mb-6">
                <p className="text-red-400 text-sm">
                  ⚠️ Insufficient OG token balance. You need {item?.price} but have {formatBalance(ogBalance)} OG
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handlePayment}
                disabled={!Boolean(isConnected) || isPending || isInsufficientBalance}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
              >
                {isPending ? 'Processing...' : 'Confirm Payment'}
              </button>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-300 mb-2">Processing your payment...</p>
            <p className="text-sm text-gray-400">Please wait while we confirm your transaction</p>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h4 className="text-xl font-bold text-green-400 mb-2">Payment Successful!</h4>
            <p className="text-gray-300 mb-4">
              You have successfully purchased {item?.title || item?.name}
            </p>
            <div className="bg-gray-800 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-400">Transaction Hash:</p>
              <p className="text-blue-400 text-sm font-mono">0x1234...5678</p>
            </div>
            <p className="text-sm text-gray-400">
              You can now access your purchased item in your dashboard
            </p>
          </div>
        )}

        {step === 'error' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✕</span>
            </div>
            <h4 className="text-xl font-bold text-red-400 mb-2">Payment Failed</h4>
            <p className="text-gray-300 mb-4">{error}</p>
            <div className="flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => setStep('confirm')}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
