'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownUp, Settings, Info, ChevronDown } from 'lucide-react';
import { swapTokens } from '@/lib/mockData';

export default function SwapPage() {
  const [fromToken, setFromToken] = useState(swapTokens[0]);
  const [toToken, setToToken] = useState(swapTokens[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);
  const [showFromSelect, setShowFromSelect] = useState(false);
  const [showToSelect, setShowToSelect] = useState(false);

  const toAmount = useMemo(() => {
    const val = parseFloat(fromAmount);
    if (isNaN(val) || val <= 0) return '';
    const rate = fromToken.price / toToken.price;
    return (val * rate).toFixed(6);
  }, [fromAmount, fromToken, toToken]);

  const priceImpact = useMemo(() => {
    const val = parseFloat(fromAmount);
    if (isNaN(val) || val <= 0) return 0;
    return Math.min(val * 0.001, 5);
  }, [fromAmount]);

  const handleSwap = () => {
    const tmp = fromToken;
    setFromToken(toToken);
    setToToken(tmp);
    setFromAmount(toAmount);
  };

  const TokenSelector = ({
    token,
    onSelect,
    show,
    setShow,
    label,
  }: {
    token: typeof swapTokens[0];
    onSelect: (t: typeof swapTokens[0]) => void;
    show: boolean;
    setShow: (v: boolean) => void;
    label: string;
  }) => (
    <div className="relative">
      <label className="block text-sm text-gray-400 mb-2">{label}</label>
      <button
        onClick={() => setShow(!show)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-mimo-dark border border-mimo-dark-border hover:border-mimo-purple/30 transition-colors w-full"
      >
        <span className="text-xl">{token.icon}</span>
        <span className="font-medium">{token.symbol}</span>
        <ChevronDown size={16} className="ml-auto text-gray-400" />
      </button>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-1 z-20 bg-mimo-dark-card border border-mimo-dark-border rounded-xl shadow-2xl overflow-hidden"
        >
          {swapTokens
            .filter((t) => t.symbol !== (label === 'From' ? toToken : fromToken).symbol)
            .map((t) => (
              <button
                key={t.symbol}
                onClick={() => { onSelect(t); setShow(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-mimo-dark-hover transition-colors"
              >
                <span className="text-xl">{t.icon}</span>
                <div className="text-left">
                  <div className="font-medium">{t.symbol}</div>
                  <div className="text-xs text-gray-400">{t.name}</div>
                </div>
                <span className="ml-auto text-sm text-gray-400 font-mono">{t.balance}</span>
              </button>
            ))}
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Swap</h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Settings size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Slippage Settings */}
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-4 p-4 rounded-xl bg-mimo-dark-card border border-mimo-dark-border"
          >
            <div className="text-sm text-gray-400 mb-3">Slippage Tolerance</div>
            <div className="flex gap-2">
              {[0.1, 0.5, 1.0].map((val) => (
                <button
                  key={val}
                  onClick={() => setSlippage(val)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    slippage === val ? 'bg-mimo-purple text-white' : 'bg-mimo-dark border border-mimo-dark-border text-gray-400 hover:text-white'
                  }`}
                >
                  {val}%
                </button>
              ))}
              <div className="relative flex-1">
                <input
                  type="number"
                  value={slippage}
                  onChange={(e) => setSlippage(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg bg-mimo-dark border border-mimo-dark-border text-sm font-mono focus:outline-none focus:border-mimo-purple"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Swap Card */}
        <div className="rounded-2xl bg-mimo-dark-card border border-mimo-dark-border p-6">
          {/* From */}
          <div className="mb-2">
            <TokenSelector
              token={fromToken}
              onSelect={setFromToken}
              show={showFromSelect}
              setShow={(v) => { setShowFromSelect(v); setShowToSelect(false); }}
              label="From"
            />
            <div className="mt-2 relative">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-xl bg-mimo-dark border border-mimo-dark-border text-2xl font-mono focus:outline-none focus:border-mimo-purple transition-colors"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                Balance: {fromToken.balance}
              </div>
            </div>
          </div>

          {/* Swap Direction */}
          <div className="flex justify-center my-4">
            <motion.button
              whileHover={{ rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSwap}
              className="p-2 rounded-xl bg-mimo-dark border border-mimo-dark-border hover:border-mimo-purple/30 transition-colors"
            >
              <ArrowDownUp size={20} className="text-mimo-purple" />
            </motion.button>
          </div>

          {/* To */}
          <div>
            <TokenSelector
              token={toToken}
              onSelect={setToToken}
              show={showToSelect}
              setShow={(v) => { setShowToSelect(v); setShowFromSelect(false); }}
              label="To"
            />
            <div className="mt-2">
              <input
                type="text"
                value={toAmount}
                readOnly
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-xl bg-mimo-dark/50 border border-mimo-dark-border text-2xl font-mono text-gray-300"
              />
            </div>
          </div>

          {/* Price Info */}
          {fromAmount && parseFloat(fromAmount) > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-3 rounded-lg bg-mimo-dark/50 space-y-2"
            >
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Rate</span>
                <span>1 {fromToken.symbol} = {(fromToken.price / toToken.price).toFixed(6)} {toToken.symbol}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 flex items-center gap-1">
                  Price Impact <Info size={12} />
                </span>
                <span className={priceImpact > 1 ? 'text-yellow-400' : 'text-green-400'}>
                  {priceImpact.toFixed(3)}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Slippage Tolerance</span>
                <span>{slippage}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Min. Received</span>
                <span>{(parseFloat(toAmount || '0') * (1 - slippage / 100)).toFixed(6)} {toToken.symbol}</span>
              </div>
            </motion.div>
          )}

          {/* Swap Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-mimo-purple to-mimo-violet text-white font-semibold text-lg shadow-lg shadow-mimo-purple/25 hover:shadow-mimo-purple/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!fromAmount || parseFloat(fromAmount) <= 0}
          >
            {!fromAmount || parseFloat(fromAmount) <= 0 ? 'Enter an amount' : 'Swap'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
